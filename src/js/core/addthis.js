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
			} else if (type == 'object') {
				output[key] = {};
			} else {
				output[key] = null;
			}

			for (var nextKey in addthis[key]) {
				var nextType = typeof addthis[key][nextKey];
				
				try {
					if (nextType == 'function') {
						output[key][nextKey] = function() {
							return;
						};
					} else if (nextType == 'object') {
						output[key][nextKey] = {};
					} else {
						output[key][nextKey] = null;
					}
				} catch(e) {
					console.log("AddThis overriding had a problem");
					console.error(e);
				}
			}
		}

		return output;
	};

	addthis = newAddthis();
}
if (!addthis_sendto) {
	var addthis_sendto;
}
addthis_sendto = function(type) {
	var preprocess= addthis.preprocess;
	if (preprocess && preprocess.url) {
		// console.log("sharing", preprocess.url, type);
		Cabana.Share({url:preprocess.url}, type);
		preprocess.url = "";
		preprocess.type = "";
		preprocess.action = "";
		return;
	}

	return Cabana.Share(type);
};

addthis.init = function() {
	return;
};

addthis.update = function(action, type, url) {
	addthis.preprocess = {
		"action": action,
		"type": type,
		"url": url
	};
};


if (document.readyState == 'complete') {
	Cabana.Share().documentReady();
} else if (document.addEventListener) {

	document.addEventListener('DOMContentLoaded', function() {
		/*
		* Override .addthis_button
		*/

		Cabana.Share().documentReady();
	}, false);

} else if (document.attachEvent) {
	document.attachEvent('onreadystatechange', function() {
		if (document.readyState == 'complete') {
			document.detachEvent('onreadystatechange', aguments.callee);
			Cabana.Share().documentReady();
		}
	});
}


