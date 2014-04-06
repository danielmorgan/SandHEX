SandHEX.HexController = Ember.ObjectController.extend({
	hexSize: 1,

	drawHex: function(center, id) {
		var coordinates = [];
		for(var i = 0; i < 6; i++){
			angle = 2 * Math.PI / 6 * i;
			x = center[0] + this.hexSize * Math.cos(angle);
			y = center[1] + this.hexSize * Math.sin(angle);
			coordinates.push([x, y])
		};
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
	}

});
