define(function() { 
	var indexView = Backbone.View.extend({
	    el: $('#app'),
	    template: _.template($('#main_template').html()),
		render: function() { 
			this.$el.html(this.template());
		}
	});
	return new indexView(); 
});