(function(window) {
	'use strict';

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
		
			    // console.log(intentUrl);
		
			    startTime = new Date().getTime();
		
			  	document.location = intentUrl;
		
			    endTime = new Date().getTime();
		
			    elapsedTime = (endTime - startTime);
		
			    // console.log(elapsedTime);
			  }
		
		    if (elapsedTime === undefined || elapsedTime < 1) {
		
		    		tryIntent == true ? newWindow = true : void(0);
		
		        this.openWindow(url, newWindow);
		    }
		  } else {
		  	this.openWindow(url, newWindow);
		  }
		
		
		  this.tracking(type);
		  this.fireListeners();
		};

		this.openWindow = function(url, newWindow) {
		
			if (Cabana.vars.Share.popup && newWindow !== false) {
		
				
				var windowWidth = screen.width/2,
						windowHeight = screen.height/2;
		
				var windowTop = (screen.height/2) - (windowHeight/2),
						windowLeft = (screen.width/2) - (windowWidth/2);
		
				window.open(
						url,
						'CabanaSharePopup',
						'top='+windowTop+',left='+windowLeft+',toolbar=0,status=0,width='+ windowWidth+',height='+windowHeight);
		
		
				return;
			}
		
			var anchor = document.createElement('a');
			anchor.href = url;
			anchor.target = newWindow !== false ? '_blank' : '_self';
			anchor.style.position = 'absolute';
			anchor.style.display = 'inline-block';
			anchor.style.opacity = '0';
			anchor.id = 'CabanaShareA';
		
			document.body.appendChild(anchor);
		
			// console.log(anchor);
		
			if (anchor.onclick) {
				anchor.onclick();
			} else {
				anchor.click();
			}
		
		
			anchor.remove();
		};

		this.tracking = function(type) {
		
			// console.log("tracking");
		
		
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
		
			// console.log("eventName", eventName);
		
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
		
			var addThis = function(container) {
			
				var links = [];
			
				// var recursiveFind = function(element) {
				// 	[].forEach.call(element.children, function(child) {
				// 		if (child.className.indexOf("addthis_button_") > -1) {
				// 			links.push(child);
				// 		} else {
				// 			recursiveFind(child);
				// 		}
				// 	});
				// };
			
				// recursiveFind(container);
			
				if (container.className.indexOf("addthis_button_") > -1) {
					links.push(container);
					// console.log("pushing container", container.className);
				}
			
				links.forEach(function(link) {
			
					var functionCall,
					    classArray = link.className.split(' ');
			
					classArray.forEach(function(className) {
						if (className.indexOf("addthis_button_") > -1) {
			
							functionCall = className.replace("addthis_button_", "");
			
						}
					});
			
					if (functionCall) {
						link.onclick = function(e) {
							e.preventDefault();
							Cabana.vars.Share.trigger = e.target;
							Cabana.Share(functionCall.toLowerCase());
						};
					}
			
					if (functionCall == 'compact') {
						link.onmouseover = function(e) {
							Cabana.vars.Share.trigger = e.target;
							Cabana.Share(functionCall.toLowerCase());
						};
					}
			
				});
			
			};
		
			var extend = function () {
				var artificial = {};
			  for (var i=0;i<arguments.length;i++) {
			    for(var key in arguments[i]) {
			
			      if(arguments[i].hasOwnProperty(key)) {
			        artificial[key] = arguments[i][key];
			      }
			    }
			  }
			  return artificial;
			};
		
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
		
			var renderShareBox = function(services) {
				// console.log("renderShareBox", services);
			
				var boxQuery = '.cabana-share-box';
			
				var boxTest = document.querySelector(boxQuery);
			
				if (boxTest) {
					boxTest.parentElement.removeChild(boxTest);
				}
			
			
			
				var css = '';
				css += '.cabana-share-box {position:absolute;background-color:#fff;box-shadow:rgba(0, 0, 0, 0.117647) 0px 1px 3px, rgba(0, 0, 0, 0.239216) 0px 1px 2px, rgba(0, 0, 0, 0.2) 0px 2px 6px;transition:all .3s cubic-bezier(0.2,0,0.4,1);opacity:0;transform-origin:top left;transform:scale(0);border-radius:1px;overflow:hidden;font-size:12px;color:#222;font-family:"Arial", sans-serif;z-index:2000;}'
				css += '.cabana-share-box ul{list-style-type:none;display:block;padding:0;margin:0;}';
				css += '.cabana-share-box ul li{padding:8px 10px;line-height:1.5;display:block;border-bottom:1px solid #f0f0f0;transition:all .3s cubic-bezier(0.2,0,0.4,1);cursor:pointer;padding-right:30px;}';
				css += '.cabana-share-box ul li:last-child{border-bottom:0;}';
				css += '.cabana-share-box ul li:hover{background-color:#f0f0f0;}';
				css += '.cabana-share-box object, .cabana-share-box img {float:left;width:20px;height:20px;margin-right:10px;}';
				css += '.cabana-share-box__twitter svg {color-fill:#f00;fill:#f00;}';
			
			
			
			
				var head = document.head || document.getElementsByTagName('head')[0];
			
				var style = document.createElement('style');
				style.setAttribute('data-share-element', 'style');
				style.type = 'text/css';
			
				if (style.styleSheet) {
					style.styleSheet.cssText = css;
				} else {
					style.appendChild(document.createTextNode(css));
				}
			
				head.appendChild(style);
			
				var box = document.createElement('div');
				box.className = boxQuery.replace('.', '');
			
				document.body.appendChild(box);
			
				var list = document.createElement('ul');
			
				box.appendChild(list);
			
			
			
				if (services == 'all') {
					var preparedArray = [];
			
			
					preparedArray.push('email');
			
					for (var shareService in shareUrls) {
						preparedArray.push(shareService);
					}
			
					services = preparedArray;
				}
			
			
				[].forEach.call(services, function(service, index) {
					var listElement = document.createElement('li');
			
					var firstLetter = service.slice(0,1).toUpperCase();
			
					var serviceName = firstLetter+service.slice(1,service.length);
					
					var imageUrl = Cabana.vars.Share[service] ? Cabana.vars.Share[service].icon : false;
			
					var htmlContent = '';
			
					if (imageUrl) {
						htmlContent += '<img src="'+imageUrl+'" alt="'+service+'" />';
					}
			
					// if (imageUrl) {
					// 	if (imageUrl.indexOf(".svg") > 0) {
			
					// 		htmlContent += '<object type="image/svg+xml" data="'+imageUrl+'" class="cabana-share-box__'+service+'" onload="Cabana.Share().styleSvg(this);"></object>';
					// 	} else {
					// 		htmlContent += '<img src="'+imageUrl+'" />';
					// 	}
					// } else {
					// 	console.log("didn't find image for ", service);
					// }
			
					htmlContent += serviceName;
			
					listElement.innerHTML = htmlContent;
			
					listElement.onclick = function(e) {
						e.preventDefault();
						Cabana.Share(service)
					};
			
					list.appendChild(listElement);
				});
			
			};
		
			//= include methods/styleSvg.js
			var documentReady = function() {
				[].forEach.call(document.querySelectorAll('[class*="addthis"]'), function(container, index) {
					Cabana.Share().addThis(container);
				});
			
				
			
				try {
					if (window.addthis_config) {
						Cabana.Share().config(addthis_config);
					} else {
						Cabana.Share().config();
					}
				} catch(e) {
					void(0);
				}
			
			
			};
		
		
			return (function() {
		
				return {
					version: '0.5.2',
					on: on,
					off: off,
					listeners: listeners,
					addThis: addThis,
					extend: extend,
					config: config,
					documentReady: documentReady
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
		
			console.log('this options', this.options);
		
			var options = Cabana.Share().extend(Cabana.vars.Share.twitter, configOptions);
		
			console.log("after", Cabana.vars.Share.twitter);
		
			if (options.user) {
				shareUrl += '&via='+options.user;
			}
			if (options.text) {
				shareUrl += '&text='+encodeURIComponent(options.text.replace(/[URL]/g, url));
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
		
		

		this.compact = function() {
			
			var cabanaBox = document.querySelector('.cabana-share-box'),
					trigger = Cabana.vars.Share.trigger ? Cabana.vars.Share.trigger : false;
		
			if (trigger) {
		
				var bodyOffset = document.body.getBoundingClientRect(),
						triggerOffset = trigger.getBoundingClientRect();
		
				// console.log(bodyOffset, triggerOffset);
		
				var offsetTop = (triggerOffset.top - bodyOffset.top) + triggerOffset.height,
						offsetLeft = (triggerOffset.left - bodyOffset.left) + triggerOffset.width;
		
				cabanaBox.style.left = offsetLeft+'px';
				cabanaBox.style.top = offsetTop+'px';
				cabanaBox.style.opacity = '1';
				cabanaBox.style.transform = 'scale(1)';
		
				cabanaBox.onmouseenter = function() {
		
					cabanaBox.onmouseleave = function() {
						cabanaBox.onmouseenter = function() {void(0)};
						cabanaBox.onmouseleave = function() {void(0)};
						
						cabanaBox.style.opacity = '0';
						cabanaBox.style.transform = 'scale(0)';
					};
				};
			}
		
		};


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
				} else if (type == 'object') {
					output[key] = {};
				} else {
					output[key] = null;
				}
	
				for (var nextKey in addthis[key]) {
					var nextType = typeof addthis[key][nextKey];
					
					try {
						if (nextType == 'function') {
							output[key][nextKey] = function() {
								return;
							};
						} else if (nextType == 'object') {
							output[key][nextKey] = {};
						} else {
							output[key][nextKey] = null;
						}
					} catch(e) {
						console.log("AddThis overriding had a problem");
						console.error(e);
					}
				}
			}
	
			return output;
		};
	
		addthis = newAddthis();
	}
	if (!addthis_sendto) {
		var addthis_sendto;
	}
	addthis_sendto = function(type) {
		var preprocess= addthis.preprocess;
		if (preprocess && preprocess.url) {
			// console.log("sharing", preprocess.url, type);
			Cabana.Share({url:preprocess.url}, type);
			preprocess.url = "";
			preprocess.type = "";
			preprocess.action = "";
			return;
		}
	
		return Cabana.Share(type);
	};
	
	addthis.init = function() {
		return;
	};
	
	addthis.update = function(action, type, url) {
		addthis.preprocess = {
			"action": action,
			"type": type,
			"url": url
		};
	};
	
	
	if (document.readyState == 'complete') {
		Cabana.Share().documentReady();
	} else if (document.addEventListener) {
	
		document.addEventListener('DOMContentLoaded', function() {
			/*
			* Override .addthis_button
			*/
	
			Cabana.Share().documentReady();
		}, false);
	
	} else if (document.attachEvent) {
		document.attachEvent('onreadystatechange', function() {
			if (document.readyState == 'complete') {
				document.detachEvent('onreadystatechange', aguments.callee);
				Cabana.Share().documentReady();
			}
		});
	}
	
	
	

})(window);