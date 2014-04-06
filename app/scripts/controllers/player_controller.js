SandHEX.PlayerController = Ember.ObjectController.extend({
	needs: ['tiles', 'grid', 'map'],

	playerLocation: [0,0],

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

		if (!this.get('controllers.tiles').tileExistsAt(this.playerLocation[0], this.playerLocation[1])) {
			this.get('controllers.tiles').newTile(this.playerLocation);
		}
	},

	move: function(q, r) {
		new_q = this.playerLocation[0] + q;
		new_r = this.playerLocation[1] + r;
		this.playerLocation = [new_q, new_r];

		var playerLocationOnMap = this.get('controllers.grid').hexCoordToMapCoord(new_q, new_r);
		this.playerMarker.setLatLng([playerLocationOnMap['lng'], playerLocationOnMap['lat']]);

		if (!this.get('controllers.tiles').tileExistsAt(new_q, new_r)) {
			this.get('controllers.tiles').newTile([new_q, new_r]);
		}
	}

});
