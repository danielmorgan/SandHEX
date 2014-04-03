SandHEX.MapView = Ember.View.extend({
	templateName: 'map',
	classNames: ['fill'],
	hexSize: 1,
	map: null,

	didInsertElement: function () {
		var controller = this.get('controller');
		var zoomLevel = controller.get('zoomLevel');
		var map = L.map('map', {
			center: [0,0],
			zoom: zoomLevel,
			crs: L.CRS.Simple
		});
		var mapBackground = L.tileLayer('').addTo(map);

		this.loadHexGrid(map);

		map.on('zoomend', function(e) {
			console.log('zoomend', 'Setting zoomLevel ' + e.target.getZoom());
			controller.set('zoomLevel', e.target.getZoom());
		});

		this.controller.set('map', map);
	},

    createHex: function(center, size, id) {
		coordinates = [];
		for(var i = 0; i < 6; i++){
			angle = 2 * Math.PI / 6 * i;
			x_i = center[0] + size * Math.cos(angle);
			y_i = center[1] + size * Math.sin(angle);
			coordinates.push([x_i, y_i])
		}
		coordinates.push(coordinates[0]);
		return {
			'type':'Feature',
			'geometry':{
				'type': 'Polygon',
				'coordinates': [coordinates]
			},
			'properties': {
				'id': id
			}
		}
    },

	loadHexGrid: function(map, axialArray) {
		if (typeof(axialArray) == 'undefined') {
			var axialArray = [
				[0,0], [1,0], [2,0], [3,0], [4,0],
				[0,1], [1,1], [2,1], [3,1], [4,1],
				[0,2], [1,2], [2,2], [3,2], [4,2],
				[0,3], [1,3], [2,3], [3,3], [4,3],
			];
			console.log("Debug hex grid loaded")
		}

		var hexGrid = [];
		var width = this.hexSize * 2;
		var height = Math.sqrt(3)/2 * width;
		var horiz = 3/4 * width;
		var vert = height;
		for (var i = 0; i < axialArray.length; i++) {
			if (axialArray[i][0] % 2 == 1) {
				var offset = 1/2 * vert;
			} else {
				var offset = 0;
			}
			var q = (axialArray[i][0] * horiz);
			var r = (axialArray[i][1] * vert) + offset;
			hexGrid.push(this.createHex([q,r], this.hexSize, axialArray[i][0]+','+axialArray[i][1]));
		}

		var hexGridLayer = L.geoJson(hexGrid, {
			style: {
				fillColor: "#fff",
				fillOpacity: 0.5,
				color: '#444',
				weight: 2,
				opacity: 1
			},
			onEachFeature: this.popUp
		}).addTo(map);
	},

	popUp: function (feature, layer) {
		var popupContent;
		if (feature.properties.id) {
			popupContent = feature.properties.id;
		}
		layer.bindPopup(popupContent);
	}

});
