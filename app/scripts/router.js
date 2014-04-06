SandHEX.Router.map(function() {
	this.route('about');
	this.resource('tiles', { path: '/' });
});

SandHEX.TilesRoute = Ember.Route.extend({
	model: function() {
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
