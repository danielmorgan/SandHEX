SandHEX.TilesController = Ember.ArrayController.extend({
	sortProperties: ['q', 'r'],
	sortAscending: true,
	needs: ['hex', 'grid', 'map', 'party'],

	loadTilesFromStore: function() {
		var tiles = this.store.all('tile');
		for (i = 0; i < tiles.content.length; i++) {
			var tile = tiles.content[i];
			var mapCoord = this.get('controllers.grid').hexCoordToMapCoord(tile.get('q'), tile.get('r'), tile.get('id'));
			this.get('controllers.grid').addTileToGrid(mapCoord);
		}
	},

	newTile: function(q, r) {
		if (!this.tileExistsAt(q, r)) {
			var terrain = this.generateTerrain()
			var tile = this.store.createRecord('tile', {
				terrain: terrain.type,
				color: terrain.color,
				is_visited: false,
				is_explored: false,
				q: q,
				r: r
			});
			tile.save();
			var mapCoord = this.get('controllers.grid').hexCoordToMapCoord(q, r, tile['id']);
			this.get('controllers.grid').addTileToGrid(mapCoord);
			return tile;
		}
	},

	tileExistsAt: function(q, r) {
		var tilesAtPoint = this.store.all('tile').filterBy('q', q).filterBy('r', r);
		if (tilesAtPoint['length'] > 0) { return true; } else {	return false; }
	},

	findTileAt: function(q, r) {
		var tilesAtPoint = this.store.all('tile').filterBy('q', q).filterBy('r', r);
		if (tilesAtPoint['length'] > 0) {
			return tilesAtPoint;
		} else {
			return false;
		}
	},

	generateTerrain: function() {
		var rand = getRandomInt(0, generatorData.terrainType.length - 1);
		var terrain = generatorData.terrainType[rand];
		return {
			type: terrain.type,
			color: terrain.color,
		};

		function getRandomInt(min, max) {
			return Math.floor(Math.random() * (max - min + 1)) + min;
		}
	}

});
