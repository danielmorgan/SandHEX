SandHEX.Router.map(function() {
	this.resource('tiles');
	this.resource('tile', { path: '/tiles/:tile_id' });
});


SandHEX.ApplicationRoute = Ember.Route.extend({
	model: function(params) {
		return this.store.find('tile');
	},
	setupController: function(controller, model) {
		this.store.find('party').then(function(party) {
			controller.set('party', party)
		})
	}
});

SandHEX.TilesRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('tiles', {
			outlet: 'sidebar',
			into: 'application'
		});
	}
});

SandHEX.TileRoute = Ember.Route.extend({
	renderTemplate: function() {
		this.render('tile', {
			outlet: 'sidebar',
			into: 'application'
		});
	}
});


SandHEX.LoadingRoute = Ember.Route.extend({
	activate: function(){
		this._super();
		console.log("loading...");
	},
	deactivate: function(){
		this._super();
		console.log("loaded!");
	}
});
