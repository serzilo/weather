define(['collections/cities', 'common/index'],function(Cities, Index) { 
	var indexView = Backbone.View.extend({
		template: _.template($('#list_template').html()),
		blockTemplate: _.template($('#block_template').html()),
		listLinkTemplate: _.template($('#list_link_template').html()),
		events: {
	    	'mouseover #cities_list_ul li'  : 'listItemHighlight',
	    	'mouseout #cities_list_ul li'   : 'listItemRemoveHighlight'
	    },
	    itemClass: 'list__item',
	    activeClass: 'list__item_active',
		initialize: function () {
			this.listenTo(Cities, 'reset', this.fillList);
		},
		render: function() {
			Index.toggleHeaderButtons('index');
			Index.setTitle('My cities');

	    	$('#content').html(this.$el.html(this.template()));

	    	this.$list = this.$('#cities_list_ul');

	    	// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
	    	Cities.fetch({reset: true});
	    },
	    fillList: function() {
	    	var CitiesList = '';

	    	if (Cities.length) {
		    	var _this = this;

		    	CitiesList = Cities.map(function(city) {
		    		return _this.listLinkTemplate(city.toJSON());
		    	}).join('');
	    	} else {
	    		CitiesList = this.blockTemplate({text: 'Your cities list is empty. Please, use a <a href="#/search/">search</a>.', centeredContent: true});
	    	}

	    	this.$list.html(CitiesList);
	    },
	    listItemRemoveHighlight: function(e) {
	    	this.$list.find('.' + this.itemClass).removeClass(this.activeClass);
	    },
	    listItemHighlight: function(e) {
	    	this.listItemRemoveHighlight(e);
	    	$(e.currentTarget).addClass(this.activeClass);
	    },
	});
	return indexView; 
});
