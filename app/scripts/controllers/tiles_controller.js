SandHEX.TilesController = Ember.ArrayController.extend({
	needs: ['hex', 'grid', 'map', 'player'],

	actions: {
		onDidInsertElement: function() {
			this.get('controllers.grid').createLayer();
			this.get('controllers.player').loadPlayer();
			this.loadTilesFromStore();
		}
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

	newTile: function(hexCoord) {
		var tile = this.store.createRecord('tile', {
			terrain: 'forest',
			is_visible: false,
			is_visited: false,
			is_explored: false,
			q: hexCoord[0],
			r: hexCoord[1]
		});
		var array = {
			'id': tile['id'],
			'q': hexCoord[0],
			'r': hexCoord[1]
		};
		var mapCoords = this.get('controllers.grid').hexCoordsToMapCoords([array]);
		this.get('controllers.grid').addTilesToGrid(mapCoords);
	},

	tileExistsAt: function(q, r) {
		// Check the store to see if a tile already exists at this location
		return false;
	}

});
