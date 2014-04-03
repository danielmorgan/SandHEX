SandHEX.Tile = DS.Model.extend({
	terrain: DS.attr('string'),
	isVisited: DS.attr('boolean'),
	isExplored: DS.attr('boolean'),
	x: DS.attr('number'),
	y: DS.attr('number')
});

SandHEX.Tile.FIXTURES = [
	{
		id: 1,
		terrain: 'forest',
		isVisited: true,
		isExplored: true,
		x: 0,
		y: 0
	},
	{
		id: 2,
		terrain: 'river',
		isVisited: true,
		isExplored: true,
		x: 1,
		y: 0
	},
	{
		id: 3,
		terrain: 'river',
		isVisited: true,
		isExplored: false,
		x: 1,
		y: 1
	},
	{
		id: 4,
		terrain: 'river',
		isVisited: true,
		isExplored: false,
		x: 2,
		y: 1
	},
	{
		id: 5,
		terrain: 'mountain',
		isVisited: false,
		isExplored: false,
		x: 2,
		y: 2
	},
	{
		id: 6,
		terrain: 'desert',
		isVisited: false,
		isExplored: false,
		x: 2,
		y: 3
	},
	{
		id: 7,
		terrain: 'hills',
		isVisited: false,
		isExplored: false,
		x: 3,
		y: 2
	},
	{
		id: 8,
		terrain: 'marsh',
		isVisited: false,
		isExplored: false,
		x: 3,
		y: 4
	}
];
