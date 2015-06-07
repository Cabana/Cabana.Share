var addThis = function(container) {

	var links = [];

	var recursiveFind = function(element) {
		[].forEach.call(element.children, function(child) {
			if (child.className.indexOf("addthis_button_") == 0) {
				links.push(child);
			} else {
				recursiveFind(child);
			}
		});
	};

	recursiveFind(container);

	links.forEach(function(link) {

		var functionCall,
		    classArray = link.className.split(' ');

		classArray.forEach(function(className) {
			if (className.indexOf("addthis_button_") > -1) {

				functionCall = className.replace("addthis_button_", "");

			}
		});

		if (functionCall) {
			link.onclick = function() {
				Cabana.Share(functionCall.toLowerCase());
			};
		}

	});

};