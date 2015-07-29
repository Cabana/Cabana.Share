var addThis = function(container) {

	var links = [];

	// var recursiveFind = function(element) {
	// 	[].forEach.call(element.children, function(child) {
	// 		if (child.className.indexOf("addthis_button_") > -1) {
	// 			links.push(child);
	// 		} else {
	// 			recursiveFind(child);
	// 		}
	// 	});
	// };

	// recursiveFind(container);

	if (container.className.indexOf("addthis_button_") > -1) {
		links.push(container);
		// console.log("pushing container", container.className);
	}

	links.forEach(function(link) {

		var functionCall,
		    classArray = link.className.split(' ');

		classArray.forEach(function(className) {
			if (className.indexOf("addthis_button_") > -1) {

				functionCall = className.replace("addthis_button_", "");

			}
		});

		if (functionCall) {
			link.onclick = function(e) {
				Cabana.vars.Share.trigger = e.target;
				Cabana.Share(functionCall.toLowerCase());
			};
		}

		if (functionCall == 'compact') {
			link.onmouseover = function(e) {
				Cabana.vars.Share.trigger = e.target;
				Cabana.Share(functionCall.toLowerCase());
			};
		}

	});

};