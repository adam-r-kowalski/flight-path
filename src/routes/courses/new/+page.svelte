<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import H1 from '$lib/components/H1.svelte';
	import Form from '$lib/components/Form.svelte';

	let map: string = '';
</script>

<Form>
	<H1>New Course</H1>
	<TextInput label="Name" name="name" placeholder="Name" required />
	<TextInput label="Address" name="address" placeholder="Address" required />
	<NumberInput
		label="Total Holes"
		name="total_holes"
		placeholder="Total Holes"
		value={18}
		required
	/>
	<TextInput label="Map" name="map" placeholder="Map" bind:value={map} />
	{#if map !== ''}
		<img src={map} alt="Map" />
	{/if}
	<Button type="submit">Create</Button>
</Form>
