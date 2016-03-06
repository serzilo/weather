define(['routers/router'],function(Router) { 
	var indexView = Backbone.View.extend({
	    el: $('#app'),
	    template: _.template($('#main_template').html()),

		render: function() { 
			this.$el.html(this.template());

			new Router();
			Backbone.history.start();
		}
	});
	return new indexView(); 
});