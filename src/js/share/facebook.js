this.facebook = function(url) {
	var shareUrl = this.shareUrls['facebook'];
	shareUrl += '?u='+url;

	this.shareTo(shareUrl, 'facebook');
};