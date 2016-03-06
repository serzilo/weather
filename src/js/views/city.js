define(['common'], function(Common) { 
	var CityView = Backbone.View.extend({
		template: _.template($('#city_template').html()),
		render: function() {
			Common.toggleHeaderButtons();
	    	$('#content').html(this.$el.html(this.template()));
	    }
	});
	return CityView; 
});
