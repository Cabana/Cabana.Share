var renderShareBox = function(services) {
	// console.log("renderShareBox", services);

	var boxQuery = '.cabana-share-box';

	var boxTest = document.querySelector(boxQuery);

	if (boxTest) {
		boxTest.parentElement.removeChild(boxTest);
	}



	var css = '';
	css += '.cabana-share-box {position:absolute;background-color:#fff;box-shadow:rgba(0, 0, 0, 0.117647) 0px 1px 3px, rgba(0, 0, 0, 0.239216) 0px 1px 2px, rgba(0, 0, 0, 0.2) 0px 2px 6px;transition:all .3s cubic-bezier(0.2,0,0.4,1);opacity:0;transform-origin:top left;transform:scale(0);border-radius:1px;overflow:hidden;font-size:12px;color:#222;font-family:"Arial", sans-serif;z-index:2000;}'
	css += '.cabana-share-box ul{list-style-type:none;display:block;padding:0;margin:0;}';
	css += '.cabana-share-box ul li{padding:8px 10px;line-height:1.5;display:block;border-bottom:1px solid #f0f0f0;transition:all .3s cubic-bezier(0.2,0,0.4,1);cursor:pointer;padding-right:30px;}';
	css += '.cabana-share-box ul li:last-child{border-bottom:0;}';
	css += '.cabana-share-box ul li:hover{background-color:#f0f0f0;}';
	css += '.cabana-share-box object, .cabana-share-box img {float:left;width:20px;height:20px;margin-right:10px;}';
	css += '.cabana-share-box__twitter svg {color-fill:#f00;fill:#f00;}';




	var head = document.head || document.getElementsByTagName('head')[0];

	var style = document.createElement('style');
	style.setAttribute('data-share-element', 'style');
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



	if (services == 'all') {
		var preparedArray = [];


		preparedArray.push('email');

		for (var shareService in shareUrls) {
			preparedArray.push(shareService);
		}

		services = preparedArray;
	}


	[].forEach.call(services, function(service, index) {
		var listElement = document.createElement('li');

		var firstLetter = service.slice(0,1).toUpperCase();

		var serviceName = firstLetter+service.slice(1,service.length);
		
		var imageUrl = Cabana.vars.Share[service] ? Cabana.vars.Share[service].icon : false;

		var htmlContent = '';

		if (imageUrl) {
			htmlContent += '<img src="'+imageUrl+'" alt="'+service+'" />';
		}

		// if (imageUrl) {
		// 	if (imageUrl.indexOf(".svg") > 0) {

		// 		htmlContent += '<object type="image/svg+xml" data="'+imageUrl+'" class="cabana-share-box__'+service+'" onload="Cabana.Share().styleSvg(this);"></object>';
		// 	} else {
		// 		htmlContent += '<img src="'+imageUrl+'" />';
		// 	}
		// } else {
		// 	console.log("didn't find image for ", service);
		// }

		htmlContent += serviceName;

		listElement.innerHTML = htmlContent;

		listElement.onclick = function(e) {
			e.preventDefault();
			Cabana.Share(service)
		};

		list.appendChild(listElement);
	});

};