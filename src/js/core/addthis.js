if (!addthis) {
	var addthis = {};
} else {
	var newAddthis = function() {
		var output = {};

		for (var key in addthis) {
			var type = typeof addthis[key];

			if (type == 'function') {
				output[key] = function() {
					return;
				};
			} else if (type == object) {
				output[key] = {};
			} else {
				output[key] = null;
			}

			for (var nextKey in addthis[key]) {
				var nextType = typeof addthis[key][nextKey];
				
				if (nextType == 'function') {
					output[key][nextKey] = function() {
						return;
					};
				} else if (nextType == object) {
					output[key][nextKey] = {};
				} else {
					output[key][nextKey] = null;
				}
			}
		}

		return output;
	};

	addthis = newAddthis();
}
if (!addthis_sendto) {
	var addthis_sendto = function(type) {
		return Cabana.Share(type);
	};
}

addthis.init = addthis.update = function() {
	return;
};