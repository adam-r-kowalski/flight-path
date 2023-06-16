<script lang="ts">
	import Name from "$lib/components/Name.svelte";
import type { PageData } from "./$types";

	export let data: PageData
</script>

<header  class="flex items-center justify-between gap-2 px-2 pt-2">
	<a href="/game" class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="1em" width="1em">
			<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
		</svg>
	</a>
	<h1 class="text-center">Scores</h1>
	<a href="/game/{data.id}/hole/1" class="bg-green-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="1em" width="1em">
			<path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
		</svg>
	</a>
</header>

<main class="flex flex-col gap-2 p-2 mt-2">
	{#each Object.entries(data.scores) as [name, score]}
		<div class="bg-slate-800 flex items-center justify-between p-2 pr-4 rounded-xl shadow">
			<Name {name} />
			<h2 class="text-xl">{score}</h2>
		</div>
	{/each}
</main>

<h1 class="text-center">Hole</h1>

<section class="grid grid-cols-3 min-[320px]:grid-cols-6 gap-2 mt-2 justify-items-center">
	{#each Array(18) as _, i}
		<a href="/game/{data.id}/hole/{i + 1}" class="h-8 w-8 my-1 rounded-full bg-blue-500 flex items-center justify-center">{i+1}</a>
	{/each}
</section>

