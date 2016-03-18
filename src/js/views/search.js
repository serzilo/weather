define(['common/index'], function(Index) { 
	var searchView = Backbone.View.extend({
		template: _.template($('#list_template').html()),
		listLinkTemplate: _.template($('#list_link_template').html()),
		events: {
	    	'input #search_input' 	    	: 'citiesRequest',
	    	'keydown #search_input' 	    : 'keydownHandler',
	    	'keyup #search_input'  			: 'keyupHandler',
	    	'mouseover #cities_list_ul li'  : 'listItemHighlight'
	    },
	    inputEventSupport: function() {
	    	return 'oninput' in document.getElementById("search_input");
	    },
	    itemClass: 'list__item',
	    activeClass: 'list__item_active',
	    render: function() {
	    	Index.toggleHeaderButtons('search');
	    	Index.setTitle('Search city');
	    	
	    	$('#content').html(this.$el.html(this.template({showSearchInput: true})));

	    	this.$searchList = this.$('#cities_list_ul');

	    	this.$('#search_input').focus();
	    },
	    minValueLength: 3,
	    citiesRequest: function(e) {
	    	var value = e.target.value,
	    		_this = this;
	    		
	    	if (value.length >= _this.minValueLength){
		    	$.getJSON(
					"http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+value,
					function (data) {
						var re = new RegExp(value, 'gi'),
							cities = data.map(function(city) {
								var fixedName = city.replace(re, function(str) {
									return "<b>" + str + "</b>";
								});

								return _this.listLinkTemplate({name: fixedName, link: '#/city/' + encodeURIComponent(city)});
							});

						_this.$searchList.html(cities.join(''));
					}
				);
	    	} else {
	    		_this.$searchList.html('');
	    	}
	    },
	    KEYS : {
    		up: 38,
    		down: 40,
    		enter: 13
    	},
	    keydownHandler: function(e) {
	    	var keyCode = e.keyCode,
	    		value = e.target.value;

	    	if (value.length >= this.minValueLength) {
	    		if (keyCode == this.KEYS.up || keyCode == this.KEYS.down) {
	    			e.preventDefault();
	    			e.stopPropagation();

	    			this.moveSelectedItem(keyCode == this.KEYS.up ? 0 : 1);
	    		} else if (keyCode == this.KEYS.enter) {
	    			e.preventDefault();
	    			e.stopPropagation();

	    			this.selectCity();
	    		} 
	    	}
	    },
	    keyupHandler: function (e) {
	    	if (this.inputEventSupport() === false) {
		    	var keyCode = e.keyCode;

		    	if (keyCode != this.KEYS.up && keyCode != this.KEYS.down && keyCode != this.KEYS.enter) {
		    		this.citiesRequest(e);
		    	}
	    	}
	    },
	    moveSelectedItem: function(dir) {
	    	var items = $('#cities_list_ul .' + this.itemClass),
				activeIndex = $('#cities_list_ul .' + this.itemClass + '.' + this.activeClass).index(),
				current,
				index;

			if (activeIndex == -1) {
				current = (dir > 0 ? items.first() : items.last());
			} else {
				if (dir > 0) {
					// down
					index = (activeIndex + 1 < items.length ? activeIndex + 1 : 0);
				} else {
					// up
					index = (activeIndex - 1 >= 0 ? activeIndex - 1 : items.length - 1);
				}

				current = $(items[index]);
				$('#cities_list_ul .' + this.activeClass).removeClass(this.activeClass);
			}

			current.addClass(this.activeClass);
	    },
	    listItemHighlight: function(e) {
	    	this.$searchList.find('.' + this.itemClass).removeClass(this.activeClass);
	    	$(e.currentTarget).addClass(this.activeClass);
	    },
	    selectCity: function() {
	    	var src = this.$searchList.find('.' + this.activeClass + ' a').attr('href');

	    	if (src) {
	    		window.location = src;
	    	}
	    }
	});
	return searchView; 
});
