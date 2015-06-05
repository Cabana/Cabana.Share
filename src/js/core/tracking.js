this.tracking = function(type) {

	console.log("tracking");

	if (!Cabana.vars.Share.tracking) {
		return;
	}


	if (typeof dataLayer !== 'undefined') {
		try {
			dataLayer.push({
				'event': 'Share.'+type.toLowerCase(),
				'title': document.title ? document.title : '',
				'url': location.href
			})
		} catch(e) {
			console.error('Couldn\'t push to tag manager');
		}

	} else {

		this.fireEvent(type);

	}

};