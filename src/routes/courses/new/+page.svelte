<script>
	import Input from '$lib/components/Input.svelte';
	import Button from '$lib/components/Button.svelte';
	import H1 from '$lib/components/H1.svelte';
</script>

<form class="flex flex-col gap-4 p-2 items-stretch">
	<H1>New Course</H1>
	<Input label="Name" name="name" placeholder="Name" />
	<Input label="Address" name="address" placeholder="Address" />
	<Input label="Map" name="map" placeholder="Map" />
	<Input label="Total Holes" name="total_holes" placeholder="Total Holes" type="number" />
	<Button>Create</Button>
</form>
