SandHEX.Tile = DS.Model.extend({
	terrain: DS.attr('string'),
	is_visible: DS.attr('boolean'),
	is_visited: DS.attr('boolean'),
	is_explored: DS.attr('boolean'),
	q: DS.attr('number'),
	r: DS.attr('number')
});
