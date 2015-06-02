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

	this.isTouch = function() {
 		return (('ontouchstart' in window)
 			|| (navigator.MaxTouchPoints > 0)
      || (navigator.msMaxTouchPoints > 0));
	};

	this.shareTo = function(url, newWindow) {
    var startTime, endTime, elapsedTime, intentUrl;
		
		if (!this.isTouch()){
	    
	  	if (url.indexOf(this.shareUrls.facebook) > -1) {
	  		intentUrl = "fb://post/"+url;
	  	} else if (url.indexOf(this.shareUrls.twitter) > -1) {
	  		intentUrl = "twitter://post?message="+url;
	  	}

	  	newWindow = false;

	    console.log(intentUrl);

	    startTime = new Date().getTime();

	  	document.location = intentUrl;

	    endTime = new Date().getTime();

	    elapsedTime = (endTime - startTime);

	    console.log(elapsedTime);

	    if (elapsedTime < 1) {
	        this.openWindow(url, newWindow);
	    }
	  } else {
	  	this.openWindow(url, newWindow);
	  }
	};


	this.openWindow = function(url, newWindow) {
		var anchor = document.createElement("a");
		anchor.href = url;
		anchor.target = newWindow !== false ? "_blank" : "_self";
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

		this.shareTo(shareUrl);
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

		this.shareTo(shareUrl);
	};

	this.mail = this.email = function(url) {
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

    	this.shareTo(shareUrl, false);
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
	addthis = {
		update: function() {
			return;
		}
	};
	addthis_sendto = function(type) {
		return Cabana.Share(type);
	};
} else {
	var addthis = {
		update: function() {
			return;
		}
	};
	var addthis_sendto = function(type) {
		return Cabana.Share(type);
	};
}
