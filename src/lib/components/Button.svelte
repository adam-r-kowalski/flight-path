<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button
	{type}
	class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
	<slot />
</button>
