define(['collections/cities', 'common/index', 'common/forecast'], function(Cities, Index, Forecast) { 
	var CityView = Backbone.View.extend({
		template: _.template($('#city_template').html()),
		alertTemplate: _.template($('#alert_template').html()),
		forecastTemplate: _.template($('#forecast_template').html()),
		events: {
			'click #js-bookmark_toggle': 'bookmarkToggle',
			'click #js-update_forecast': 'forecastUpdate'
		},
		initialize: function(city) {
            this.city = city;
            this.inBookmarks = false;
            this.listenTo(Cities, 'reset', this.setCityPage);
        },
		render: function() {
			Index.toggleHeaderButtons();
			Index.setTitle('Forecast: ' + this.city);

	    	$('#content').html(this.$el.html(this.template({city: this.city, inBookmarks: this.inBookmarks})));

	    	Cities.fetch({reset: true});

	    	this.forecastRequest();
	    },
	    codes: {
	    	SUCCESS: 200
	    },
	    forecastRequest: function() {
	    	var _this = this,
	    		updateForecastButton = $('#js-update_forecast');

	    	updateForecastButton.addClass('active');

	    	Forecast.getForecast(this.city, function(data) {
	    		if (data.cod == _this.codes.SUCCESS) {
	    			_this.$('#city_forecast').html(_this.forecastTemplate(data));
	    		} else {
	    			_this.$('#city_forecast').html(_this.alertTemplate({text: data.message}));
	    		}
            	
            	updateForecastButton.removeClass('active');
            }, function() {
            	_this.$('#city_forecast').html(_this.alertTemplate({text: 'Internal error'}));

            	updateForecastButton.removeClass('active');
            });
	    },
	    forecastUpdate:  function(e) {
	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.forecastRequest();
	    },
	    setCityPage: function() {
	    	this.inBookmarks = (Cities.inCollection(this.city) ? true : false);

	    	this.setBookmarkButton();
	    },
	    setBookmarkButton: function() {
	    	var _this = this,
	    		btn = $('#js-bookmark_toggle');

	    	btn.toggleClass('icon_bookmark_on', _this.inBookmarks)
	    		.toggleClass('icon_bookmark_off', !_this.inBookmarks)
				.attr('title', (_this.inBookmarks ? 'Remove from my cities' : 'Add to my cities'));
	    },
	    bookmarkToggle: function(e) {
	    	e.preventDefault();
	    	e.stopPropagation();

	    	Cities.toggleModel(this.city);

	    	this.inBookmarks = !this.inBookmarks;

	    	this.setBookmarkButton();
	    }
	});
	return CityView; 
});
