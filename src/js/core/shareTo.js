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