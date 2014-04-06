SandHEX.Tile = DS.Model.extend({
	terrain: DS.attr('string'),
	is_visible: DS.attr('boolean'),
	is_visited: DS.attr('boolean'),
	is_explored: DS.attr('boolean'),
	q: DS.attr('number'),
	r: DS.attr('number')
});

SandHEX.Tile.FIXTURES = [
	{
		id: 1,
		terrain: 'forest',
		is_visible: true,
		is_visited: true,
		is_explored: true,
		q: 0,
		r: 0
	},
	{
		id: 2,
		terrain: 'river',
		is_visible: true,
		is_visited: true,
		is_explored: true,
		q: -1,
		r: 0
	},
	{
		id: 3,
		terrain: 'river',
		is_visible: true,
		is_visited: true,
		is_explored: false,
		q: -2,
		r: 0
	},
	{
		id: 4,
		terrain: 'river',
		is_visible: true,
		is_visited: true,
		is_explored: false,
		q: -3,
		r: 0
	},
	{
		id: 5,
		terrain: 'mountain',
		is_visible: true,
		is_visited: false,
		is_explored: false,
		q: 0,
		r: 1
	},
	{
		id: 6,
		terrain: 'desert',
		is_visible: true,
		is_visited: false,
		is_explored: false,
		q: 0,
		r: 2
	},
	{
		id: 7,
		terrain: 'hills',
		is_visible: true,
		is_visited: false,
		is_explored: false,
		q: 0,
		r: 3
	}
];
