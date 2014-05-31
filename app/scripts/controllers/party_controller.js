SandHEX.PartyController = Ember.ObjectController.extend({
	content: [],
	needs: ['tiles', 'grid', 'map'],
	queryParams: ['tile:tile_id'],

	actions: {
		moveNW: function() { this.move(-1,0); },
		moveSE: function() { this.move(1,0); },
		moveN: function() { this.move(0,1); },
		moveS: function() { this.move(0,-1); },
		moveNE: function() { this.move(1,1); },
		moveSW: function() { this.move(-1,-1); }
	},

	partyExists: function() {
		var records = this.store.all('party');
		var ap = Ember.ArrayProxy.create({ content: Ember.A(records) });
		var record = ap.get('firstObject');
		if (typeof record != "undefined") {
			return true;
		} else {
			return false;
		}
	},

	loadParty: function() {
		// Make a new party if one doesn't exist
		if (!this.partyExists()) {
			this.party = this.store.push('party', { id: 0, q: 0, r: 0 });
			this.party.save();
		}

		// Load the existing party if it does
		else {
			var records = this.store.all('party');
			var ap = Ember.ArrayProxy.create({ content: Ember.A(records) });
			this.party = ap.get('firstObject');
		}

		// Add the marker to the map representing the party
		var partyLocationOnMap = this.get('controllers.grid').hexCoordToMapCoord(this.party.get('q'), this.party.get('r'));
		this.partyMarker = new L.marker([partyLocationOnMap['lng'], partyLocationOnMap['lat']]);
		this.get('controllers.map.map').addLayer(this.partyMarker);

		// Reveal surrounding tiles
		this.scout(this.party.get('q'), this.party.get('r'));
		this.loadTileInSidebar(this.party.get('q'), this.party.get('r'));
	},

	move: function(q, r) {
		// Set the variables to new coords
		this.party.set('q', this.party.get('q') + q);
		this.party.set('r', this.party.get('r') + r);

		// Persist new location
		this.party.save();

		// Reveal surrounding tiles of new location
		this.scout(this.party.get('q'), this.party.get('r'));

		// Convert to LatLng coordinates and place marker at new location
		var partyLocationOnMap = this.get('controllers.grid').hexCoordToMapCoord(this.party.get('q'), this.party.get('r'));
		this.partyMarker.setLatLng([partyLocationOnMap['lng'], partyLocationOnMap['lat']]);

		// Load tile info in sidebar for party's destination
		this.loadTileInSidebar(this.party.get('q'), this.party.get('r'));
	},

	loadTileInSidebar: function(q, r) {
		var tile = this.get('controllers.tiles').findTileAt(q, r);
		if (tile) {
			var id = tile[0]['id'];
			this.transitionToRoute('tile', id);
			this.get('controllers.grid').highlightSelectedHex(id);
		}
	},

	scout: function(q, r) {
		this.get('controllers.tiles').newTile(q, r);

		var directions = [
			[-1,0], [0,1], [1,1],
			[-1,-1], [0,-1], [1,0]
		];
		for (i = 0; i < directions.length; i++) {
			var adjacent_q = (directions[i][0]) + q;
			var adjacent_r = (directions[i][1]) + r;
			this.get('controllers.tiles').newTile(adjacent_q, adjacent_r);
		}
	}

});
