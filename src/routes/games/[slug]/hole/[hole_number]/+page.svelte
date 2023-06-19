<script lang="ts">
	import { enhance } from '$app/forms';
	import H1 from '$lib/components/H1.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<header class="pt-2">
	<H1>Hole {data.hole.hole_number}</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	<hr />
	<section>
		<strong>Par</strong>
		<p>{data.hole.par}</p>
	</section>
	<hr />
	<strong>Scores</strong>
	{#each data.scores as score}
		<form method="POST" use:enhance class="flex items-center gap-2 border p-2 rounded shadow">
			<input type="hidden" name="id" value={score.id} />
			<p class="flex-1">{score.name}</p>
			<button class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white">-</button>
			<strong class="text-xl">{score.score}</strong>
			<button class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white">+</button>
		</form>
	{/each}
	<hr />
	<section>
		<strong>Distance To Basket</strong>
		<p>{data.hole.distance_to_basket}</p>
	</section>
</main>
