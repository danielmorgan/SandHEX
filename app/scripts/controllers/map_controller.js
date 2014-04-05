SandHEX.MapController = Ember.Controller.extend({
	zoomLevel: 5,
	actions: {
		insertMap: function() {
			this.createMap();
		}
	},

	createMap: function() {
		var map = L.map('map', {
			center: [0,0],
			zoom: this.zoomLevel,
			minZoom: 3,
			maxZoom: 7,
			crs: L.CRS.Simple
		});
		SandHEX.map = map;
	}

});
