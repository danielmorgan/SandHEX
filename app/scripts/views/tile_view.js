SandHEX.TileView = Ember.View.extend({
	templateName: 'tile',

	didInsertElement: function() {
		this.get('controller').send('highlightSelectedHex', this.get('controller.content.id'));
	},
	willClearRender: function() {
		this.get('controller').send('unhighlightHexes', this.get('controller.content.id'));
	}
});
