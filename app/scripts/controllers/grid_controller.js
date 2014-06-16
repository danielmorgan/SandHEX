SandHEX.GridController = Ember.ObjectController.extend(Ember.TargetActionSupport, {
	needs: ['tiles', 'tile', 'hex', 'map'],
	style: {
		default: {
			fillOpacity: 0.5
		},
		selected: {
			fillOpacity: 1
		}
	},

	createGrid: function() {
		var _this = this;

		this.grid = L.geoJson([], {
			style: {
				fillColor: "#fff",
				fillOpacity: 0.5,
				color: '#444',
				weight: 2,
				opacity: 1
			},
			onEachFeature: onEachFeature
		}).addTo(this.get('controllers.map.map'));

		function onEachFeature(feature, layer) {
			layer.on({ click: selectTile });
			_this.colorizeHexes();
		}
		function selectTile(e) {
			var id = e.target.feature.properties.id;
			_this.transitionToRoute('tile', id);
			_this.highlightSelectedHex(id);
		}
	},

	colorizeHexes: function() {
		var _this = this;
		this.grid.eachLayer(function(layer) {
			_this.store.find('tile', layer.feature.properties.id ).then(function(tile) {
				layer.setStyle({ fillColor: tile.get('color') });
			});

		});
	},

	highlightSelectedHex: function(id) {
		var _this = this;
		this.unhighlightHexes();
		this.grid.eachLayer(function(layer) {
			if (layer.feature.properties.id == id) {
				layer.setStyle(_this.style.selected);
			}
		});
	},

	unhighlightHexes: function() {
		var _this = this;
		this.grid.eachLayer(function(layer) {
			layer.setStyle(_this.style.default);
		});
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
		var z = y - (x + (x&1)) / 2;

		var lat = x * horiz;
		var lng = (z * vert) + offset;
		return {
			'lat': lat,
			'lng': lng,
			'id': id
		};
	},

	addTileToGrid: function(tile) {
		var newTile = this.get('controllers.hex').drawHex(
			[tile['lat'], tile['lng']],
			tile['id']
		);
		this.grid.addData(newTile);
	}

});
