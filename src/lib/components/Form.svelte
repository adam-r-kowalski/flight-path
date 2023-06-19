<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form method="POST" use:enhance class="flex flex-col gap-4 p-2 items-stretch">
	<slot />
</form>
