SandHEX.MapController = Ember.ObjectController.extend({
	zoomLevel: 5,

	createMap: function() {
		this.map = L.map('map', {
			center: [0,0],
			zoom: this.zoomLevel,
			minZoom: 2,
			maxZoom: 8,
			crs: L.CRS.Simple
		});
	}

});
