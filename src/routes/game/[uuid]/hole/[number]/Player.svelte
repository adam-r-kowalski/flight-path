<script lang="ts">
	import Button from './Button.svelte';
	import Card from './Card.svelte';
	export let name: string;
	export let score: number;

	$: split = name.split(' ');
	$: first = split[0];
	$: last = split[split.length - 1];
	$: initials = first[0].toUpperCase() + last[0].toUpperCase()
</script>

<Card class="bg-slate-800">
	<div class="flex items-center gap-2">
		<h2 class="bg-white text-black p-2 rounded-full w-10 h-10 flex items-center justify-center">{initials}</h2>
		<div class="hidden min-[320px]:block">
			<h4 class="text-sm">{first}</h4>
			<h4 class="text-sm">{last}</h4>
		</div>
	</div>
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
