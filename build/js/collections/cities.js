define(["models/city"],function(e){var o=Backbone.Collection.extend({model:e,localStorage:new Backbone.LocalStorage("cities"),comparator:"order"});return new o});