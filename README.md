# Cabana.Share

Cabana A/S Sharing-module.

## Installing
Either you grap one of the build files from /build
... or you use `bower install cabana-share`

## Initiating
To make sure you always have the latest version use:
`<script src="https://rawgit.com/Cabana/cabana.Share/master/build/cabana.Share.min.js" type="text/javascript"></script>`

## Usage
```javascript
/**
* Summary of Cabana.Share
* Share current page to external media
* @param Url - Url to share - will default to window.location.href
* @param Type - Media to share through
* @return
*/
Cabana.Share(Url, Type)
```

Types are:

- facebook
- twitter
- email
- print


## Configuration
Configuration is not yet possible, but will be in the future.


## Overrides
This module will override AddThis if included.

## Status
This module is still in **alpha** release