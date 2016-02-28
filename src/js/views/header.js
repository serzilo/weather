define(function() { 
	var headerView = Backbone.View.extend({
	    template: _.template($('#header_template').html()),
	    events: {
	    	'click #header_menu'   : 'showMenu',
	    	'click #header_search' : 'showSearch',
	    	'input #search_input'  : 'keydownHandler'
	    },
	    showMenu: function(e){
	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.toggleClass($(e.currentTarget), 'active');

	    	this.toggleClass($('#header_cities_list'), 'hidden');
	    },
	    showSearch: function(e){
	    	var $list = $('#header_search_list');

	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.toggleClass($(e.currentTarget), 'active');

	    	this.toggleClass($('#overlay'), 'overlay_show');

	    	this.toggleClass($list, 'hidden', function() {
	    		setTimeout(function() {
	    			$list.find('#search_input').focus();
	    		}, 0);
	    	});
	    },
	    toggleClass: function(e, classValue, cb) {
	    	e.toggleClass(classValue);

	    	if (cb && typeof cb == 'function') {
	    		cb();
	    	}
	    },
	    keydownHandler: function(e) {
	    	var value = e.target.value;

	    	console.log(value);
	    },
		render: function() { 
			this.$el.html(this.template());

			return this;
		}
	});
	return headerView; 
});