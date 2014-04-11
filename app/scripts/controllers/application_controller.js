SandHEX.ApplicationController = Ember.ArrayController.extend({
	needs: ['map', 'grid', 'tiles', 'player'],

	actions: {
		initApp: function() {
			this.get('controllers.map').createMap();
			this.get('controllers.grid').createGrid();
			this.get('controllers.tiles').loadTilesFromStore();
			this.get('controllers.player').loadPlayer();
		}
	}
});
