SandHEX.GridController = Ember.ObjectController.extend({
	needs: ['tiles', 'hex', 'map'],

	createLayer: function() {
		this.Layer = L.geoJson([], {
			style: {
				fillColor: "#fff",
				fillOpacity: 0,
				color: '#444',
				weight: 2,
				opacity: 1
			},
			onEachFeature: this.popUp
		}).addTo(this.get('controllers.map.Map'));
	},

	addTileToGrid: function(tile) {
		var newTile = this.get('controllers.hex').drawHex(
			[tile['lat'], tile['lng']],
			tile['id']
		);
		this.Layer.addData(newTile);
	},

	hexCoordToMapCoord: function(q, r, id) {
		var width = this.get('controllers.hex.hexSize') * 2;
		var height = Math.sqrt(3)/2 * width;
		var horiz = 3/4 * width;
		var vert = height;

		if (q % 2 != 0) {
			var offset = 1/2 * vert;
		} else {
			var offset = 0;
		}

		var x = q;
		var y = r;
		var z = r - (q + (q&1)) / 2;

		var lat = x * horiz;
		var lng = (z * vert) + offset;
		return {
			'lat': lat,
			'lng': lng,
			'id': id
		};
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
