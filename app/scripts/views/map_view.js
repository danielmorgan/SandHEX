SandHEX.MapView = Ember.View.extend({
	templateName: 'map',
	classNames: ['fill'],

	didInsertElement: function () {
		var controller = this.get("controller")
		controller.send("createMap");
	}

});
