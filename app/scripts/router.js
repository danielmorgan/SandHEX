SandHEX.Router.map(function() {
	this.resource('tiles');
	this.resource('tile', { path: '/tiles/:tile_id' });
});

SandHEX.ApplicationRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('tile');
	},
});

SandHEX.TilesRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('tile');
	},
	renderTemplate: function() {
		this.render('tiles', {
			outlet: 'sidebar'
		});
	}
});


SandHEX.TileRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('tile', params.tile_id);
	},
	renderTemplate: function() {
		this.render('tile', {
			outlet: 'sidebar'
		});
	}
});
