'use strict';


if (!Cabana) {
	var Cabana = {};
}
if (!Cabana.vars) {
	Cabana.vars = {};
}

Cabana.vars.Share = {
	"twitter": {
		user: null,
		text: null,
		hashtags: null
	},
	"email": {
		text: null,
		subject: null /*REPLACES [URL] WITH ABSOLUTE URL*/
	},
	"errors": []
};

Cabana.Share = function() {

	this.type = arguments[arguments.length-1];
	this.url = arguments.length > 1 ? arguments[0] : window.location.href;


	this.shareUrls = {
		"facebook": "https://www.facebook.com/sharer/sharer.php",
		"twitter": "https://twitter.com/intent/tweet"
	};


	this.openWindow = function(url) {
		var anchor = document.createElement("a");
		anchor.href = url;
		anchor.target = "_blank";
		console.log(anchor);
		if (anchor.onclick) {
			anchor.onclick();
		} else {
			anchor.click();
		}
		// var shareWindow = window.open(url, 'Share');

		// if (shareWindow.focus) {
		// 	shareWindow.focus()
		// }

		// return shareWindow;
	};


	this.facebook = function(url) {
		var shareUrl = this.shareUrls['facebook'];
		shareUrl += "?u="+url;

		this.openWindow(shareUrl);
	};

	this.twitter = function(url) {
		var shareUrl = this.shareUrls['twitter'];
		shareUrl += "?url="+url;

		var options = Cabana.vars.Share.twitter;

		if (options.user) {
			shareUrl += "&via="+options.user;
		}
		if (options.text) {
			shareUrl += "&text="+encodeURIComponent(options.text);
		}
		if (options.hashtags) {
			shareUrl += "&hashtags="+encodeURIComponent(options.hashtags);
		}

		this.openWindow(shareUrl);
	};

	this.email = function(url) {
		var options = Cabana.vars.Share.email;

    var shareUrl = "mailto:";

    if (options.subject) {
    	shareUrl += "?subject="+encodeURIComponent(options.subject);
    	shareUrl += "&";
    } else {
  		shareUrl += "?";
  	}

    if (options.text) {
    	shareUrl += "body="+encodeURIComponent(options.text.replace("[URL]", window.location.href));
    } else {
    	shareUrl += "body="+window.location.href;
    }

    // window.location = shareUrl;

    	this.openWindow(shareUrl);
	};

	this.print = function() {
		try {
			print();
		} catch(e) {
			console.error(e);
		}
	};





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

if (addthis) {
	var addthis = {
		update: function() {
			return;
		}
	};
	addthis_sendto = function(type) {
		return Cabana.Share(type);
	};
}
