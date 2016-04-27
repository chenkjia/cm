var Common = require('./common');
var navs = require('./view/nav');
var r = {
  area:require('./view/area'),
  building:require('./view/building'),
  household:require('./view/household'),
  person:require('./view/person'),
  user:require('./view/user')
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
    $('#nav li').removeClass('active open');
    $('a[href="#'+page+'"]').parents('li').addClass('active');
  }
});
module.exports = routes;