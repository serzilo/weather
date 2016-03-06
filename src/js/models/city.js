define(function() { 
	var City = Backbone.Model.extend({
		defaults: {
			name: 'City needs in a name',
			link: null
		}
	});

	return City;
});