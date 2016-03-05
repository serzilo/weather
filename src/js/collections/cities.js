define(['models/city'], function(City) { 
	var Cities = Backbone.Collection.extend({
		model: City,
		localStorage: new Backbone.LocalStorage('cities'),
		comparator: 'order'
	});

	return new Cities();
});