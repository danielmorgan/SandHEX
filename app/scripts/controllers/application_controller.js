SandHEX.ApplicationController = Ember.ArrayController.extend({
	needs: ['map', 'grid', 'tiles', 'party'],

	actions: {
		initApp: function() {
			this.get('controllers.map').createMap();
			this.get('controllers.grid').createGrid();
			this.get('controllers.tiles').loadTilesFromStore();
			this.get('controllers.party').loadParty();
		},
		deleteSave: function() {
			var e = confirm('Are you sure?');
			if (e == true) {
				localStorage.removeItem('SandHEX');
				location.assign('/');
			}
		}
	}
});
