require.config({
	paths: {
		jQuery: 'libs/jquery',
		Underscore: 'libs/underscore',
		Backbone: 'libs/backbone',
		BackboneLocalStorage: 'libs/backbone.localStorage'
	},
	shim: {
		'Backbone': ['Underscore', 'jQuery'],
		'BackboneLocalStorage': ['Backbone'],
		'app': ['Backbone','BackboneLocalStorage']
	} 
});

require(['app'], function(app) { 
	app.initialize();
});
