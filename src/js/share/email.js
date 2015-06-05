this.mail = this.email = function(url) {
	var options = Cabana.vars.Share.email;

  var shareUrl = 'mailto:';

  if (options.subject) {
  	shareUrl += '?subject='+encodeURIComponent(options.subject ? options.subject : document.title);
  	shareUrl += '&';
  } else {
		shareUrl += '?';
	}

  if (options.text) {
  	shareUrl += 'body='+encodeURIComponent(options.text.replace('[URL]', window.location.href));
  } else {
  	shareUrl += 'body='+window.location.href;
  }

  // window.location = shareUrl;

  	this.shareTo(shareUrl, 'email', false);
};