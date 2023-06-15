<script lang="ts">
	export let name: string;
	export let score: number;

	$: split = name.split(' ');

	$: initials = split
			.map((word) => word[0])
			.join('')
			.toUpperCase()
</script>

<section class="bg-slate-800 flex items-center justify-between p-2 rounded-xl shadow">
	<div class="flex items-center gap-2">
		<h2 class="bg-white text-black p-2 rounded-full w-10 h-10 flex items-center justify-center">{initials}</h2>
		<div class="hidden min-[320px]:block">
			<h4 class="text-sm">{split[0]}</h4>
			<h4 class="text-sm">{split[1]}</h4>
		</div>
	</div>
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
