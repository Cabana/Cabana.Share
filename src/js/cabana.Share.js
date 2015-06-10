'use strict';


//= include core/variables.js


Cabana.Share = function() {

	this.type = arguments[arguments.length-1];

	var config = arguments.length > 1 ? arguments[0] : null,
			configOptions;

	if (config) {
		if (config.url) this.url = config.url;

		if (config.options) configOptions = config.options;
	}

	this.url = this.url ? this.url : window.location.href;


	this.shareUrls = {
		'facebook': 'https://www.facebook.com/sharer/sharer.php',
		'twitter': 'https://twitter.com/intent/tweet',
		'linkedin': 'https://www.linkedin.com/shareArticle',
		'google': 'https://plus.google.com/share'
	};


	//= include core/isTouch.js

	//= include core/shareTo.js

	//= include core/openWindow.js

	//= include core/tracking.js

	//= include core/fireEvent.js

	//= include core/methods.js



	//= include share/facebook.js

	//= include share/twitter.js

	//= include share/linkedin.js

	//= include share/google.js

	//= include share/email.js
	
	//= include share/print.js


	var returnState = false;
	try {
		this[this.type.toLowerCase()](this.url);
		returnState = true;
	} catch(e) {
		Cabana.vars.Share.errors.push(e);
		returnState = false;
	} finally {
		return returnState;
	}
};

//= include core/addthis.js