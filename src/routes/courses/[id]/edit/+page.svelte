<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import NumberInput from '$lib/components/NumberInput.svelte';
	import Button from '$lib/components/Button.svelte';
	import H1 from '$lib/components/H1.svelte';
	import Form from '$lib/components/Form.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	let map: string = data.course.map;
</script>

<Form>
	<H1>Edit Course</H1>
	<TextInput label="Name" name="name" placeholder="Name" value={data.course.name} required />
	<TextInput
		label="Address"
		name="address"
		placeholder="Address"
		value={data.course.address}
		required
	/>
	<NumberInput
		label="Total Holes"
		name="total_holes"
		placeholder="Total Holes"
		value={data.course.total_holes}
		required
	/>
	<TextInput label="Map" name="map" placeholder="Map" bind:value={map} />
	{#if map !== ''}
		<img src={map} alt="Map" />
	{/if}
	<Button type="submit">Save</Button>
</Form>
