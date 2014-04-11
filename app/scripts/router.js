SandHEX.Router.map(function() {
	this.route('about');
	this.resource('tiles');
	this.resource('tile', { path: '/tiles/:tile_id' });
});

SandHEX.IndexRoute = Ember.Route.extend({
	model: function() {
		return this.store.find('tile');
	},
	renderTemplate: function() {
		this.render('map', {
			outlet: 'main'
		});
	}
});

SandHEX.TilesRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('tile');
	},
	renderTemplate: function() {
		this.render('tiles', {
			outlet: 'sidebar'
		});
		this.render('map', {
			outlet: 'main'
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
		this.render('map', {
			outlet: 'main'
		});
	}
});
