<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let href: string;

	onMount(() => {
		setTimeout(() => goto(href), 5000);
	});
</script>

<a
	{href}
	class="fixed bottom-2 left-2 right-2 bg-green-700 text-white rounded shadow p-2 flex justify-between items-center"
>
	<slot />
</a>
