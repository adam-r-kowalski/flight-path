<script lang="ts">
	import H1 from '$lib/components/H1.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data);
</script>

<header class="pt-2 flex justify-center">
	<H1>LeaderBoard</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	<hr />
	<strong>Scores</strong>
	<!-- {#each data.scores as score} -->
	<!-- 	<form method="POST" use:enhance class="flex items-center gap-2 border p-2 rounded shadow"> -->
	<!-- 		<input type="hidden" name="id" value={score.id} /> -->
	<!-- 		<p class="flex-1">{score.name}</p> -->
	<!-- 		<button -->
	<!-- 			formaction="?/decrease_score" -->
	<!-- 			class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white">-</button -->
	<!-- 		> -->
	<!-- 		<strong class="text-xl">{score.score}</strong> -->
	<!-- 		<button -->
	<!-- 			formaction="?/increase_score" -->
	<!-- 			class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white">+</button -->
	<!-- 		> -->
	<!-- 	</form> -->
	<!-- {/each} -->
	{#if data.course.map}
		<hr />
		<section>
			<strong>Map</strong>
			<img src={data.course.map} alt="Map" />
		</section>
	{/if}
</main>
