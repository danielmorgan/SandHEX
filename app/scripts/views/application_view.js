SandHEX.ApplicationView = Ember.View.extend({
	classNames: ['fill'],

	didInsertElement: function () {
		var controller = this.get("controller")
		controller.send("initApp");
	}

});
