define(function() { 
	var contentView = Backbone.View.extend({
	    template: _.template($('#content_template').html()),

		render: function() { 
			this.$el.html(this.template());

			return this;
		}
	});
	return contentView; 
});