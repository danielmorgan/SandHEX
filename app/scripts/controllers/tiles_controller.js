SandHEX.TilesController = Ember.ArrayController.extend({
	actions: {

		createTile: function() {
			var terrain = this.get('terrain');
    		if (!terrain.trim()) { return; }
			var tile = this.store.createRecord('tile', {
				terrain: terrain,
				isVisited: false,
				isExplored: false,
				x: 4,
				y: 0
			});
			tile.save();
		}

	}
});
