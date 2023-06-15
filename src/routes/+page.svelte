<script lang="ts">
	import Player from './Player.svelte'
</script>

<svelte:head>
	<title>Flight Paths</title>
	<meta name="description" content="Your Disc Golf Companion" />
</svelte:head>

<header class="p-2 flex justify-center items-center gap-4">
	<button class="rounded-full flex items-center justify-center bg-blue-500 w-10 h-10 text-xl font-bold cursor-pointer">
		<svg fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" height="1em" width="1em" style="overflow: visible;"><path d="m11 17-5-5 5-5M18 17l-5-5 5-5"></path></svg>
	</button>
	<div class="flex flex-col items-center">
		<h1 class="text-sm">Hole</h1>
		<h2 class="text-2xl">7</h2>
	</div>
	<button class="rounded-full flex items-center justify-center bg-blue-500 w-10 h-10 text-xl font-bold cursor-pointer">
		<svg fill="none" stroke-width="2" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" height="1em" width="1em" style="overflow: visible;"><path d="m13 17 5-5-5-5M6 17l5-5-5-5"></path></svg>
	</button>
</header>

<main class="flex flex-col gap-2 px-2 pb-2">
	<section class="bg-blue-900 flex items-center justify-between p-2 rounded-xl shadow">
		<h2 class="text-white p-2 text-xl">Par</h2>
		<div class="flex gap-2 items-center">
			<button class="rounded-full flex items-center justify-center bg-blue-500 w-8 h-8 text-xl font-bold cursor-pointer">
				-
			</button>
			<h2 class="text-xl">3</h2>
			<button class="rounded-full flex items-center justify-center bg-blue-500 w-8 h-8 text-xl font-bold cursor-pointer">
				+
			</button>
		</div>
	</section>
	<Player initials="AK" score={4} />
	<Player initials="MM" score={3} />
	<Player initials="DC" score={3} />
	<Player initials="MC" score={5} />
</main>

