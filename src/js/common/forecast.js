define(function() { 
	var Forecast = {
		getForecast: function(city, cb, errorFunc) {
			var KEY = "40e114386b441a3d5a08271deae40dd4";
			$.getJSON(
				"http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid="+ KEY,
				function (data) {
					cb(data);
				}
			).fail(function() {
				if (errorFunc && _.isFunction(errorFunc)) {
					errorFunc();
				}
			});
		}
	};

	return Forecast; 
});