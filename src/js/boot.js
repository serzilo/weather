require.config({
	paths: {
		jQuery: 'libs/jquery',
		Underscore: 'libs/underscore',
		Backbone: 'libs/backbone'
	},
	shim: {
		'Backbone': ['Underscore', 'jQuery'],
		'app': ['Backbone']
	} 
});

require(['app'], function(app) { 
	app.initialize();
});
