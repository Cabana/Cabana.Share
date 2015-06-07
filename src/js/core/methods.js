if (arguments.length == 0) {

	//= include methods/on.js

	//= include methods/off.js

	//= include methods/listeners.js

	//= include methods/addThis.js

	return (function() {

		return {
			on: on,
			off: off,
			listeners: listeners,
			addThis: addThis
		};

	})();

}