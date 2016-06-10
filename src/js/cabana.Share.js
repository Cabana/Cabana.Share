(function(window) {
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

		if (typeof configOptions == 'undefined' || !configOptions.replaceNonAscii || configOptions.replaceNonAscii == true) {
			this.url = this.url
				.replace(/%C3%A6/g, 'ae')
				.replace(/%C3%B8/g, 'oe')
				.replace(/%C3%A5/g, 'aa');
		}

		/*
		Remove ending #
		*/

		if (this.url.indexOf('#') > 0) {
			var splittedUrl = this.url.split('#');
			this.url = splittedUrl[0];
		}

		//console.log("config", this.type, config);

		var shareUrls = this.shareUrls = {
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
		//= include share/compact.js

		if (this.type == "log") {
			return this;
		}

		var returnState = false;
		try {
			this[this.type.toLowerCase()](this.url);
			returnState = true;
		} catch(e) {
			Cabana.vars.Share.errors.push(e);
			returnState = false;
		}
	};

	//= include core/addthis.js
})(window);