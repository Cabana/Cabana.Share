var documentReady = function() {
	[].forEach.call(document.querySelectorAll('[class*="addthis"]'), function(container, index) {
		Cabana.Share().addThis(container);
	});


	

	try {
		if (window.addthis_config) {
			Cabana.Share().config(addthis_config);
		} else {
			Cabana.Share().config();
		}
	} catch(e) {
		void(0);
	}


};