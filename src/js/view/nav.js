var Common = require('../common');
var nav = _.template(require('./nav.html'));
module.exports = {
  init: function(){
    var that = this;
    var listInit = this.listInit();
    that.render(Common.treeFormat(listInit));
    $('#nav-search').on('keyup',function(){
      that.render(Common.treeFormat(that.filter(listInit,$(this).val())));
    });
  },
  filter: function(plist,text){
    var list = _.cloneDeep(plist);
    var tmp = _.filter(list,function (item) {
      return item.label.indexOf(text)!=-1||item.subtext.indexOf(text.toLocaleUpperCase())!=-1;
    });
    var tmp2 = _.filter(list,function (item) {
      for (var i = 0; i < tmp.length; i++) {
        var value = tmp[i];
        if (item.id.indexOf(value.id)===0) {
          return true;
        }
      }
    });
    return tmp2;
  },
  render: function(list,type) {
    var active = $.cookie('activePage').split('/');
    $('#nav>.nav-item').remove();
    $('#nav').append(nav({list:list,nav:nav,layout:'main',active:active}));
  },
  listInit:function() {
    var list = this.list
    _.map(list,function(item) {
      item['subtext'] = _.join(pinyin(item['label'],{style: pinyin.STYLE_FIRST_LETTER}),'');
    });
    console.log(list);
    return list;
  },
  list: [{
    id: "1",
    pid: "0",
    name: 'area',
    icon: 'globe',
    label: '区域管理',
    url: 'area'
  },{
    id: "2",
    pid: "0",
    name: 'building',
    icon: 'building-o',
    label: '楼房管理',
    url: 'building'
  },{
    id: "3",
    pid: "0",
    name: 'household',
    icon: 'users',
    label: '住户管理',
    url: 'household'
  },{
    id: "4",
    pid: "0",
    name: 'person',
    icon: 'user',
    label: '住民管理',
    url: 'person'
  }]
};