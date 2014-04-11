SandHEX.ApplicationView = Ember.View.extend({
	classNames: ['fill'],

	didInsertElement: function () {
		this.get('controller').send('initApp');
	}

});
