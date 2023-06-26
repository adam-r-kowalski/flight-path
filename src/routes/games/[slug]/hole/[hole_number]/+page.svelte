<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;

	let pendingActions = 0;

	const updateScores = async () => {
		await fetch(`/games/${data.game.slug}/hole/${data.hole.hole_number}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data.scores)
		});
		pendingActions = 0;
	};

	$: if (pendingActions > 0) {
		const current = pendingActions;
		setTimeout(async () => {
			if (pendingActions === current) {
				await updateScores();
			}
		}, 2000);
	}
</script>

<header class="pt-2 flex justify-center">
	<a href="/games/{data.game.slug}/hole" class="text-2xl font-bold">
		Hole {data.hole.hole_number}
	</a>
</header>

<main class="flex flex-col p-2 gap-2">
	<hr />
	<strong>Scores</strong>
	{#each data.scores as score, i}
		<section class="flex items-center gap-2 border p-2 rounded shadow">
			<p class="flex-1">{score.name}</p>
			<form method="POST" action="?/decrease_score" use:enhance>
				<input type="hidden" name="id" value={score.id} />
				<button
					class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white"
					on:click|preventDefault={() => {
						pendingActions += 1;
						data.scores[i].score = Math.max(data.scores[i].score - 1, 0);
					}}
				>
					-
				</button>
			</form>
			<strong class="text-xl w-6 text-center">{score.score}</strong>
			<form method="POST" action="?/increase_score" use:enhance>
				<input type="hidden" name="id" value={score.id} />
				<button
					class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white"
					on:click|preventDefault={() => {
						pendingActions += 1;
						data.scores[i].score += 1;
					}}
				>
					+
				</button>
			</form>
		</section>
	{/each}
	<hr />
	<section class="flex gap-2">
		<a
			href="/games/{data.game.slug}/hole/{data.hole.hole_number - 1}"
			class="bg-blue-500 hover:bg-blue-700 text-white p-2 flex-1 text-center"
			on:click={async () => {
				if (pendingActions > 0) {
					await updateScores();
				}
			}}
		>
			Previous
		</a>
		<a
			href="/games/{data.game.slug}/hole/{data.hole.hole_number + 1}"
			class="bg-blue-500 hover:bg-blue-700 text-white p-2 flex-1 text-center"
			on:click={async () => {
				if (pendingActions > 0) {
					await updateScores();
				}
			}}
		>
			Next
		</a>
	</section>
	<hr />
	<section>
		<strong>Par</strong>
		<p>{data.hole.par}</p>
	</section>
	<hr />
	<section>
		<strong>Distance To Basket</strong>
		<p>{data.hole.distance_to_basket}</p>
	</section>
</main>
