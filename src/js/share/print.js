this.print = function() {
	try {
		print();
		this.tracking('print');
	} catch(e) {
		console.error(e);
	}
};

