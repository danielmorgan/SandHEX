SandHEX.MapController = Ember.Controller.extend({
	zoomLevel: 5,

	zoomLevelChanged: function () {
		var zoomLevel = this.get('zoomLevel');
		var map = this.get('map');
		if (zoomLevel != map.getZoom()) {
			map.setZoom(zoomLevel);
			console.log(this.get('zoomLevel'));
		}
	}.observes('zoomLevel')

});
