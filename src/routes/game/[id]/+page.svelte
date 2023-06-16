<script lang="ts">
	import { enhance } from "$app/forms";
	import type { PageData } from "./$types";

	export let data: PageData
</script>

<header  class="flex items-center justify-between gap-2 px-2 pt-2">
	<a href="/game" class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" height="1em" width="1em">
			<path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" />
		</svg>
	</a>
	<h1 class="text-center">{data.game.id}</h1>
	<a href="/game/{data.game.id}/hole/1" class="bg-green-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="1em" width="1em">
			<path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80v352c0 17.4 9.4 33.4 24.5 41.9S58.2 482 73 473l288-176c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
		</svg>
	</a>
</header>

<main class="flex flex-col gap-2 p-2">
	<section class="bg-slate-800 flex flex-col p-2 rounded-xl shadow">
		<strong class="text-xs">Course</strong>
		<span class="leading-4">{data.game.course}</span>
	</section>
	<form
		method="POST"
		action="?/addPlayer"
		class="bg-blue-900 flex p-2 gap-2 rounded-xl shadow"
		use:enhance
	>
		<input name="name" class="px-2 py-1 flex-1 rounded bg-slate-900" placeholder="Player Name" />
		<button class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
			<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1em" width="1em">
				<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
			</svg>
		</button>
	</form>
	{#each data.game.players as player}
		<section class="bg-slate-800 flex items-center justify-between p-2 rounded-xl shadow">
			{player}
			<form
				method="POST"
				action="?/removePlayer"
				use:enhance
			>
				<input type="hidden" name="name" value={player} />
				<button class="bg-red-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
					<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1em" width="1em">
						<path d="M135.2 17.7 128 32H32C14.3 32 0 46.3 0 64s14.3 32 32 32h384c17.7 0 32-14.3 32-32s-14.3-32-32-32h-96l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32l21.2 339c1.6 25.3 22.6 45 47.9 45h245.8c25.3 0 46.3-19.7 47.9-45L416 128z" />
					</svg>
				</button>
			</form>
		</section>
	{/each}
</main>
