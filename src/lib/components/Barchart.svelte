<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';


	export let title: string;
	export let chart: HTMLDivElement;
	export let svg: SVGElement;

	export let data: any;



	onMount(() => {
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center gap-2">
	<h1 class="text-5xl">{title}</h1>
</div>
