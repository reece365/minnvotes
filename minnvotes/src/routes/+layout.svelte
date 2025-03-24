<script lang="ts">
	import '../app.css';
	import { slide } from 'svelte/transition';
	import { cubicIn, cubicInOut, cubicOut } from 'svelte/easing';

	let { children, data } = $props();
</script>

{#key data.pathname}
	<div class="bg-slate-200">
		<div out:slide={{duration: 300, easing: cubicOut}}>
			{@render children()}
		</div>
	</div>
{/key}
