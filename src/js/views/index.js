define(function() { 
	var indexView = Backbone.View.extend({
	    el: $('#app'),
	    template: _.template($('#main_template').html()),
	    events: {
	    	'click #header_menu'   : 'showMenu',
	    	'click #header_search' : 'showSearch'
	    },
	    showMenu: function(e){
	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.toggleClass($(e.target), 'active');

	    	this.toggleClass($('#header_cities_list'), 'hidden');
	    },
	    showSearch: function(e){
	    	var $list = $('#header_search_list');

	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.toggleClass($(e.target), 'active');

	    	this.toggleClass($list, 'hidden', function() {
	    		setTimeout(function() {
	    			$list.find('#search-input').focus();
	    		}, 0);
	    	});
	    },
	    toggleClass: function(e, classValue, cb) {
	    	e.toggleClass(classValue);

	    	if (cb && typeof cb == 'function') {
	    		cb();
	    	}
	    },
		render: function() { 
			this.$el.html(this.template());
		}
	});
	return new indexView(); 
});