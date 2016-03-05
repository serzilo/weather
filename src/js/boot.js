require.config({
	paths: {
		libs: 'libs'
	},
	shim: {
		'app': ['libs']
	} 
});

require(['app'], function(app) { 
	app.initialize();
});
