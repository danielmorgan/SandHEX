SandHEX.MapController = Ember.Controller.extend({
	zoomLevel: 5,
	actions: {

		createMap: function() {
			var map = L.map('map', {
				center: [0,0],
				zoom: this.zoomLevel,
				minZoom: 3,
				maxZoom: 7,
				crs: L.CRS.Simple
			});
			var mapBackground = L.tileLayer('').addTo(map);
			SandHEX.Map = map;
		}

	}

});
