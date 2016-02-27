require.config({
	paths: {
		jQuery: '/js/libs/jquery',
		Underscore: '/js/libs/underscore',
		Backbone: '/js/libs/backbone'
	},
	shim: {
		'Backbone': ['Underscore', 'jQuery'],
		'app': ['Backbone']
	} 
});

require(['app'], function(app) { 
	app.initialize();
});
