SandHEX.TilesController = Ember.ArrayController.extend({
	actions: {

		createTile: function() {
			var title = this.get('newTitle');
    		if (!title.trim()) { return; }
			var tile = this.store.createRecord('tile', {
				type: title,
				isVisited: 0,
				isExplored: 0
			});
			tile.save();
		}

	}
});
