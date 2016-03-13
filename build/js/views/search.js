define(["common/index"],function(t){var e=Backbone.View.extend({template:_.template($("#list_template").html()),listLinkTemplate:_.template($("#list_link_template").html()),events:{"input #search_input":"citiesRequest","keydown #search_input":"keydownHandler","keyup #search_input":"keyupHandler","mouseover #cities_list_ul li":"listItemHighlight"},inputEventSupport:function(){return"oninput"in document.getElementById("search_input")},itemClass:"list__item",activeClass:"list__item_active",render:function(){t.toggleHeaderButtons("search"),t.setTitle("Search city"),$("#content").html(this.$el.html(this.template({showSearchInput:!0}))),this.$searchList=this.$("#cities_list_ul"),this.$("#search_input").focus()},minValueLength:3,citiesRequest:function(t){var e=t.target.value,i=this;e.length>=i.minValueLength?$.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+e,function(t){var s=new RegExp(e,"gi"),n=t.map(function(t){var e=t.replace(s,function(t){return"<b>"+t+"</b>"});return i.listLinkTemplate({name:e,link:"#/city/"+encodeURIComponent(t)})});i.$searchList.html(n.join(""))}):i.$searchList.html("")},KEYS:{up:38,down:40,enter:13},keydownHandler:function(t){var e=t.keyCode,i=t.target.value;i.length>=this.minValueLength&&(e==this.KEYS.up||e==this.KEYS.down?(t.preventDefault(),t.stopPropagation(),this.moveSelectedItem(e==this.KEYS.up?0:1)):e==this.KEYS.enter&&(t.preventDefault(),t.stopPropagation(),this.selectCity()))},keyupHandler:function(t){if(this.inputEventSupport()===!1){var e=t.keyCode;e!=this.KEYS.up&&e!=this.KEYS.down&&e!=this.KEYS.enter&&this.citiesRequest(t)}},moveSelectedItem:function(t){var e,i,s=$("#cities_list_ul ."+this.itemClass),n=$("#cities_list_ul ."+this.itemClass+"."+this.activeClass).index();-1==n?e=t>0?s.first():s.last():(i=t>0?n+1<s.length?n+1:0:n-1>=0?n-1:s.length-1,e=$(s[i]),$("#cities_list_ul ."+this.activeClass).removeClass(this.activeClass)),e.addClass(this.activeClass)},listItemHighlight:function(t){this.$searchList.find("."+this.itemClass).removeClass(this.activeClass),$(t.currentTarget).addClass(this.activeClass)},selectCity:function(){var t=this.$searchList.find("."+this.activeClass+" a").attr("href");t&&(window.location=t)}});return e});