<script lang="ts">
	import Button from './Button.svelte';
	import Card from './Card.svelte';
	import Name from '$lib/components/Name.svelte'
	export let name: string;
	export let score: number;
</script>

<Card class="bg-slate-800">
	<Name {name} />
	<div class="flex gap-2 items-center">
		<Button class="bg-red-500">
			-
		</Button>
		<h2 class="text-xl">{score}</h2>
		<Button class="bg-green-500">
			+
		</Button>
	</div>
</Card>
