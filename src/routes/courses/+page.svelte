<script lang="ts">
	import H1 from '$lib/components/H1.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<header class="pt-2 flex justify-center">
	<H1>Select Course</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	{#each data.courses as course}
		<a href="/courses/{course.id}" class="flex items-center gap-2 border p-2 rounded shadow">
			<strong>{course.name}</strong>
		</a>
	{/each}
	<a
		href="/courses/new"
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	>
		New Course
	</a>
</main>
