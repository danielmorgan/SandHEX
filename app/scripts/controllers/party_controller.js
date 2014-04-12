SandHEX.PartyController = Ember.ObjectController.extend({
	needs: ['tiles', 'grid', 'map'],
	queryParams: ['tile:tile_id'],

	partyLocation: [0,0],
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

	loadParty: function() {
		var partyLocationOnMap = this.get('controllers.grid').hexCoordToMapCoord(this.partyLocation[0], this.partyLocation[1]);
		this.partyMarker = new L.marker([partyLocationOnMap['lng'], partyLocationOnMap['lat']]);
		this.get('controllers.map.map').addLayer(this.partyMarker);

		this.scout(this.partyLocation[0], this.partyLocation[1]);
		this.loadTile(this.partyLocation[0], this.partyLocation[1]);
	},

	move: function(q, r) {
		this.partyLocation[0] = this.partyLocation[0] + q;
		this.partyLocation[1] = this.partyLocation[1] + r;

		this.scout(this.partyLocation[0], this.partyLocation[1]);

		var partyLocationOnMap = this.get('controllers.grid').hexCoordToMapCoord(this.partyLocation[0], this.partyLocation[1]);
		this.partyMarker.setLatLng([partyLocationOnMap['lng'], partyLocationOnMap['lat']]);

		this.loadTile(this.partyLocation[0], this.partyLocation[1]);
	},

	loadTile: function(q, r) {
		var data = this.get('controllers.tiles').findTileAt(q, r);
		var id = data[0]['id'];
		this.transitionToRoute('tile', id);
		this.get('controllers.grid').highlightSelectedHex(id);
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
