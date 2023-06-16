<script lang="ts">
	import { enhance } from "$app/forms";

	export let data: import("./$types").PageData
</script>

<header  class="flex items-center justify-between gap-2 px-2 pt-2">
	<a href="/course" class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="1em" width="1em">
			<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
		</svg>
	</a>
	<small class="text-center">{data.course.name}</small>
	<a href="/" class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" height="1em" width="1em">
			<path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
		</svg>
	</a>
</header>

<main class="flex flex-col gap-2 p-2">
	<form
		method="POST"
		action="?/newGame"
		class="flex flex-1"
		use:enhance
	>
		<button class="p-2 flex-1 flex bg-blue-900 rounded-xl shadow">
			New Game
		</button>
	</form>
	<section class="bg-slate-800 flex flex-col p-2 rounded-xl shadow">
		<strong class="text-xs">Address</strong>
		<span class="leading-4">{data.course.address}</span>
	</section>
	{#if data.course.map}
		<section class="bg-slate-800 flex flex-col p-2 rounded-xl shadow">
			<strong class="text-xs">Map</strong>
			<img src={data.course.map} alt="course map" />
		</section>
	{/if}
	<section class="bg-slate-800 flex flex-col p-2 rounded-xl shadow">
		<strong class="text-xs">Holes</strong>
		<span class="leading-4">{data.course.holes}</span>
	</section>
</main>
