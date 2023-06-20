<script lang="ts">
	import H1 from '$lib/components/H1.svelte';
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;
	let new_player_input: HTMLInputElement;

	onMount(() => {
		const interval = setInterval(async () => {
			await invalidateAll();
		}, 5000);
		return () => clearInterval(interval);
	});
</script>

<header class="pt-2">
	<H1>New Game</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	<hr />
	<strong>Players</strong>
	<form
		method="POST"
		action="?/new_player"
		class="flex items-center gap-2 border p-2 rounded shadow"
		use:enhance={({ formData }) => {
			const name = formData.get('name');
			if (name) {
				data.players.push({
					id: crypto.randomUUID(),
					name
				});
				data = data;
				new_player_input.value = '';
				new_player_input.blur();
			}
			return async ({ update }) => {
				update();
			};
		}}
	>
		<input
			bind:this={new_player_input}
			placeholder="Player Name"
			name="name"
			required
			class="px-2 py-1 rounded shadow border flex-1 min-w-0"
		/>
		<button class="rounded shadow bg-blue-500 w-8 h-8 hover:bg-blue-700 text-white">+</button>
	</form>
	{#each data.players as player}
		<form
			method="POST"
			action="?/remove_player"
			class="flex items-center gap-2 border p-2 rounded shadow"
			use:enhance={({ formData }) => {
				const id = formData.get('id');
				if (id) {
					const parsed = parseInt(id.toString());
					data.players = data.players.filter((p) => p.id !== parsed);
				}
				return async ({ update }) => {
					update();
				};
			}}
		>
			<input type="hidden" name="id" value={player.id} />
			<p class="flex-1 px-2">{player.name}</p>
			<button class="rounded shadow w-8 h-8 bg-red-500 hover:bg-red-700 text-white">-</button>
		</form>
	{/each}
	<hr />
	<a
		href="/games/{data.game.slug}/hole/1"
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	>
		Let's Throw
	</a>
	<hr />
	<section>
		<strong>Course</strong>
		<p>{data.course.name}</p>
	</section>
	<hr />
	<section>
		<strong>Address</strong>
		<p>{data.course.address}</p>
	</section>
	<hr />
	<section>
		<strong>Total Holes</strong>
		<p>{data.course.total_holes}</p>
	</section>
	{#if data.course.map}
		<hr />
		<section>
			<strong>Map</strong>
			<img src={data.course.map} alt="Map" class="mt-1" />
		</section>
	{/if}
</main>
