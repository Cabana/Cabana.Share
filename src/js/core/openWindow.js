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