SandHEX.TileController = Ember.ObjectController.extend(Ember.TargetActionSupport, {
	needs: ['grid'],

	actions: {
		highlightSelectedHex: function(id) {
			this.get('controllers.grid').highlightSelectedHex(id);
		},
		unhighlightHexes: function() {
			this.get('controllers.grid').unhighlightHexes();
		}
	}

});
