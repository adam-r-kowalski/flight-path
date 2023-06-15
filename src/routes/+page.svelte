<script lang="ts">
	import Hole from './Hole.svelte'
	import Par from './Par.svelte'
	import Player from './Player.svelte'
</script>

<svelte:head>
	<title>Flight Paths</title>
	<meta name="description" content="Your Disc Golf Companion" />
</svelte:head>

<Hole />

<main class="flex flex-col gap-2 px-2 pb-2">
	<Par />
	<Player name="Adam Kowalski" score={4} />
	<Player name="Michael Milowski" score={3} />
	<Player name="David Carlen" score={3} />
	<Player name="Misiu Cieskowski" score={5} />
</main>

