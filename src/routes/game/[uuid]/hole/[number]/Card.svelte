<script lang="ts">
	let className: string = ''
	export {className as class}
</script>

<section class="flex items-center justify-between p-2 rounded-xl shadow {className}">
	<slot />
</section>
