<script lang="ts">
	export let data: import("./$types").PageData
</script>

<header  class="flex items-center justify-between gap-2 px-2 pt-2">
	<a href="/" class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" height="1em" width="1em">
			<path d="M946.5 505 534.6 93.4a31.93 31.93 0 0 0-45.2 0L77.5 505c-12 12-18.8 28.3-18.8 45.3 0 35.3 28.7 64 64 64h43.4V908c0 17.7 14.3 32 32 32H448V716h112v224h265.9c17.7 0 32-14.3 32-32V614.3h43.4c17 0 33.3-6.7 45.3-18.8 24.9-25 24.9-65.5-.1-90.5z" />
		</svg>
	</a>
	<h1 class="text-center">Select Game</h1>
	<a href="/course" class="bg-blue-500 rounded-full shadow w-8 h-8 flex items-center justify-center">
		<svg fill="currentColor" stroke-width="0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" height="1em" width="1em">
			<path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32v144H48c-17.7 0-32 14.3-32 32s14.3 32 32 32h144v144c0 17.7 14.3 32 32 32s32-14.3 32-32V288h144c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
		</svg>
	</a>
</header>

<main class="flex flex-col gap-2 p-2">
	{#each data.games as game}
		<a href="/game/{game}" class="bg-slate-800 flex items-center justify-between p-2 rounded-xl shadow">
			{game}
		</a>
	{/each}
</main>
