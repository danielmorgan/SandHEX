SandHEX.PlayerController = Ember.ObjectController.extend({
	needs: ['tiles', 'grid', 'map'],

	playerLocation: [0,0],
	directions: [
		[-1,0], [0,1], [1,1],
		[-1,-1], [0,-1], [1,0]
	],

	actions: {
		moveNW: function() { this.move(-1,0); },
		moveSE: function() { this.move(1,0); },
		moveN: function() { this.move(0,1); },
		moveS: function() { this.move(0,-1); },
		moveNE: function() { this.move(1,1); },
		moveSW: function() { this.move(-1,-1); }
	},

	loadPlayer: function() {
		var playerLocationOnMap = this.get('controllers.grid').hexCoordToMapCoord(this.playerLocation[0], this.playerLocation[1]);
		this.playerMarker = new L.marker([playerLocationOnMap['lng'], playerLocationOnMap['lat']]);
		this.get('controllers.map.Map').addLayer(this.playerMarker);

		this.scout(this.playerLocation[0], this.playerLocation[1]);
	},

	move: function(q, r) {
		this.playerLocation[0] = this.playerLocation[0] + q;
		this.playerLocation[1] = this.playerLocation[1] + r;

		this.scout(this.playerLocation[0], this.playerLocation[1]);

		var playerLocationOnMap = this.get('controllers.grid').hexCoordToMapCoord(this.playerLocation[0], this.playerLocation[1]);
		this.playerMarker.setLatLng([playerLocationOnMap['lng'], playerLocationOnMap['lat']]);

	},

	scout: function(q, r) {
		this.get('controllers.tiles').newTile(q, r);

		for (i = 0; i < this.directions.length; i++) {
			var adjacent_q = (this.directions[i][0]) + q;
			var adjacent_r = (this.directions[i][1]) + r;
			this.get('controllers.tiles').newTile(adjacent_q, adjacent_r);
		}
	}

});
