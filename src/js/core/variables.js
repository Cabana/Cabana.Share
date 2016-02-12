if (!window.Cabana) {
	window.Cabana = {};
}
if (!Cabana.vars) {
	Cabana.vars = {};
}

Cabana.vars.Share = {
	'twitter': {
		user: null,
		text: null,
		hashtags: null,
		icon: '//cdn.cabana.dk/modules/share/twitter.png'
	},
	'email': {
		text: null, /*REPLACES [URL] WITH ABSOLUTE URL*/
		subject: null,
		icon: '//cdn.cabana.dk/modules/share/mail.png'
	},
	'linkedin': {
		text: null,
		title: null,
		icon: '//cdn.cabana.dk/modules/share/linkedin.png'
	},
	'google': {
		icon: '//cdn.cabana.dk/modules/share/google.png'
	},
	'facebook': {
		icon: '//cdn.cabana.dk/modules/share/facebook.png'
	},
	'tracking': true,
	'popup': true,
	'listeners': [],
	'errors': []
};


if (window.CabanaShareSettings) {
	try {
		for (var key in window.CabanaShareSettings) {
			for (var object in window.CabanaShareSettings[key]) {

				Cabana.vars.Share[key][object] = window.CabanaShareSettings[key][object];

			}
		}
	} catch(e) {
		console.log('Something went wrong setting up configuration');
	}
}
