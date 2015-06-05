this.google = this.googleplus = function(url) {

	var shareUrl = this.shareUrls['google'];

	shareUrl += '?url='+url;

	this.shareTo(shareUrl, 'google');

};