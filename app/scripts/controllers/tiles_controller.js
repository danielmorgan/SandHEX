SandHEX.TilesController = Ember.ArrayController.extend({
	partyLocation: [0,0],
	needs: ['hex', 'grid', 'map'],

	actions: {
		onDidInsertElement: function() {
			this.get('controllers.grid').createLayer();

			this.loadTilesFromStore();
			this.loadParty();
		},
		moveNW: function() { this.move(-1,0); },
		moveN: function() { this.move(0,1); },
		moveNE: function() { this.move(1,0); },
		moveSW: function() { this.move(-1,-1); },
		moveS: function() { this.move(0,-1); },
		moveSE: function() { this.move(1,-1); }
	},

	loadParty: function() {
		this.partyMarker = new L.marker(this.partyLocation);
		this.get('controllers.map.Map').addLayer(this.partyMarker);
	},

	loadTilesFromStore: function() {
		var tiles = this.store.all('tile');
		var hexCoords = [];
		for (i = 0; i < tiles.content.length; i++) {
			var tile = tiles.content[i];
			hexCoords.push({
				'id': tile.get('id'),
				'q': tile.get('q'),
				'r': tile.get('r')
			});
		}
		var mapCoords = this.get('controllers.grid').hexCoordsToMapCoords(hexCoords);
		this.get('controllers.grid').addTilesToGrid(mapCoords);
	},

	move: function(q, r) {
		new_q = this.partyLocation[0] + q;
		new_r = this.partyLocation[1] + r;
		this.partyLocation = [new_q, new_r];

		var hexCoords = [];
		hexCoords.push({
			'id': null,
			'q': new_q,
			'r': new_r
		});
		var mapCoords = this.get('controllers.grid').hexCoordsToMapCoords(hexCoords);
		this.partyMarker.setLatLng([mapCoords[0]['lon'], mapCoords[0]['lat']]);

		this.newTile([new_q, new_r]);
	},

	newTile: function(hexCoord) {
		var tile = this.store.createRecord('tile', {
			terrain: 'forest',
			isVisited: false,
			isExplored: false,
			x: hexCoord[0],
			z: hexCoord[1]
		});
		var array = {
			'id': tile['id'],
			'q': hexCoord[0],
			'r': hexCoord[1]
		};
		var mapCoords = this.get('controllers.grid').hexCoordsToMapCoords([array]);
		this.get('controllers.grid').addTilesToGrid(mapCoords);
	}

});
