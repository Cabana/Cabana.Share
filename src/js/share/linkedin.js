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