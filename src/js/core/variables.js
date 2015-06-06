if (!Cabana) {
	var Cabana = {};
}
if (!Cabana.vars) {
	Cabana.vars = {};
}

Cabana.vars.Share = {
	'twitter': {
		user: null,
		text: null,
		hashtags: null
	},
	'email': {
		text: null, /*REPLACES [URL] WITH ABSOLUTE URL*/
		subject: null
	},
	'linkedin': {
		text: null,
		title: null
	},
	'tracking': true,
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
