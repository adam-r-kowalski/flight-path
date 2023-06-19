<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import H1 from '$lib/components/H1.svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="pt-2">
	<H1>New Game</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	<hr />
	<section>
		<strong>Course</strong>
		<p>{data.course.name}</p>
	</section>
	<hr />
	<form method="POST" use:enhance class="flex flex-col gap-2">
		<div class="grid grid-cols-[minmax(0,1fr)_32px] gap-2 items-center">
			<strong>Players</strong>
			<button
				formaction="?/add_player"
				class="rounded shadow h-[32px] bg-blue-500 hover:bg-blue-700 text-white">+</button
			>
			{#each data.players as player}
				<input
					placeholder="Player Name"
					name={player.id}
					value={player.name}
					required
					class="px-2 py-1 rounded shadow border"
				/>
				<button
					formaction="?/remove_player"
					class="rounded shadow h-[32px] bg-red-500 hover:bg-red-700 text-white">-</button
				>
			{/each}
		</div>
		<hr />
		<Button type="submit">Let's Throw</Button>
	</form>
</main>
