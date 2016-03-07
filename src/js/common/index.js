define(function() { 
	var Common = {
		toggleHeaderButtons: function(type) {
			var buttons = $('.header__btn').removeClass('active');

			if (type){
				buttons.filter('.js-' + type).addClass('active');
			}
		}
	};

	return Common; 
});