import * as d3 from 'd3';

let chartWidth = 300;
let chartHeight = 300;

let chart: any;
let svg: any;

let xScale: d3.ScaleBand<string>;
let yScale: d3.ScaleLinear<number, number, never>;

const margin = { top: 30, right: 30, bottom: 50, left: 50 };

type Data = {
	x: string;
	y: number;
}[];

let filtered = '';
let showValues = false;

export function filterColors(v: string) {
	if (filtered && filtered === v) {
		filtered = '';
	} else {
		filtered = v;
	}
}

export function initializeSVG(
	width: number,
	height: number,
	xs: d3.ScaleBand<string>,
	ys: d3.ScaleLinear<number, number, never>
) {
	xScale = xs;
	yScale = ys;

	svg = d3.select('#svg');
	svg.attr('width', width);
	svg.attr('height', height);

	svg.selectAll('*').remove();

	chartWidth = width - margin.left - margin.right;
	chartHeight = height - margin.top - margin.bottom;

	chart = svg
		.append('g')
		.attr('class', 'group')
		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

	xScale = d3.scaleBand().domain([]).range([0, chartWidth]).padding(0.1);

	yScale = d3.scaleLinear().domain([]).nice().range([chartHeight, 0]);

	chart
		.append('g')
		.attr('class', 'x-axis')
		.attr('transform', `translate(0,${chartHeight})`)
		.call(d3.axisBottom(xScale))
		.selectAll('text');

	chart.append('g').attr('class', 'y-axis').call(d3.axisLeft(yScale)).selectAll('text');

	svg
		.append('text')
		.attr('id', 'chart-title')
		.attr('x', width / 2)
		.attr('y', 20)
		.attr('text-anchor', 'middle')
		.attr('class', 'text-2xl text-white')
		.text('');
}

export function updateBarChart(
	data: Data,
	title = '',
	ys: undefined | number = undefined,
	legend: { color: string; label: string }[] = []
) {
	xScale.domain(data.map((d) => d.x));
	yScale.domain([0, ys === undefined ? d3.max(data, (d) => d.y) : ys]).nice();

	svg.selectAll('.label').remove();
	if (legend.length > 0) {
		for (let i = 0; i < legend.length; i++) {
			const l = legend[i];
			const label = svg.append('g').attr('class', 'label');
			const xLoc = chartWidth / 2 - 160 * (legend.length / 2 - i) + 75;
			label
				.append('circle')
				.attr('cx', xLoc)
				.attr('cy', chartHeight + margin.bottom + 15)
				.attr('r', 6)
				.style('fill', l.color);
			label
				.append('text')
				.attr('x', xLoc + 10)
				.attr('y', chartHeight + margin.bottom + 15)
				.text(l.label)
				.style('font-size', '15px')
				.attr('alignment-baseline', 'middle');
		}
	}

	const bars = chart.selectAll('.bar').data(data, (d) => d.x);
	const tips = chart.selectAll('.tip').data(data, (d) => d.y);
	const ids = new Map<string, number>();
	data.map((v, i) => ids.set(v.x, i));

	tips
		.exit()
		.remove();

	tips
		.enter()
		.append('text')
		.attr('class', (d) => `tip tip-${ids.get(d.x)}`)
		.attr('x', (d) => xScale(d.x) + (xScale.bandwidth() / 4))
		.attr('y', (d) => yScale(d.y) - 10)
		.style('fill', 'none')
		.text((d) => d.y)

	bars
		.exit()
		.transition()
		.duration(500)
		.attr('y', chartHeight)
		.attr('height', 0)
		.attr('class', (d) => {
			const base = 'bar transition-colors bar';
			const hover = `group-hover:fill-slate-700 hover:!fill-white`;

			if (filtered && d.color) {
				if (d.color === filtered) {
					return `${base} ${d.color}`;
				} else {
					return `${base} !fill-slate-700 ${d.color}`;
				}
			}

			if (d.color) return `${base} ${hover} ${d.color}`;
			return `fill-white ${base} ${hover}`;
		})
		.remove();

	bars
		.transition()
		.duration(1000)
		.attr('x', (d) => xScale(d.x))
		.attr('y', (d) => yScale(d.y))
		.attr('class', (d) => {
			const base = 'bar transition-colors bar';
			const hover = `group-hover:fill-slate-700 hover:!fill-white`;

			if (filtered && d.color) {
				if (d.color === filtered) {
					return `${base} ${d.color}`;
				} else {
					return `${base} !fill-slate-700 ${d.color}`;
				}
			}

			if (d.color) return `${base} ${hover} ${d.color}`;
			return `fill-white ${base} ${hover}`;
		})
		.attr('height', (d) => chartHeight - yScale(d.y))
		.attr('width', xScale.bandwidth());

	bars
		.enter()
		.append('rect')
		.attr('class', (d) => {
			const base = 'bar transition-colors bar';
			const hover = `group-hover:fill-slate-700 hover:!fill-white`;

			if (filtered) {
				if (d.color === filtered) {
					return `${base} ${d.color}`;
				} else {
					return `${base} !fill-slate-700 ${d.color}`;
				}
			}

			if (d.color) return `${base} ${hover} ${d.color}`;
			return `fill-white ${base} ${hover}`;
		})
		.attr('x', (d) => xScale(d.x))
		.attr('y', chartHeight)
		.attr('height', 0)
		.attr('width', xScale.bandwidth())
		.transition()
		.duration(1000)
		.attr('y', (d) => yScale(d.y))
		.attr('height', (d) => chartHeight - yScale(d.y));

	chart
		.select('.x-axis')
		.transition()
		.duration(1000)
		.attr('color', 'white')
		.call(d3.axisBottom(xScale));

	chart
		.select('.y-axis')
		.transition()
		.duration(1000)
		.attr('color', 'white')
		.call(d3.axisLeft(yScale));

	if (title.length > 0) {
		svg
			.select('#chart-title')
			.transition()
			.duration(1000)
			.attr('class', 'text-white fill-white text-2xl')
			.text(title);
	}

	setTimeout(() => {
		d3.selectAll('.bar')
			.on('mouseover', (e, d) => {
				d3.select(`.tip-${ids.get(d.x)}`)
					.style('fill', 'white');
			})
			.on('mouseleave', (e, d) => {
				d3.selectAll('.tip')
					.style('fill', 'none');
			});
	}, 1100);
}
