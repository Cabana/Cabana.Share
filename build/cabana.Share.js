'use strict';

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





Cabana.Share = function() {

	this.type = arguments[arguments.length-1];
	this.url = arguments.length > 1 ? arguments[0] : window.location.href;


	this.shareUrls = {
		'facebook': 'https://www.facebook.com/sharer/sharer.php',
		'twitter': 'https://twitter.com/intent/tweet',
		'linkedin': 'https://www.linkedin.com/shareArticle',
		'google': 'https://plus.google.com/share'
	};

	this.isTouch = function() {

			return (('ontouchstart' in window)

				|| (navigator.MaxTouchPoints > 0)

	    || (navigator.msMaxTouchPoints > 0));

	};

	this.shareTo = function(url, type, newWindow) {
	  var startTime,
	  		endTime,
				elapsedTime,
				intentUrl,
				tryIntent = false;
	
		
		if (this.isTouch()){
	    
	  	if (type == 'twitter') {
	  		intentUrl = 'twitter://post?message='+url;
	  		tryIntent = true;
	  	}
	
	  	if (tryIntent) {
	
		  	newWindow = false;
	
		    console.log(intentUrl);
	
		    startTime = new Date().getTime();
	
		  	document.location = intentUrl;
	
		    endTime = new Date().getTime();
	
		    elapsedTime = (endTime - startTime);
	
		    console.log(elapsedTime);
		  }
	
	    if (elapsedTime === undefined || elapsedTime < 1) {
	
	    		tryIntent == true ? newWindow = true : void(0);
	
	        this.openWindow(url, newWindow);
	    }
	  } else {
	  	this.openWindow(url, newWindow);
	  }
	
	
	  this.tracking(type);
	};

	this.openWindow = function(url, newWindow) {
		var anchor = document.createElement('a');
		anchor.href = url;
		anchor.target = newWindow !== false ? '_blank' : '_self';
		anchor.style.position = 'absolute';
		anchor.style.display = 'inline-block';
		anchor.style.opacity = '0';
		anchor.id = 'CabanaShareA';
	
		document.body.appendChild(anchor);
	
		console.log(anchor);
	
		if (anchor.onclick) {
			anchor.onclick();
		} else {
			anchor.click();
		}
	
	
		anchor.remove();
	};

	this.tracking = function(type) {
	
		console.log("tracking");
	
		if (Cabana.vars.Share.listeners.length > 0) {
			[].forEach.call(Cabana.vars.Share.listeners, function(listener, index) {
				var listenerKey = listener.event.indexOf(".") ? listener.event.split(".")[0] : listener.event;
	
				if (listenerKey == "share") {
					try {
						listener.callback(type);
					} catch(e) {
						console.log("Couldn't fire listener callback on "+listener.event);
					}
				} else if (listenerKey == type) {
					try {
						listener.callback();
					} catch(e) {
						console.log("Couldn't fire listener callback on "+listener.event);
					}
				}
			});
		}
	
	
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

	this.fireEvent = function(type) {
		
		var e;
	
		var eventName = 'Share.'+type;
	
		console.log("eventName", eventName);
	
		if (document.createEvent) {
			e = document.createEvent('Event');
			e.initEvent(eventName, true, false);
		} else {
			e = document.createEventObject();
			e.eventType = eventName;
		}
	
		e.eventName = eventName;
	
		if (document.createElement) {
			document.dispatchEvent(e);
		} else {
			e.fireEvent('on'+eventName, e);
		}
	
	
	};

	if (arguments.length == 0) {
		var on = function(event, listenerFn) {
			Cabana.vars.Share.listeners.push({
				event: event.toLowerCase(),
				callback: listenerFn
			});
		};
	
		var off = function(event) {
		
			[].forEach.call(Cabana.vars.Share.listeners, function(listener, index) {
				if (listener.event == event.toLowerCase()) {
					Cabana.vars.Share.listeners.splice(listener, 1);
				}
			});
		
		};
	
		var listeners = (function() {
			return Cabana.vars.Share.listeners;
		})();
	
	
		return (function() {
	
			return {
				on: on,
				off: off,
				listeners: listeners
			};
	
		})();
	
	}



	this.facebook = function(url) {


		var shareUrl = this.shareUrls['facebook'];


		shareUrl += '?u='+url;


	


		this.shareTo(shareUrl, 'facebook');


	};

	this.twitter = function(url) {
		var shareUrl = this.shareUrls['twitter'];
		shareUrl += '?url='+url;
	
		var options = Cabana.vars.Share.twitter;
	
		if (options.user) {
			shareUrl += '&via='+options.user;
		}
		if (options.text) {
			shareUrl += '&text='+encodeURIComponent(options.text.replace('[URL]', url));
		}
		if (options.hashtags) {
			shareUrl += '&hashtags='+encodeURIComponent(options.hashtags);
		}
	
		this.shareTo(shareUrl, 'twitter');
	};

	this.linkedin = function(url) {
		var shareUrl = this.shareUrls['linkedin'];
		shareUrl += '?mini=tru&url='+url;
	
		var options = Cabana.vars.Share.linkedin;
	
		if (options.title) {
			shareUrl += '&title='+encodeURIComponent(options.title);
		} else {
			shareUrl += '&title='+encodeURIComponent(document.title);
		}
	
		var description = document.querySelector("meta[name='description']") ? document.querySelector("meta[name='description']").content : null;
	
		if (options.text) {
			shareUrl += '&summary='+encodeURIComponent(options.text);
		} else if (description) {
			shareUrl += '&summary='+encodeURIComponent(description);
		}
	
	
		this.shareTo(shareUrl, 'linkedin');
	};

	this.google = this.googleplus = function(url) {
	
		var shareUrl = this.shareUrls['google'];
	
		shareUrl += '?url='+url;
	
		this.shareTo(shareUrl, 'google');
	
	};

	this.mail = this.email = function(url) {
		var options = Cabana.vars.Share.email;
	
	  var shareUrl = 'mailto:';
	
	  if (options.subject) {
	  	shareUrl += '?subject='+encodeURIComponent(options.subject ? options.subject : document.title);
	  	shareUrl += '&';
	  } else {
			shareUrl += '?';
		}
	
	  if (options.text) {
	  	shareUrl += 'body='+encodeURIComponent(options.text.replace('[URL]', window.location.href));
	  } else {
	  	shareUrl += 'body='+window.location.href;
	  }
	
	  // window.location = shareUrl;
	
	  	this.shareTo(shareUrl, 'email', false);
	};

		this.print = function() {
			try {
				print();
				this.tracking('print');
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
if (!addthis) {
	var addthis = {};
} else {
	var newAddthis = function() {
		var output = {};

		for (var key in addthis) {
			var type = typeof addthis[key];

			if (type == 'function') {
				output[key] = function() {
					return;
				};
			} else if (type == object) {
				output[key] = {};
			} else {
				output[key] = null;
			}

			for (var nextKey in addthis[key]) {
				var nextType = typeof addthis[key][nextKey];
				
				if (nextType == 'function') {
					output[key][nextKey] = function() {
						return;
					};
				} else if (nextType == object) {
					output[key][nextKey] = {};
				} else {
					output[key][nextKey] = null;
				}
			}
		}

		return output;
	};

	addthis = newAddthis();
}
if (!addthis_sendto) {
	var addthis_sendto = function(type) {
		return Cabana.Share(type);
	};
}

addthis.init = addthis.update = function() {
	return;
};
