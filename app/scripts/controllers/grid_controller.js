SandHEX.GridController = Ember.ArrayController.extend({
	needs: ['tiles', 'hex', 'map', 'cube'],

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
			var q = hexCoords[i]['q'];
			var r = hexCoords[i]['r'];
			var cubeCoords = this.hexCoordsToCube(q,r);

			if (q % 2 != 0) {
				var offset = 1/2 * vert;
			} else {
				var offset = 0;
			}

			var lat = cubeCoords['x'] * horiz;
			var lon = (cubeCoords['z'] * vert) + offset;
			var array = {
				'id': hexCoords[i]['id'],
				'lat': lat,
				'lon': lon
			};
			mapCoords.push(array);
		}

		return mapCoords;
	},

	hexCoordsToCube: function(q, r) {
		return {
			'x': q,
			'y': r,
			'z': r - (q + (q&1)) / 2
		}
	},

	popUp: function (feature, layer) {
		var popupContent;
		if (feature.properties.id) {
			popupContent = feature.properties.id;
		}
		layer.bindPopup(popupContent);
	}

});
