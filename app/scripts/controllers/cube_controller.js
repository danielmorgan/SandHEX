SandHEX.CubeController = Ember.ObjectController.extend({
	directions: [[1, -1, 0], [1, 0, -1], [0, 1, -1], [-1, 1, 0], [-1, 0, 1], [0, -1, 1]],

	new: function(x, y, z) {
		return [x, y, z];
	}

});
