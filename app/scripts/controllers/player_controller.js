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
		this.playerMarker = new L.marker(this.playerLocation);
		this.get('controllers.map.Map').addLayer(this.playerMarker);
	},

	move: function(q, r) {
		new_q = this.playerLocation[0] + q;
		new_r = this.playerLocation[1] + r;
		this.playerLocation = [new_q, new_r];

		var hexCoords = [];
		hexCoords.push({
			'q': new_q,
			'r': new_r
		});
		var mapCoords = this.get('controllers.grid').hexCoordsToMapCoords(hexCoords);
		this.playerMarker.setLatLng([mapCoords[0]['lon'], mapCoords[0]['lat']]);

		if (!this.get('controllers.tiles').tileExistsAt(new_q, new_r)) {
			this.get('controllers.tiles').newTile([new_q, new_r]);
		}
	}

});
