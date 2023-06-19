<script>
	import H1 from '$lib/components/H1.svelte';
</script>

<header class="pt-2 flex justify-center">
	<H1>Flight Path</H1>
</header>

<main class="flex flex-col p-2 gap-2">
	<a href="/courses" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
		Select Course
	</a>
	<a
		href="/courses/new"
		class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
	>
		New Course
	</a>
	<img src="https://i.imgur.com/rDjsCrw.png" alt="logo" class="mt-1" />
</main>
