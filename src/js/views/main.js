define(['views/header','views/content'],function(headerView, contentView) { 
	var indexView = Backbone.View.extend({
	    el: $('#app'),

		render: function() { 
			this.$el.html((new headerView()).render().$el)
				 .append((new contentView()).render().$el);
		}
	});
	return new indexView(); 
});