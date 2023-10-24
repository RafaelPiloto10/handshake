<script lang="ts">
	import RightArrow from '$lib/components/icons/RightArrow.svelte';
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import * as d3 from 'd3';
	import { initializeSVG } from '$lib/charts';
	import { keyframes, verses } from '$lib/keyframes';
	import Handshake from '$lib/components/icons/Handshake.svelte';
	import Drag from '$lib/components/icons/Drag.svelte';
	import Github from '$lib/components/icons/Github.svelte';

	let mounted = false;
	let ready = false;
	const loadTime = 5000;

	// Chart constants
	const margin = { top: 30, right: 30, bottom: 50, left: 50 };
	$: width = 300;
	$: height = 300;

	$: chartWidth = width - margin.left - margin.right;
	$: chartHeight = height - margin.top - margin.bottom;

	$: xScale = d3.scaleBand().domain([]).range([0, chartWidth]).padding(0.1);
	$: yScale = d3.scaleLinear().domain([]).nice().range([chartHeight, 0]);

	let state_data: d3.DSVRowArray<string>;
	let resolution_data: d3.DSVRowArray<string>;

	onMount(async () => {
		state_data = await d3.csv('state-2017-2021.csv');
		resolution_data = await d3.csv('disability-resolutions-1992-2021.csv');

		mounted = true;
		setTimeout(() => {
			ready = true;
			setTimeout(() => {
				initializeSVG(width, height, xScale, yScale);
				setTimeout(() => {
					keyframes[0].render(state_data, resolution_data);
				}, 500);
			}, 100);
		}, loadTime);
	});

	$: keyframe = 0;

	$: isDown = false;
	$: startX = 0;
	$: scrollLeft = 0;
	$: backgroundFile = keyframes[keyframe].background;

	let poemContainer: HTMLDivElement;
</script>

<div
	class={`'text-white' flex h-full w-full flex-row items-center justify-center
		fill-white transition-all duration-1000 ${backgroundFile} bg-cover`}
>
	<div class="flex h-full w-full flex-col items-center justify-center bg-slate-900/70 p-8 gap-2">
		<div class={`flex h-full w-full max-w-[1440px] flex-col items-start justify-center`}>
			{#if mounted}
				<div
					class={`${
						ready
							? 'max-h-4/6 min-h-4/6 flex h-4/6 w-full min-w-full flex-row items-center justify-center text-white'
							: ''
					}`}
					bind:clientWidth={width}
					bind:clientHeight={height}
				>
					{#if keyframe === 11}
						<div class="h-96 w-96">
							<Handshake speed={0.05} />
						</div>
					{:else}
						<svg id="svg" class="min-h-full min-w-full text-white" />
					{/if}
				</div>

				{#if ready}
					<div class="min-h-2/6 max-h-2/6 flex h-2/6 w-full min-w-full flex-row">
						<div
							id="poem-container"
							bind:this={poemContainer}
							role="scrollbar"
							aria-controls="poem-container"
							aria-valuenow={0}
							tabindex="0"
							on:mouseup={() => {
								isDown = false;
								let verse = document.getElementById(`verse-${keyframes[keyframe].activeVerse}`);
								if (verse) {
									verse.scrollIntoView({ behavior: 'smooth', inline: 'center' });
									keyframes[keyframe].render(state_data, resolution_data);
								}
							}}
							on:mouseleave={() => {
								isDown = false;
							}}
							on:mousedown={(e) => {
								startX = e.pageX - poemContainer.offsetLeft;
								scrollLeft = poemContainer.scrollLeft;
								isDown = true;
							}}
							on:mousemove={(e) => {
								if (!isDown) return;
								e.preventDefault();
								const x = e.pageX - poemContainer.offsetLeft;
								const walk = (x - startX) * 2;
								poemContainer.scrollLeft = scrollLeft - walk;
							}}
							on:wheel={(e) => e.preventDefault()}
							class={`flex h-full w-full ${
								!isDown ? '' : ''
							} flex-row items-center overflow-scroll pt-16 hover:cursor-pointer active:cursor-grabbing`}
						>
							{#each verses as lines, verseID}
								<div
									use:inview={{
										root: poemContainer,
										rootMargin: '-20%'
									}}
									on:inview_enter={(event) => {
										const { scrollDirection } = event.detail;
										keyframe = verseID;
										if (keyframe === 10 && scrollDirection.horizontal === 'right') {
											setTimeout(() => {
												initializeSVG(width, height, xScale, yScale);
												keyframes[keyframe].render(state_data, resolution_data);
											}, 100);
										}
									}}
									id={`verse-${verseID}`}
									class={`flex h-full w-full min-w-full flex-col items-center justify-center ${
										keyframes.length > keyframe && verseID === keyframes[keyframe].activeVerse
											? 'opacity-100'
											: 'opacity-20'
									}`}
								>
									<div class="flex flex-col items-start justify-start">
										{#each lines as line, lineID}
											<p
												class={`text-lg text-white ${
													keyframes.length > keyframe &&
													keyframes[keyframe].activeLines.includes(lineID)
														? 'opacity-100'
														: 'opacity-20'
												}`}
											>
												{line}
											</p>
										{/each}
									</div>
								</div>
							{/each}
						</div>
					</div>
					<div class="flex w-full flex-row items-center justify-center">
						<Drag />
					</div>
				{/if}
			{/if}

			{#if !ready}
				<div
					class="flex h-full w-full animate-pulse flex-col items-center justify-center text-white"
				>
					<p class="text-5xl">Handshake</p>
					<div class="h-16 w-16">
						<Handshake />
					</div>
					<br />
					<p class="text-sm text-white">Click and drag the poem to scroll</p>
				</div>
			{/if}
		</div>
		<p class="text-xs text-gray-500 flex flex-row items-center gap-2">See how this was built <a href="https://github.com/RafaelPiloto10/handshake" referrerpolicy="no-referrer" target="_blank"><Github /></a></p>
	</div>
</div>

<style>
	::-webkit-scrollbar {
		height: 2px;
	}

	::-webkit-scrollbar-thumb {
		background-color: white; /* color of the scroll thumb */
		border-radius: 20px; /* roundness of the scroll thumb */
	}

	.dark-ocean {
		background-image: url('/dark-ocean.jpg');
	}

	.rain {
		background-image: url('/rain.gif');
	}

	.stars {
		background-image: url('/stars.jpg');
	}
	.ocean {
		background-image: url('/ocean.jpg');
	}
</style>
