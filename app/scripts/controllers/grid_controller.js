SandHEX.GridController = Ember.ArrayController.extend({
	needs: ['hex', 'map', 'cube'],

	createLayer: function() {
		this.Layer = L.geoJson([], {
			style: {
				fillColor: "#fff",
				fillOpacity: 0.25,
				color: '#444',
				weight: 2,
				opacity: 1
			},
			onEachFeature: this.popUp
		}).addTo(this.get('controllers.map.Map'));
	},

	addTilesToGrid: function(mapCoords) {
		var newTiles = [];
		for (var i = 0; i < mapCoords.length; i++) {
			newTiles.push(this.get('controllers.hex').drawHex(
				[mapCoords[i]['lat'], mapCoords[i]['lon']],
				mapCoords[i]['id']
			));
		}
		this.Layer.addData(newTiles);
	},

	hexCoordsToMapCoords: function(hexCoords) {
		var mapCoords = [];
		var width = this.get('controllers.hex.hexSize') * 2;
		var height = Math.sqrt(3)/2 * width;
		var horiz = 3/4 * width;
		var vert = height;
		for (var i = 0; i < hexCoords.length; i++) {
			if (hexCoords[i]['q'] % 2 != 0) {
				var offset = 1/2 * vert;
			} else {
				var offset = 0;
			}
			var lat = hexCoords[i]['q'] * horiz;
			var lon = (hexCoords[i]['r'] * vert) + offset;
			var array = {
				'id': hexCoords[i]['id'],
				'lat': lat,
				'lon': lon
			};
			mapCoords.push(array);
		}
		return mapCoords;
	},

	hexCoordsToCube: function(hexCoords) {
		return this.get('controllers.cube').new(
			hexCoords['q'],
			-hexCoords['r'] - hexCoords['q'],
			hexCoords['r']
		);
	}

});
