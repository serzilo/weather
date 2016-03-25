define(['views/main','collections/cities'], function(mainView, Cities) { 
	var initialize = function() {
	    mainView.render();
	    
	    // Suppresses 'add' events with {reset: true} and prevents the app view
		// from being re-rendered for every model. Only renders when the 'reset'
		// event is triggered at the end of the fetch.
    	Cities.fetch({reset: true});
	};
	return {
		initialize: initialize
	}; 
});