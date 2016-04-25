var Common = require('./common');
var navs = require('./view/nav');
var r = {
  area:require('./view/area/index'),
  building:require('./view/building/index'),
  household:require('./view/household/index'),
  person:require('./view/person/index')
}
var routes = Backbone.Router.extend({
  currentView: null,
  routes : {
    '': 'homeView',
    'logout': 'logout',
    ':nav': 'changeView',
    ':nav/:subnav': 'changeView',
    ':nav/:subnav/:trinav': 'changeView',
  },
  logout:function () {
    $.ajax({
      url: Common.url+'logout',
      type: 'POST',
      dataType: 'json',
      headers:{
        "X-Parse-Session-Token":$.cookie('sessionToken')
      }
    })
    .done(function(data) {
      $.removeCookie('sessionToken');
      location.href="/login.html";
    })
    .fail(function() {
      console.log("error");
    });
  },
  homeView: function () {
    this.changeView('area');
  },
  changeView:function (nav,subnav,trinav) {
    var page;
    var view;
    var navlist = [nav];
    if (trinav) {
      view = r[nav][subnav][trinav].view;
      page = nav+'/'+subnav+'/'+trinav;
    } else if (subnav) {
      view = r[nav][subnav].view;
      page = nav+'/'+subnav;
    } else {
      view = r[nav].view;
      page = nav;
    }
    if(typeof this.currentView!="undefined"&&this.currentView!=null){
      this.currentView.undelegateEvents();
    }
    this.currentView = new view();
    this.renderNav(page);
  },
  renderNav:function(page) {
    $.cookie('activePage',page);
    $('#page-title').html(this.title(page,navs.list));
    $('#nav li').removeClass('active open');
    $('a[href="#'+page+'"]').parents('li').addClass('active');
  },
  title:function(url,list) {
    var item = _.find(list,function(item){
      return item.url === url;
    });
    return item.label;
  }
});
module.exports = routes;