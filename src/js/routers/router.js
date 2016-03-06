define(['views/search', 'views/index', 'views/city'], function(SearchView, IndexView, CityView) { 
	var Router = Backbone.Router.extend({
		currentView: null,
		routes: {
	        "search/": "search",
	        "city/:city": "city",
	        "": "index"
	    },
	    changeView: function(view) {
			if ( null !== this.currentView ) {
				this.currentView.undelegateEvents(); 
			}
			this.currentView = view;
			this.currentView.render(); 
		},
	    search: function() {
	    	this.changeView(new SearchView());
	    	console.log('search');
	    },
	    city: function() {
	    	this.changeView(new CityView());
	    	console.log('city');
	    },
	    index: function() {
	    	this.changeView(new IndexView());
	    	console.log('index');
	    }
	});

	return Router;
});