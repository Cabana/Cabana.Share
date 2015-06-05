this.twitter = function(url) {
	var shareUrl = this.shareUrls['twitter'];
	shareUrl += '?url='+url;

	var options = Cabana.vars.Share.twitter;

	if (options.user) {
		shareUrl += '&via='+options.user;
	}
	if (options.text) {
		shareUrl += '&text='+encodeURIComponent(options.text.replace('[URL]', url));
	}
	if (options.hashtags) {
		shareUrl += '&hashtags='+encodeURIComponent(options.hashtags);
	}

	this.shareTo(shareUrl, 'twitter');
};