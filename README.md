# Cabana.Share

Cabana A/S Sharing-module.
This sharing module is privacy-embracing, cookie-avoiding and ultra-light.

## Installing
Either you grap one of the build files from /build
... or you use `bower install cabana-share`

To make sure you always have the latest version use:
```<script src="https://rawgit.com/Cabana/cabana.Share/master/build/cabana.Share.min.js" type="text/javascript"></script>```

## Usage
```javascript
/**
* Summary of Cabana.Share
* Share current page to external media
* @param Url (optional) - Url to share - will default to window.location.href
* @param Type - Media to share through
* @return boolean
*/
Cabana.Share(Url, Type);

/*
* Minimal version
*/
Cabana.Share(Type);
```

Types are:

- facebook
- twitter
- email
- print
- linkedin
- google


## Configuration
Configuration is not yet possible, but will be in the future.
Configuration can be made, by defining window.CabanaShareSettings

```javascript
window.CabanaShareSettings = {
	'twitter': {
		user: null,
		/* Twitter-handle for user associated with site, will be added to tweet. Defaults to null */
		text: null,
		/* Standard text for tweet before url. Defaults to window.location.href */
		hashtags: null,
		/* Comma-seperated list of hashtags to add to tweet. Defaults to null */
	},
	'email': {
		text: null,
		/* Standard body for email. Every [URL] will be replaced by window.location.href. Defaults to window.location.href */
		subject: null,
		/* Mail-subject. Defaults to document.title */
	},
	'linkedin': {
		text: null,
		/* Standard text for sharing. Defaults to meta[name='description'] content-attribute */
		title: null
		/* Title for sharing. Defaults to document.title */
	}
}
```

###On-share configuration
If you have multiple share actions on one page and want various configurations for those, use the built in on-share configuration.
Instead of passing a string for URL, you pass an object looking like this:
```javascript
var config = {
	'url': 'http://notMyWindowLocationHref.com',
	'options': {
		'user': 'leoorsnes'
	}
};
Cabana.Share(config, 'twitter');
```
Here the options object within the config depends on type of sharing as seen above. Fx. you can use 'user' for Twitter but not for linkedin etc.

##Tracking & listeners

###Google Tag Manager
If Google Tag Manager's dataLayer is found any share-event will be pushed to the object with following parameters:
```javascript
dataLayer.push({
	'event': 'Share.event',
	/* Fx. Share.facebook if Facebook, Share.twitter if Twitter etc. */
	'title': document.title,
	/* The current sites title will be parsed through here */
	'url': location.href
	/* Current url is parsed as well */
})
```

###Event listeners

####Built-in
If you are used to using jQuery event-namespaces, the built-in event listeners will suit you quite well.
Setting a listener:
```javascript
Cabana.Share().on('twitter', function() {
	alert('My cool callback');
});
```
Setting a global listener:
```javascript
Cabana.Share().on('share', function(type) {
	alert('You shared through '+type);
});
```
Removing a listener:
```javascript
Cabana.Share().off('twitter');
```
Setting namespaced listener:
```javascript
Cabana.Share().on('twitter.myCoolNameSpace', callback);
```
Removing a namespaced listener:
```javascript
Cabana.Share().off('twitter.myCoolNameSpace');
```
Output all current listeners:
```javascript
Cabana.Share().listeners
```


####Good ol' listeners
If you are not using Google Tag Manager, you can fetch all the event by listening on the document for 'Share.event'.
If you want to listen for any Facebook sharing-clicks you could do it as follows:
```javascript
document.addEventListener('Share.facebook', function() {
	/* Custom tracking-actions */
});
```

## AddThis replacement
This module is made as an ultra-light and slimmer alternative for AddThis.
This means that the module can work instead of AddThis or "on top" of AddThis - "on top" meaning that it will override all AddThis listeners and functions, all though AddThis will initially run, before it's overridden.
This module will override (or create) both `addthis.update()` and `addthis_sendto()`.

## Status
This module is still in **alpha** release