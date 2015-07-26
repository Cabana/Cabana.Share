this.compact = function() {
	
	var cabanaBox = document.querySelector('.cabana-share-box'),
			trigger = Cabana.vars.Share.trigger ? Cabana.vars.Share.trigger : false;

	if (trigger) {

		var bodyOffset = document.body.getBoundingClientRect(),
				triggerOffset = trigger.getBoundingClientRect();

		// console.log(bodyOffset, triggerOffset);

		var offsetTop = (triggerOffset.top - bodyOffset.top) + triggerOffset.height,
				offsetLeft = (triggerOffset.left - bodyOffset.left) + triggerOffset.width;

		cabanaBox.style.left = offsetLeft+'px';
		cabanaBox.style.top = offsetTop+'px';
		cabanaBox.style.opacity = '1';
		cabanaBox.style.transform = 'scale(1)';

		cabanaBox.onmouseenter = function() {
			console.log("entered");

			cabanaBox.onmouseleave = function() {
				cabanaBox.onmouseenter = function() {void(0)};
				cabanaBox.onmouseleave = function() {void(0)};
				
				cabanaBox.style.opacity = '0';
				cabanaBox.style.transform = 'scale(0)';
			};
		};
	}

};