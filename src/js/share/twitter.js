this.twitter = function(url) {
	var shareUrl = this.shareUrls['twitter'];
	shareUrl += '?url='+url;

	console.log('this options', this.options);

	var options = Cabana.Share().extend(Cabana.vars.Share.twitter, configOptions);

	console.log("after", Cabana.vars.Share.twitter);

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