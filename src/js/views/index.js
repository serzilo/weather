define(['collections/cities', 'common'],function(Cities, Common) { 
	var indexView = Backbone.View.extend({
		template: _.template($('#list_template').html()),
		listLinkTemplate: _.template($('#list_link_template').html()),
		initialize: function () {
			this.listenTo(Cities, 'reset', this.fillList);
		},
		render: function() {
			Common.toggleHeaderButtons('index');
	    	$('#content').html(this.$el.html(this.template()));

	    	this.$list = this.$('#cities_list_ul');

	    	// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
	    	Cities.fetch({reset: true});
	    },
	    fillList: function() {
	    	var _this = this,
	    		CitiesList = Cities.map(function(city) {
	    		return _this.listLinkTemplate(city.toJSON());
	    	}).join('');

	    	this.$list.html(CitiesList);
	    }
	});
	return indexView; 
});
