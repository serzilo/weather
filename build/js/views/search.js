define(["common/index"],function(t){var e=Backbone.View.extend({template:_.template($("#list_template").html()),listLinkTemplate:_.template($("#list_link_template").html()),events:{"input #search_input":"keydownHandler"},render:function(){t.toggleHeaderButtons("search"),$("#content").html(this.$el.html(this.template({showSearchInput:!0}))),this.$("#search_input").focus()},keydownHandler:function(t){var e=t.target.value,n=this,l=n.$("#cities_list_ul");e.length>2?$.getJSON("http://gd.geobytes.com/AutoCompleteCity?callback=?&q="+e,function(t){var i=new RegExp(e,"gi"),a=t.map(function(t){var e=t.replace(i,function(t){return"<b>"+t+"</b>"});return n.listLinkTemplate({name:e,link:encodeURIComponent(t)})});l.html(a.join(""))}):l.html("")}});return e});