SandHEX.Tile = DS.Model.extend({
	terrain: DS.attr('string'),
	color: DS.attr('string'),
	is_visited: DS.attr('boolean'),
	is_explored: DS.attr('boolean'),
	q: DS.attr('number'),
	r: DS.attr('number')
});
