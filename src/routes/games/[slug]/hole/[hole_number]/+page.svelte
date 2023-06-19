<script lang="ts">
	import { enhance } from '$app/forms';
	import H1 from '$lib/components/H1.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="pt-2">
	<H1>Hole {data.hole.hole_number}</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	<hr />
	<strong>Scores</strong>
	{#each data.scores as score}
		<form method="POST" use:enhance class="flex items-center gap-2 border p-2 rounded shadow">
			<input type="hidden" name="id" value={score.id} />
			<p class="flex-1">{score.name}</p>
			<button
				formaction="?/decrease_score"
				class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white">-</button
			>
			<strong class="text-xl">{score.score}</strong>
			<button
				formaction="?/increase_score"
				class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white">+</button
			>
		</form>
	{/each}
	<hr />
	<section class="flex gap-2">
		<a
			href="/games/{data.game.slug}/hole/{data.hole.hole_number - 1}"
			class="bg-blue-500 hover:bg-blue-700 text-white p-2 flex-1 text-center"
		>
			Previous
		</a>
		<a
			href="/games/{data.game.slug}/hole/{data.hole.hole_number + 1}"
			class="bg-blue-500 hover:bg-blue-700 text-white p-2 flex-1 text-center"
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
