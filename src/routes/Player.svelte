<script lang="ts">
	export let initials: string;
	export let score: number;
</script>

<section class="bg-slate-800 flex items-center justify-between p-2 rounded-xl shadow">
	<h2 class="bg-white text-black p-2 rounded-full">{initials}</h2>
	<div class="flex gap-2 items-center">
		<button class="rounded-full flex items-center justify-center bg-red-500 w-8 h-8 text-xl font-bold cursor-pointer">
			-
		</button>
		<h2 class="text-xl">{score}</h2>
		<button class="rounded-full flex items-center justify-center bg-green-500 w-8 h-8 text-xl font-bold cursor-pointer">
			+
		</button>
	</div>
</section>
