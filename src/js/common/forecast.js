define(function() { 
	var Forecast = {
		getForecast: function(city, cb) {
			var KEY = "40e114386b441a3d5a08271deae40dd4";
			$.getJSON(
				"http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid="+ KEY,
				function (data) {
					cb(data);
				}
			);
		}
	};

	return Forecast; 
});