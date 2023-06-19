<script lang="ts">
	export let label: string;
	export let name: string;
	export let placeholder: string;
	export let value: number | undefined;
	export let required: boolean = false;
</script>

<section class="flex flex-col gap-1">
	<label for={name} class="text-gray-700 text-sm font-bold">
		{label}
	</label>
	<input
		{name}
		{placeholder}
		bind:value
		{required}
		type="number"
		class="px-2 py-1 rounded shadow border"
	/>
</section>
