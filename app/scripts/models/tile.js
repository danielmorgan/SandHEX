SandHEX.Tile = DS.Model.extend({
	terrain: DS.attr('string'),
	isVisited: DS.attr('boolean'),
	isExplored: DS.attr('boolean'),
	q: DS.attr('number'),
	r: DS.attr('number')
});

SandHEX.Tile.FIXTURES = [
	{
		id: 1,
		terrain: 'forest',
		isVisited: true,
		isExplored: true,
		q: 0,
		r: 0
	},
	{
		id: 2,
		terrain: 'river',
		isVisited: true,
		isExplored: true,
		q: -1,
		r: 0
	},
	{
		id: 3,
		terrain: 'river',
		isVisited: true,
		isExplored: false,
		q: -2,
		r: 0
	},
	{
		id: 4,
		terrain: 'river',
		isVisited: true,
		isExplored: false,
		q: -3,
		r: 0
	},
	{
		id: 5,
		terrain: 'mountain',
		isVisited: false,
		isExplored: false,
		q: 0,
		r: 1
	},
	{
		id: 6,
		terrain: 'desert',
		isVisited: false,
		isExplored: false,
		q: 0,
		r: 2
	},
	{
		id: 7,
		terrain: 'hills',
		isVisited: false,
		isExplored: false,
		q: 0,
		r: 3
	}
];
