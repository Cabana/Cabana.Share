var off = function(event) {

	[].forEach.call(Cabana.vars.Share.listeners, function(listener, index) {
		if (listener.event == event.toLowerCase()) {
			Cabana.vars.Share.listeners.splice(listener, 1);
		}
	});

};