SandHEX.MapController = Ember.ObjectController.extend({
	zoomLevel: 5,

	actions: {
		insertMap: function() {
			this.createMap();
		}
	},

	createMap: function() {
		this.Map = L.map('map', {
			center: [0,0],
			zoom: this.zoomLevel,
			minZoom: 2,
			maxZoom: 8,
			crs: L.CRS.Simple
		});
	}

});
