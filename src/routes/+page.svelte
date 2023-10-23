<script lang="ts">
	import RightArrow from '$lib/components/icons/RightArrow.svelte';
	import { onMount } from 'svelte';
	import { inview } from 'svelte-inview';
	import * as d3 from 'd3';
	import { initializeSVG, updateBarChart } from '$lib/charts';
	import Handshake from '$lib/components/icons/Handshake.svelte';

	let mounted = false;
	let ready = false;

	// Chart constants
	const margin = { top: 30, right: 30, bottom: 50, left: 50 };
	$: width = 300;
	$: height = 300;

	$: chartWidth = width - margin.left - margin.right;
	$: chartHeight = height - margin.top - margin.bottom;

	$: xScale = d3.scaleBand().domain([]).range([0, chartWidth]).padding(0.1);
	$: yScale = d3.scaleLinear().domain([]).nice().range([chartHeight, 0]);

	let data: d3.DSVRowArray<string>;

	onMount(async () => {
		data = await d3.csv('state-2017-2021.csv');
		mounted = true;
		setTimeout(() => {
			ready = true;
			setTimeout(() => {
				initializeSVG(width, height, xScale, yScale);
				keyframes[0].render();
			}, 100);
		}, 100);
	});

	let dark = true;

	const verses = [
		['In a realm where silence wears a heavy shroud,'],
		[
			'In a realm where silence wears a heavy shroud,',
			'Our hands sought dreams, amidst a thunderous cloud,'
		],
		[
			'In a realm where silence wears a heavy shroud,',
			'Our hands sought dreams, amidst a thunderous cloud,',
			'Within a labyrinth of waves, fiercely we tread,'
		],
		[
			'In a realm where silence wears a heavy shroud,',
			'Our hands sought dreams, amidst a thunderous cloud,',
			'Within a labyrinth of waves, fiercely we tread,',
			'Our strength, drowned by hidden rivers, where tears shed.'
		],
		[
			'In a realm where silence wears a heavy shroud,',
			'Our hands sought dreams, amidst a thunderous cloud,',
			'Within a labyrinth of waves, fiercely we tread,',
			'Our strength, drowned by hidden rivers, where tears shed.'
		],
		[
			'Through a relentless storm, our fingers traced,',
			'The scars of battles fought, our pain embraced.',
			'Each finger a symbol, united in fist,',
			'Embarking treacherous waters, in injustice’s mist.'
		],
		[
			'Utility in hand, track the stars of night,',
			'In search of land, they too take flight,',
			'Navigating the depths, where shadows reside,',
			'With unwavering purpose, as the tempests collide.'
		],
		[
			'And remember, Dear Ocean, as you judge and claim,',
			'Each hand worthy of sail, in its steadfast frame,',
			'For when they reach out, they all shake the same,',
			'Invisible hands, in unity, write their own name.'
		]
	];

	const keyframes = [
		{
			activeVerse: 0,
			activeLines: [0],
			render: () => {
				const d2000s = data.filter((v) => v['FromYear'] === '2018');
				const x = [
					'Age',
					'Color',
					'Disability',
					'Equal Pay Act',
					'GINA',
					'National Origin',
					'Race',
					'Religion',
					'Retaliation',
					'Sex'
				];
				const y = x.map((t) =>
					d2000s
						.filter((v) => v['Charge/Gender'].includes(t))
						.reduce((a, b) => a + parseInt(b['Count']), 0)
				);
				const d = x.map((v, i) => {
					return { x: v, y: y[i] };
				});
				dark = true;
				updateBarChart(d, dark, '2018 Charge Counts by Charge Group');
			}
		},
		{
			activeVerse: 1,
			activeLines: [1],
			render: () => {
				const d2000s = data.filter((v) => v['FromYear'] === '2019');
				const x = [
					'Age',
					'Color',
					'Disability',
					'Equal Pay Act',
					'GINA',
					'National Origin',
					'Race',
					'Religion',
					'Retaliation',
					'Sex'
				];
				const y = x.map((t) =>
					d2000s
						.filter((v) => v['Charge/Gender'].includes(t))
						.reduce((a, b) => a + parseInt(b['Count']), 0)
				);
				const d = x.map((v, i) => {
					return { x: v, y: y[i] };
				});
				dark = true;
				updateBarChart(d, dark, '2019 Charge Counts by Charge Group');
			}
		},
		{
			activeVerse: 2,
			activeLines: [2],
			render: () => {
				const d2000s = data.filter((v) => v['FromYear'] === '2020');
				const x = [
					'Age',
					'Color',
					'Disability',
					'Equal Pay Act',
					'GINA',
					'National Origin',
					'Race',
					'Religion',
					'Retaliation',
					'Sex'
				];
				const y = x.map((t) =>
					d2000s
						.filter((v) => v['Charge/Gender'].includes(t))
						.reduce((a, b) => a + parseInt(b['Count']), 0)
				);
				const d = x.map((v, i) => {
					return { x: v, y: y[i] };
				});
				dark = true;
				updateBarChart(d, dark, '2020 Charge Counts by Charge Group');
			}
		},
		{
			activeVerse: 3,
			activeLines: [3],
			render: () => {
				const d2000s = data.filter((v) => v['FromYear'] === '2021');
				const x = [
					'Age',
					'Color',
					'Disability',
					'Equal Pay Act',
					'GINA',
					'National Origin',
					'Race',
					'Religion',
					'Retaliation',
					'Sex'
				];
				const y = x.map((t) =>
					d2000s
						.filter((v) => v['Charge/Gender'].includes(t))
						.reduce((a, b) => a + parseInt(b['Count']), 0)
				);
				const d = x.map((v, i) => {
					return { x: v, y: y[i] };
				});
				dark = true;
				updateBarChart(d, dark, '2021 Charge Counts by Charge Group');
			}
		},
		{
			activeVerse: 4,
			activeLines: [0, 1, 2, 3, 4],
			render: () => {
				const x = [
					'Age',
					'Color',
					'Disability',
					'Equal Pay Act',
					'GINA',
					'National Origin',
					'Race',
					'Religion',
					'Retaliation',
					'Sex'
				];
				const y = x.map((t) =>
					data
						.filter((v) => v['Charge/Gender'].includes(t))
						.reduce((a, b) => a + parseInt(b['Count']), 0)
				);
				const d = x.map((v, i) => {
					return { x: v, y: y[i] };
				});
				dark = true;
				updateBarChart(d, dark, 'Charge Counts by Charge Group from 2017 - 2021');
			}
		},
		{
			activeVerse: 5,
			activeLines: [0, 1, 2, 3, 4],
			render: () => {
				const x = [
					'Age',
					'Color',
					'Disability',
					'Equal Pay Act',
					'GINA',
					'National Origin',
					'Race',
					'Religion',
					'Retaliation',
					'Sex'
				];
				const y = x.map((t) =>
					data
						.filter((v) => v['Charge/Gender'].includes(t))
						.reduce((a, b) => a + parseInt(b['Count']), 0)
				);
				const d = x.map((v, i) => {
					return { x: v, y: y[i] };
				});
				dark = false;
				updateBarChart(d, dark, 'Charge Counts by Charge Group from 2017 - 2021');
			}
		},
		{
			activeVerse: 6,
			activeLines: [0, 1, 2, 3, 4],
			render: () => {}
		},
		{
			activeVerse: 7,
			activeLines: [0, 1, 2, 3, 4],
			render: () => {}
		}
	];

	$: keyframe = 0;

	$: isDown = false;
	$: startX = 0;
	$: scrollLeft = 0;

	let poemContainer: HTMLDivElement;
</script>

<div
	class={`h-full w-full transition-colors ${
		dark ? 'bg-black fill-white text-white' : 'bg-white fill-black text-black'
	}`}
>
	<div class={`flex h-full w-full max-w-[1440px] flex-col items-start justify-center p-8`}>
		{#if mounted}
			<div
				class={`${ready ? 'max-h-4/6 min-h-4/6 h-4/6 w-full min-w-full' : ''}`}
				bind:clientWidth={width}
				bind:clientHeight={height}
			>
				<svg id="svg" class="min-h-full min-w-full text-black" />
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
								keyframes[keyframe].render();
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
								on:inview_enter={() => {
									keyframe = verseID;
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
											class={`text-lg ${
												keyframes.length > keyframe &&
												keyframes[keyframe].activeLines.includes(lineID)
													? 'opacity-100'
													: 'opacity-80'
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
					<RightArrow />
				</div>
			{/if}
		{/if}

		{#if !ready}
			<div class="flex h-full w-full animate-pulse flex-col items-center justify-center">
				<p class="text-5xl">Handshake</p>
				<Handshake {dark} />
				<br />
				<p class="text-sm text-gray-500">Click and drag the poem scroll</p>
			</div>
		{/if}
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
</style>
