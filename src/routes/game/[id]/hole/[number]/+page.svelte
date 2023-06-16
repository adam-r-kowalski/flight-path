<script lang="ts">
	import type { PageData } from './$types';
	import Player from './Player.svelte'
	import Button from "./Button.svelte";
	import Card from "./Card.svelte";

	export let data: PageData

	$: base = `/game/${data.id}/hole`
	$: back = data.number - 1
	$: backUrl = back == 0 ? `/game/${data.id}` : `${base}/${back}`
	$: forward = data.number + 1
	$: forwardUrl = forward == 19 ? base : `${base}/${forward}`
</script>

<header  class="flex justify-between gap-2 p-2">
	<a href="{backUrl}" class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="1em" width="1em">
			<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
		</svg>
	</a>
	<a href="{base}" class="flex flex-col">
		<h3>Hole</h3>
		<h1 class="text-center text-4xl">{data.number}</h1>
	</a>
	<a href="{forwardUrl}" class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="1em" width="1em" style="overflow: visible;">
			<path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" />
		</svg>
	</a>
</header>

<main class="flex flex-col gap-2 px-2 pb-2">
	<Card class="bg-blue-900">
		<h2 class="text-white p-2 text-xl">Par</h2>
		<div class="flex gap-2 items-center">
			<Button class="bg-blue-500">
				-
			</Button>
			<h2 class="text-xl">{data.hole.par}</h2>
			<Button class="bg-blue-500">
				+
			</Button>
		</div>
	</Card>
	{#each Object.entries(data.hole.scores) as [name, score]}
		<Player {name} {score} />
	{/each}
</main>

