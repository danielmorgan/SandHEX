SandHEX.TilesView = Ember.View.extend({
	templateName: 'tiles',

	didInsertElement: function () {
		var controller = this.get("controller")
		controller.send("loadTiles");
	}

});
