define(function() { 
	var Common = {
		toggleHeaderButtons: function(type) {
			var buttons = $('.header__btn').removeClass('active');

			if (type){
				buttons.filter('.js-' + type).addClass('active');
			}
		},
		setTitle: function(title) {
			document.title = title;
		}
	};

	return Common; 
});