import * as d3 from 'd3';

let chartWidth = 300;
let chartHeight = 300;

let chart: any;
let svg: any;
let xScale: d3.ScaleBand<string>;
let yScale: d3.ScaleLinear<number, number, never>;

type Data = {
	x: string,
	y: number
}[];

export function initializeSVG(width: number, height: number, xs: d3.ScaleBand<string>, ys: d3.ScaleLinear<number, number, never>) {
	xScale = xs;
	yScale = ys;

	svg = d3.select("#svg");
	svg.attr("width", width);
	svg.attr("height", height);

	svg.selectAll("*").remove();

	const margin = { top: 30, right: 30, bottom: 50, left: 50 };
	chartWidth = width - margin.left - margin.right;
	chartHeight = height - margin.top - margin.bottom;

	chart = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	xScale = d3.scaleBand()
		.domain([])
		.range([0, chartWidth])
		.padding(0.1);

	yScale = d3.scaleLinear()
		.domain([])
		.nice()
		.range([chartHeight, 0]);

	chart.append("g")
		.attr("class", "x-axis")
		.attr("transform", `translate(0,${chartHeight})`)
		.call(d3.axisBottom(xScale))
		.selectAll("text");

	chart.append("g")
		.attr("class", "y-axis")
		.call(d3.axisLeft(yScale))
		.selectAll("text");

	svg.append("text")
		.attr("id", "chart-title")
		.attr("x", width / 2)
		.attr("y", 20)
		.attr("text-anchor", "middle")
		.style("font-size", "18px")
		.style("fill", "black")
		.text("");
}

export function updateBarChart(data: Data, dark: boolean, title = "") {
	xScale.domain(data.map(d => d.x));
	yScale.domain([0, d3.max(data, d => d.y)]).nice();

	const bars = chart.selectAll(".bar")
		.data(data, d => d.x);

	bars.exit()
		.transition()
		.duration(500)
		.attr("y", chartHeight)
		.attr("height", 0)
		.remove();

	bars
		.transition()
		.duration(1000)
		.attr("x", d => xScale(d.x))
		.attr("y", d => yScale(d.y))
		.attr("fill", dark ? "white" : "black")
		.attr("height", d => chartHeight - yScale(d.y));

	bars.enter().append("rect")
		.attr("class", "bar")
		.attr("x", d => xScale(d.x))
		.attr("y", chartHeight)
		.attr("height", 0)
		.attr("width", xScale.bandwidth())
		.attr("fill", dark ? "white" : "black")
		.transition()
		.duration(1000)
		.attr("y", d => yScale(d.y))
		.attr("height", d => chartHeight - yScale(d.y));

	chart.select(".x-axis")
		.transition()
		.duration(1000)
		.attr("color", dark ? "white" : "black")
		.call(d3.axisBottom(xScale));

	chart.select(".y-axis")
		.transition()
		.duration(1000)
		.attr("color", dark ? "white" : "black")
		.call(d3.axisLeft(yScale));

	if (title.length > 0) {
		svg.select("#chart-title")
			.transition()
			.duration(1000)
			.style("fill", dark ? "white" : "black")
			.text(title);
	}
}
