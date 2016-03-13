define(function() { 
	var City = Backbone.Model.extend({
		defaults: {
			name: 'City needs in a name',
			link: null
		},
		validate: function(attrs, options) {
		    if (!attrs.name || !attrs.link) {
		    	return "All attributes required.";
		    }
		}
	});

	return City;
});