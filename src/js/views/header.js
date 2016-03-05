define(function() { 
	var headerView = Backbone.View.extend({
	    template: _.template($('#header_template').html()),
	    listLinkTemplate: _.template($('#list_link_template').html()),
	    events: {
	    	'click #header_menu'   : 'showMenu',
	    	'click #header_search' : 'showSearch',
	    	'click #overlay' 	   : 'overlayHandler',
	    	'input #search_input'  : 'keydownHandler'
	    },
	    openMenu: false,
	    initialize: function() {
	    	this.on('header_control_clicked', function(data) {
	    		this.menusController(data);
	    	});
	    },
	    showMenu: function(e){
	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.trigger('header_control_clicked', {type: 'showMenu', context: this});
	    },
	    showSearch: function(e){
	    	e.preventDefault();
	    	e.stopPropagation();

	    	this.trigger('header_control_clicked', {type: 'showSearch', context: this});
	    },
	    overlayHandler: function(e){
	    	this.trigger('header_control_clicked', {type: 'overlay', context: this, target: e.target});
	    },
	    menusController: function(data) {
	    	var _this = data.context,
	    		actions = {
	    			showMenu: {
	    				id: 'header_menu',
	    				func: function() {
		    				_this.toggleClass($('#header_cities_list'), 'hidden');
		    			}
	    			},
	    			showSearch: {
	    				id: 'header_search',
	    				func: function() {
	    					var $list = $('#header_search_list');

		    				_this.toggleClass($list, 'hidden', function() {
					    		setTimeout(function() {
					    			$list.find('#search_input').focus();
					    		}, 0);
		    				});
	    				}
	    			}
	    		};

	    	if (data.type == 'overlay') {
	    		// overlay clicked
	    		$(data.target).removeClass('overlay_show');
	    		actions[_this.openMenu].func();
	    		$('#' + actions[_this.openMenu].id).removeClass('active');

	    		_this.openMenu = false;
	    	} else if (_this.openMenu === false || _this.openMenu == data.type) {
	    		// open/close menu (no others menus open)
	    		_this.toggleClass($('#' + actions[data.type].id), 'active');
	    		actions[data.type].func();
	    		_this.toggleClass($('#overlay'), 'overlay_show');

	    		_this.openMenu = (_this.openMenu == data.type ? false : data.type);
	    	} else {
	    		// open menu and close opened before menu
	    		_.chain(actions)
	    			.keys()
	    			.each(function(k) {
		    			actions[k].func();
		    			_this.toggleClass($('#' + actions[k].id), 'active');
		    		});

	    		_this.openMenu = data.type;
	    	}

	    },
	    toggleClass: function(e, classValue, cb) {
	    	e.toggleClass(classValue);

	    	if (cb && typeof cb == 'function') {
	    		cb();
	    	}
	    },
	    keydownHandler: function(e) {
	    	var value = e.target.value;

	    	console.log(value);
	    },
		render: function() { 
			var _this = this,
				tempData = [
					{link: 123, name: 'New York'},
					{link: 456, name: 'London'}
				],
				cityies = tempData.map(function(city) {
					return _this.listLinkTemplate(city);
				});

				this.$el.html(this.template());
				this.$el.find('#header_cities_list_ul').html(cityies.join(''));

			return this;
		}
	});
	return headerView; 
});