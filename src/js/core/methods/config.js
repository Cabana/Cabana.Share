var config = function(configuration) {
	if (!configuration) {
		return;
	}

	var styleTest = document.querySelector('[data-share-element="style"]');

	if (configuration.services_compact && !styleTest) {

		var services = configuration.services_compact.split(','),
				shareServices = [],
				existing = Cabana.Share('log');

		[].forEach.call(services, function(service, index) {
			if (service.indexOf('google') > -1) {
				service = 'google';
			}

			if (existing[service]) {
				shareServices.push(service);
			}
		});


		renderShareBox(shareServices);
	}
};