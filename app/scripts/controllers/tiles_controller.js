SandHEX.TilesController = Ember.ArrayController.extend({
	hexSize: 1,
	actions: {
		onDidInsertElement: function() {
			this.initGrid();
			this.loadTilesFromStore();
		},
		moveNW: function() { this.move(-1,0); },
		moveN: function() { this.move(0,1); },
		moveNE: function() { this.move(1,0); },
		moveSW: function() { this.move(-1,-1); },
		moveS: function() { this.move(0,-1); },
		moveSE: function() { this.move(1,-1); }
	},

	initGrid: function() {
		var hexGrid = [];
		SandHEX.gridLayer = L.geoJson(hexGrid, {
			style: {
				fillColor: "#fff",
				fillOpacity: 0.25,
				color: '#444',
				weight: 2,
				opacity: 1
			},
			onEachFeature: this.popUp
		}).addTo(SandHEX.map);
	},

	loadTilesFromStore: function() {
		var tiles = this.store.all('tile');
		var squareCoords = [];
		for (i = 0; i < tiles.content.length; i++) {
			var tile = tiles.content[i];
			var array = {
				'id': tile.get('id'),
				'x': tile.get('x'),
				'y': tile.get('y')
			};
			squareCoords.push(array);
		}
		var hexCoords = this.convertSquareCoordsToHexCoords(squareCoords);
		this.addTilesToGrid(hexCoords);
	},

	move: function(x, y) {
		this.addTile([x,y]);
	},

	addTile: function(squareCoord) {
		var tile = this.store.createRecord('tile', {
			terrain: 'forest',
			isVisited: false,
			isExplored: false,
			x: squareCoord[0],
			y: squareCoord[1]
		});
		var array = {
			'id': tile['id'],
			'x': squareCoord[0],
			'y': squareCoord[1]
		};
		var hexCoords = this.convertSquareCoordsToHexCoords([array]);
		this.addTilesToGrid(hexCoords);
	},

	addTilesToGrid: function(hexCoords) {
		var newTiles = [];
		for (var i = 0; i < hexCoords.length; i++) {
			newTiles.push(this.createHex([hexCoords[i]['q'], hexCoords[i]['r']], this.hexSize, hexCoords[i]['id']));
		}
		SandHEX.gridLayer.addData(newTiles);
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

	convertSquareCoordsToHexCoords: function(squareCoords) {
		var hexCoords = [];
		var width = this.hexSize * 2;
		var height = Math.sqrt(3)/2 * width;
		var horiz = 3/4 * width;
		var vert = height;
		for (var i = 0; i < squareCoords.length; i++) {
			if (squareCoords[i]['x'] % 2 != 0) {
				var offset = 1/2 * vert;
			} else {
				var offset = 0;
			}
			var q = (squareCoords[i]['x'] * horiz);
			var r = (squareCoords[i]['y'] * vert) + offset;
			var array = {
				'id': squareCoords[i]['id'],
				'q': q,
				'r': r
			};
			hexCoords.push(array);
		}
		return hexCoords;
	},

	popUp: function (feature, layer) {
		var popupContent;
		if (feature.properties.id) {
			popupContent = feature.properties.id;
		}
		layer.bindPopup(popupContent);
	}

});
