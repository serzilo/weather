define(['views/main', 'routers/router'], function(mainView, router) { 
	var initialize = function() {
	    mainView.render();
	};
	return {
		initialize: initialize
	}; 
});