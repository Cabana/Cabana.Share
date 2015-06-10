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