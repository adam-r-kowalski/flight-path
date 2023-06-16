<script lang="ts">
	import Button from './Button.svelte';
	import Card from './Card.svelte';
	import Name from '$lib/components/Name.svelte'
	import { enhance } from '$app/forms';
	export let name: string;
	export let score: number;
</script>

<Card class="bg-slate-800">
	<Name {name} />
	<div class="flex gap-2 items-center">
		<form method="POST" action="?/decreaseScore" use:enhance>
			<input type="hidden" name="name" value={name} />
			<Button class="bg-blue-500">
				-
			</Button>
		</form>
		<h2 class="text-xl">{score}</h2>
		<form method="POST" action="?/increaseScore" use:enhance>
			<input type="hidden" name="name" value={name} />
			<Button class="bg-blue-500">
				+
			</Button>
		</form>
	</div>
</Card>
