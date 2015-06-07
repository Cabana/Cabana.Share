this.fireListeners = function() {

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

};