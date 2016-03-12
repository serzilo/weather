define(['collections/cities', 'common/index', 'common/forecast'], function(Cities, Index, Forecast) { 
	var CityView = Backbone.View.extend({
		template: _.template($('#city_template').html()),
		forecastTemplate: _.template($('#forecast_template').html()),
		events: {
			'click .js-bookmark_toggle': 'bookmarkToggle',
			'click .js-update_forecast': 'forecastUpdate'
		},
		initialize: function(city) {
            this.city = city;
        },
		render: function() {
			Index.toggleHeaderButtons();
			Index.setTitle('Forecast: ' + this.city);

	    	$('#content').html(this.$el.html(this.template({city: this.city})));

	    	this.forecastRequest();
	    },
	    forecastRequest: function() {
	    	var _this = this,
	    		updateForecastButton = $('.js-update_forecast');

	    	updateForecastButton.addClass('active');

	    	Forecast.getForecast(this.city, function(data) {
            	console.dir(data);

            	_this.$('#city_forecast').html(_this.forecastTemplate(data));

            	updateForecastButton.removeClass('active');
            });
	    },
	    forecastUpdate:  function(e) {
	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.forecastRequest();
	    },
	    bookmarkToggle: function(e) {
	    	e.preventDefault();
	    	e.stopPropagation();

	    	console.log(1);
	    }
	});
	return CityView; 
});
