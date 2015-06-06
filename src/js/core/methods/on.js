var on = function(event, listenerFn) {
	Cabana.vars.Share.listeners.push({
		event: event.toLowerCase(),
		callback: listenerFn
	});
};