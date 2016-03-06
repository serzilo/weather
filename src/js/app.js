define(['views/main'], function(mainView, router) { 
	var initialize = function() {
	    mainView.render();
	};
	return {
		initialize: initialize
	}; 
});