<script lang="ts">
	let className: string = ''
	export {className as class}
</script>

<button class="rounded-full flex items-center justify-center w-8 h-8 text-xl font-bold cursor-pointer {className}">
	<slot />
</button>
