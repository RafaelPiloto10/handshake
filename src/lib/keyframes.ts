import { updateBarChart } from './charts';

export const verses = [
	['In a realm where silence wears a heavy shroud,'],
	[
		'In a realm where silence wears a heavy shroud,',
		'Our hands sought dreams, amidst a thunderous cloud,'
	],
	[
		'In a realm where silence wears a heavy shroud,',
		'Our hands sought dreams, amidst a thunderous cloud,',
		'Within a labyrinth of waves, fiercely the discriminated tread,'
	],
	[
		'In a realm where silence wears a heavy shroud,',
		'Our hands sought dreams, amidst a thunderous cloud,',
		'Within a labyrinth of waves, fiercely the discriminated tread,',
		'Their strength, drowned by hidden rivers, where tears shed.'
	],
	[
		'In a realm where silence wears a heavy shroud,',
		'Our hands sought dreams, amidst a thunderous cloud,',
		'Within a labyrinth of waves, fiercely the discriminated tread,',
		'Their strength, drowned by hidden rivers, where tears shed.'
	],
	[
		'Through a relentless storm, discriminated fingers traced,',
		'The scars of battles fought, their pain embraced.'
	],
	[
		'Through a relentless storm, discriminated fingers traced,',
		'The scars of battles fought, their pain embraced.',
		'Each finger a symbol, united in fist,',
		'Embarking treacherous waters, in injustice’s mist.'
	],
	['Utility in hand, track the stars of night,', 'In search of land, the discriminated too take flight,'],
	[
		'Utility in hand, track the stars of night,',
		'In search of land, the discriminated too take flight,',
		'Navigating the depths, where shadows reside,',
		'With unwavering purpose, as the tempests collide.'
	],
	['And remember, Dear Ocean, as you judge and claim,'],
	[
		'And remember, Dear Ocean, as you judge and claim,',
		'Each hand worthy of sail, in its steadfast frame,',
		'For when they reach out, they all shake the same,'
	],
	['Invisible hands, in unity, write their own name.']
];

export const keyframes = [
	{
		activeVerse: 0,
		activeLines: [0],
		background: 'dark-ocean',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const d2000s = state_data.filter((v) => v['FromYear'] === '2018');
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
			const s = d.sort((a, b) => (a.y > b.y ? -1 : 1));
			updateBarChart(
				s,
				'Equal Employment Opportunity Comission (EEOC) Cases by Charge Group (2018)',
			);
		}
	},
	{
		activeVerse: 1,
		activeLines: [1],
		background: 'dark-ocean',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const d2000s = state_data.filter((v) => v['FromYear'] === '2019');
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
			const s = d.sort((a, b) => (a.y > b.y ? -1 : 1));
			updateBarChart(
				s,
				'Equal Employment Opportunity Comission (EEOC) Cases by Charge Group (2019)',
				80000
			);
		}
	},
	{
		activeVerse: 2,
		activeLines: [2],
		background: 'dark-ocean',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const d2000s = state_data.filter((v) => v['FromYear'] === '2020');
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
			const s = d.sort((a, b) => (a.y > b.y ? -1 : 1));
			updateBarChart(
				s,
				'Equal Employment Opportunity Comission (EEOC) Cases by Charge Group (2020)',
				80000
			);
		}
	},
	{
		activeVerse: 3,
		activeLines: [3],
		background: 'dark-ocean',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const d2000s = state_data.filter((v) => v['FromYear'] === '2021');
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
			const s = d.sort((a, b) => (a.y > b.y ? -1 : 1));
			updateBarChart(
				s,
				'Equal Employment Opportunity Comission (EEOC) Cases by Charge Group (2021)',
				80000
			);
		}
	},
	{
		activeVerse: 4,
		activeLines: [],
		background: 'dark-ocean',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
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
				state_data
					.filter((v) => v['Charge/Gender'].includes(t))
					.reduce((a, b) => a + parseInt(b['Count']), 0)
			);
			const d = x.map((v, i) => {
				return { x: v, y: y[i] };
			});
			const s = d.sort((a, b) => (a.y > b.y ? -1 : 1));
			updateBarChart(
				s,
				'All Equal Employment Opportunity Comission (EEOC) Cases by Charge Group (2017 - 2021)'
			);
		}
	},
	{
		activeVerse: 5,
		activeLines: [0, 1],
		background: 'rain',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const regions: string[] = [];
			for (const row of state_data) {
				if (regions.includes(row['Region'])) {
					continue;
				} else {
					regions.push(row['Region']);
				}
			}

			const y = regions.map((r) =>
				state_data.filter((v) => v['Region'] === r).reduce((a, b) => a + parseInt(b['Count']), 0)
			);
			const colors = [
				'fill-red-500',
				'fill-blue-500',
				'fill-blue-500',
				'fill-blue-500',
				'fill-yellow-500'
			];
			const d = regions.map((v, i) => {
				return { x: v, y: y[i], color: colors[i] };
			});

			const s = d.sort((a, b) => (a.y > b.y ? -1 : 1));
			updateBarChart(s, 'All EEOC Cases by US Region (1997 - 2021)', undefined, [{color: "red", label: "Republican"}, {color: "blue", label: "Democrats"}, {color: "yellow", label: "Split"}]);
		}
	},
	{
		activeVerse: 6,
		activeLines: [2, 3],
		background: 'rain',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const states: string[] = [];
			for (const row of state_data) {
				if (states.includes(row['State'])) {
					continue;
				} else {
					states.push(row['State']);
				}
			}

			const y = states.map((r) =>
				state_data.filter((v) => v['State'] === r).reduce((a, b) => a + parseInt(b['Count']), 0)
			);
			const d = states.map((v, i) => {
				return { x: v, y: y[i] };
			});

			const s = d.sort((a, b) => (a.y > b.y ? -1 : 1));
			const colors = [
				'fill-red-500',
				'fill-red-500',
				'fill-blue-500',
				'fill-yellow-500',
				'fill-red-500',
				'fill-blue-500',
				'fill-yellow-500',
				'fill-blue-500',
				'fill-red-500',
				'fill-red-500',
				'fill-blue-500',
				'fill-red-500',
				'fill-red-500',
				'fill-yellow-500',
				'fill-yellow-500'
			];
			const top10 = s.slice(0, 15);
			const top10WithColors = top10.map((v, i) => {
				return { ...v, color: colors[i] };
			});
			updateBarChart(top10WithColors, 'All EEOC Cases by US State 1997 - 2021 (Top 15)', undefined, [{color: "red", label: "Republican"}, {color: "blue", label: "Democrats"}, {color: "yellow", label: "Split"}]);
		}
	},
	{
		activeVerse: 7,
		activeLines: [0, 1],
		background: 'stars',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const x: string[] = [
				'1997',
				'1998',
				'1999',
				'2000',
				'2001',
				'2002',
				'2003',
				'2004',
				'2005',
				'2006',
				'2007',
				'2008',
				'2009',
				'2010',
				'2011',
				'2012',
				'2013',
				'2014',
				'2015',
				'2016',
				'2017',
				'2018',
				'2019',
				'2020',
				'2021'
			];

			const y = x.map((t) =>
				resolution_data
					.filter((v) => v['Year'] === t)
					.reduce((a, b) => a + parseInt(b['Total_Monetary']), 0)
			);
			const d = x.map((v, i) => {
				return { x: v, y: y[i] };
			});

			const s = d.sort((a, b) => (parseInt(a.x) > parseInt(b.x) ? 1 : -1));
			updateBarChart(
				s,
				'EEOC Disability Case Monetary Resolutions (in Millions) Per Year (1997 - 2021)'
			);
		}
	},
	{
		activeVerse: 8,
		activeLines: [2, 3],
		background: 'stars',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const resolutions: any = resolution_data.map((v) => {
				return {
					...v,
					Type:
						v['Type'] !== 'No Reasonable Cause'
							? 'Settlement or Merit Resolution'
							: 'No Reasonable Cause'
				};
			});
			const x: string[] = ['No Reasonable Cause', 'Settlement or Merit Resolution'];
			const color: string[] = ['fill-red-500', 'fill-green-400'];

			const y = x.map((t) =>
				resolutions
					.filter((v: any) => v['Type'] === t)
					.reduce((a: any, b: any) => a + parseInt(b['Count'].replace(/,/g, '')), 0)
			);
			const d = x.map((v, i) => {
				return { x: v, y: y[i], color: color[i] };
			});

			const s = d.sort((a, b) => (a.y > b.y ? -1 : 1));
			updateBarChart(s, 'EEOC Disability Case Resolutions by Type (1992 - 2021)', undefined,  [{color: "red", label: "Closed"}, {color: "green", label: "Compensated"}]);
		}
	},

	{
		activeVerse: 9,
		activeLines: [0],
		background: 'ocean',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const x: string[] = [];
			for (const row of resolution_data) {
				if (!x.includes(row['Year'])) {
					x.push(row['Year']);
				}
			}

			const y = x.map((t) =>
				resolution_data
					.filter((v: any) => v['Year'] === t && v['Type'] === 'No Reasonable Cause')
					.reduce((a: any, b: any) => a + parseInt(b['Count'].replace(/,/g, '')), 0)
			);
			const d = x.map((v, i) => {
				return { x: v, y: y[i], color: 'fill-red-500' };
			});

			const s = d.sort((a, b) => (a.x > b.x ? 1 : -1));
			updateBarChart(
				s,
				'EEOC Disability Cases Closed Without Resolution Per Year (1992 - 2021)',
				25000,
				[{color: "red", label: "Closed"}]
			);
		}
	},
	{
		activeVerse: 10,
		activeLines: [1, 2],
		background: 'ocean',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			const x: string[] = [];
			for (const row of resolution_data) {
				if (!x.includes(row['Year'])) {
					x.push(row['Year']);
				}
			}

			const y = x.map((t) =>
				resolution_data
					.filter((v: any) => v['Year'] === t && v['Type'] !== 'No Reasonable Cause')
					.reduce((a: any, b: any) => a + parseInt(b['Count'].replace(/,/g, '')), 0)
			);
			const d = x.map((v, i) => {
				return { x: v, y: y[i], color: 'fill-green-500' };
			});

			const s = d.sort((a, b) => (a.x > b.x ? 1 : -1));
			updateBarChart(
				s,
				'EEOC Disability Cases Closed With Resolution Per Year (1992 - 2021)',
				25000,
				[{color: "green", label: "Compensated"}]
			);
		}
	},
	{
		activeVerse: 11,
		activeLines: [0],
		background: 'ocean',
		render: (state_data: d3.DSVRowArray, resolution_data: d3.DSVRowArray) => {
			// Nothing, handshake animation
		}
	}
];
