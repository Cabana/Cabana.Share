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