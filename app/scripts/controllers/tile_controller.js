SandHEX.TileController = Ember.ObjectController.extend(Ember.TargetActionSupport, {
	needs: ['grid'],

	actions: {
		highlightSelectedHex: function(id) {
			this.get('controllers.grid').highlightSelectedHex(id);
		},
		unhighlightHex: function(id) {
			this.get('controllers.grid').unhighlightHex(id);
		}
	}

});
