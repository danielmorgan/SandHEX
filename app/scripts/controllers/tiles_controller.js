SandHEX.TilesController = Ember.ArrayController.extend({
	needs: ['hex', 'grid', 'map', 'player'],

	actions: {
		onDidInsertElement: function() {
			this.get('controllers.grid').createLayer();
			this.loadTilesFromStore();
			this.get('controllers.player').loadPlayer();
		}
	},

	loadTilesFromStore: function() {
		var tiles = this.store.all('tile');
		for (i = 0; i < tiles.content.length; i++) {
			var tile = tiles.content[i];
			var mapCoord = this.get('controllers.grid').hexCoordToMapCoord(tile.get('q'), tile.get('r'), tile.get('id'));
			this.get('controllers.grid').addTileToGrid(mapCoord);
		}
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
		tile.save();
		var mapCoord = this.get('controllers.grid').hexCoordToMapCoord(hexCoord[0], hexCoord[1], tile['id']);
		this.get('controllers.grid').addTileToGrid(mapCoord);
	},

	tileExistsAt: function(q, r) {
		var tilesAtPoint = this.filterBy('q', q).filterBy('r', r);
		if (tilesAtPoint['length'] > 0) { return true; } else {	return false; }
	}

});
