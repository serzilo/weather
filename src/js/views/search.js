define(['common/index'], function(Index) { 
	var searchView = Backbone.View.extend({
		template: _.template($('#list_template').html()),
		listLinkTemplate: _.template($('#list_link_template').html()),
		events: {
	    	'input #search_input'  : 'keydownHandler'
	    },
	    render: function() {
	    	Index.toggleHeaderButtons('search');
	    	$('#content').html(this.$el.html(this.template({showSearchInput: true})));

	    	this.$('#search_input').focus();
	    },
	    keydownHandler: function(e) {
	    	var value = e.target.value,
	    		_this = this,
	    		$searchList = _this.$('#cities_list_ul');

	    	if (value.length > 2){
		    	$.getJSON(
					"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+value,
					function (data) {
						var re = new RegExp(value, 'gi'),
							cities = data.map(function(city) {
								var fixedName = city.replace(re, function(str) {
									return "<b>" + str + "</b>";
								});

								return _this.listLinkTemplate({name: fixedName, link: encodeURIComponent(city)});
							});

						$searchList.html(cities.join(''));
					}
				);
	    	} else {
	    		$searchList.html('');
	    	}
	    }
	});
	return searchView; 
});
