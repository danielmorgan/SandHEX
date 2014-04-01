SandHEX.Tile = DS.Model.extend({
	type: DS.attr('string'),
	isVisited: DS.attr('boolean'),
	isExplored: DS.attr('boolean')
});

SandHEX.Tile.FIXTURES = [
	{
		id: 1,
		type: 'forest',
		isVisited: true,
		isExplored: true
	},
	{
		id: 2,
		type: 'river',
		isVisited: true,
		isExplored: true
	},
	{
		id: 3,
		type: 'river',
		isVisited: true,
		isExplored: false
	},
	{
		id: 4,
		type: 'river',
		isVisited: true,
		isExplored: false
	},
	{
		id: 5,
		type: 'mountain',
		isVisited: false,
		isExplored: false
	},
	{
		id: 6,
		type: 'desert',
		isVisited: false,
		isExplored: false
	},
	{
		id: 7,
		type: 'hills',
		isVisited: false,
		isExplored: false
	},
	{
		id: 8,
		type: 'marsh',
		isVisited: false,
		isExplored: false
	}
];
