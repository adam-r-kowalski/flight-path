<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import H1 from '$lib/components/H1.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';

	export let data: PageData;
</script>

{#if data.created}
	<Toast href="/courses/{data.course.id}">Created!</Toast>
{/if}

<header class="pt-2">
	<H1>{data.course.name}</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	<hr />
	<form method="POST" use:enhance class="flex flex-col items-stretch">
		<Button type="submit">Start New Game</Button>
	</form>
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
	<hr />
	<a
		href="/courses/{data.course.id}/edit"
		class="bg-amber-500 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded"
	>
		Edit Course
	</a>
</main>
