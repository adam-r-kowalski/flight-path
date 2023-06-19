<script lang="ts">
	import H1 from '$lib/components/H1.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="pt-2 flex justify-center">
	<H1>LeaderBoard</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	<hr />
	<strong>Scores</strong>
	{#each data.scores as score}
		<section class="flex items-center gap-2 border p-2 rounded shadow">
			<p class="flex-1">{score.name}</p>
			<strong class="text-xl">{score.total_score}</strong>
		</section>
	{/each}
	<hr />
	<section>
		<strong>Holes</strong>
		<div class="grid grid-cols-3 min-[320px]:grid-cols-6 gap-2 p-2 justify-items-center">
			{#each Array.from({ length: data.course.total_holes }, (_, i) => i + 1) as hole}
				<a
					href="/games/{data.game.slug}/hole/{hole}"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold w-8 h-8 rounded flex items-center justify-center"
				>
					{hole}
				</a>
			{/each}
		</div>
	</section>
	{#if data.course.map}
		<hr />
		<section>
			<strong>Map</strong>
			<img src={data.course.map} alt="Map" />
		</section>
	{/if}
</main>
