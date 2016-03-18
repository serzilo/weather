define(function() { 
	var City = Backbone.Model.extend({
		validate: function(attrs, options) {
		    if (!attrs.name || !attrs.link) {
		    	return "All attributes required.";
		    }
		}
	});

	return City;
});