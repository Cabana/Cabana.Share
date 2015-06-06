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

## Overrides
This module will override AddThis if included.
It'll override (or create) both `addthis.update()` and `addthis_sendto()`.

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


####Good ol' listeners
If you are not using Google Tag Manager, you can fetch all the event by listening on the document for 'Share.event'.
If you want to listen for any Facebook sharing-clicks you could do it as follows:
```javascript
document.addEventListener('Share.facebook', function() {
	/* Custom tracking-actions */
});
```


## Status
This module is still in **alpha** release