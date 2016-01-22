var config = function(configuration) {

	var styleTest = document.querySelector('[data-share-element="style"]');

	if (configuration) {
		var compactUsed = configuration.services_compact ? true : (document.querySelectorAll('.addthis_button_compact').length > 0);
	} else {
		var compactUsed = (document.querySelectorAll('.addthis_button_compact').length > 0);
	}


	var shareServices = [];

	if (configuration && configuration.services_compact && !styleTest) {

		var services = configuration.services_compact.split(','),
				existing = Cabana.Share('log');

		[].forEach.call(services, function(service, index) {
			var s = service.trim();

			if (s.indexOf('google') > -1) {
				s = 'google';
			} else if (s === 'mail') {
				s = 'email';
			}

			if (existing[s]) {
				shareServices.push(s);
			}
		});

	}


	if (shareServices.length > 0) {
		renderShareBox(shareServices);
	} else if (compactUsed) {
		renderShareBox('all');
	}
};