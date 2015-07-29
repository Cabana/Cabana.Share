var documentReady = function() {
	[].forEach.call(document.querySelectorAll('[class*="addthis"]'), function(container, index) {
		Cabana.Share().addThis(container);
	});


	

	try {
		if (addthis_config) {
			Cabana.Share().config(addthis_config);
		}
	} catch(e) {
		void(0);
	}


};