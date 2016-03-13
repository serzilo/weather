define(['models/city'], function(City) { 
	var Cities = Backbone.Collection.extend({
		model: City,
		localStorage: new Backbone.LocalStorage('cities'),
		comparator: 'order',
		inCollection: function(name) {
			return this.findWhere({name: name});
		},
		toggleModel: function(name) {
			var result = this.inCollection(name);

			if (result) {
				result.destroy();
			} else {
				this.create({name: name, link: '#/city/' + encodeURIComponent(name)});
			}
		}
	});

	return new Cities();
});