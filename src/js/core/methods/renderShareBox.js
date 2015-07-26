var renderShareBox = function(services) {
	// console.log("renderShareBox", services);

	var boxQuery = '.cabana-share-box';

	var boxTest = document.querySelector(boxQuery);

	if (boxTest) {
		boxTest.parentElement.removeChild(boxTest);
	}



	var css = '';
	css += '.cabana-share-box {position:absolute;background-color:#fff;box-shadow:0px 2px 2px rgba(0,0,0,0.2), 0px 2px 6px rgba(0,0,0,0.2);transition:all .3s cubic-bezier(0.2,0,0.4,1);opacity:0;transform-origin:top left;transform:scale(0);border-radius:2px;overflow:hidden;}'
	css += '.cabana-share-box ul{list-style-type:none;display:block;padding:0;margin:0;}';
	css += '.cabana-share-box ul li{padding:8px 14px;line-height:1.5;display:block;border-bottom:1px solid #f0f0f0;transition:all .3s cubic-bezier(0.2,0,0.4,1);cursor:pointer;}.cabana-share-box ul li:last-child{border-bottom:0;}';
	css += '.cabana-share-box ul li:hover{background-color:#f0f0f0;}';




	var head = document.head || document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.type = 'text/css';

	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);

	var box = document.createElement('div');
	box.className = boxQuery.replace('.', '');

	document.body.appendChild(box);

	var list = document.createElement('ul');

	box.appendChild(list);


	[].forEach.call(services, function(service, index) {
		var listElement = document.createElement('li');

		var firstLetter = service.slice(0,1).toUpperCase();

		var serviceName = firstLetter+service.slice(1,service.length);

		listElement.innerHTML = serviceName;
		listElement.onclick = function() {
			Cabana.Share(service)
		};

		list.appendChild(listElement);
	});

};