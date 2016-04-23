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
      return item.label.indexOf(text)!=-1||item.subtext.indexOf(_.toUpper(text).toLocaleUpperCase())!=-1;
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
    console.log(list)
    console.log(type)
    var activePage = $.cookie('activePage')||'';
    var active = activePage.split('/');
    $('#nav>.nav-item').remove();
    $('#nav').append(nav({list:list,nav:nav,layout:'main',active:active}));
  },
  listInit:function() {
    var list = this.list;
    _.map(list,function(item) {
      item.subtext = _.toUpper(_.reduce(_.flattenDeep(pinyin(item.label,{style:pinyin.STYLE_FIRST_LETTER})), function(sum, n) {
        return sum + n;
      },''));
    });
    return list;
  },
  list: [{
    id: "1",
    pid: "0",
    name: 'area',
    url: 'area',
    icon: 'globe',
    label: '片区管理'
  },{
    id: "2",
    pid: "0",
    name: 'building',
    url: 'building',
    icon: 'building-o',
    label: '楼房管理'
  },{
    id: "3",
    pid: "0",
    name: 'household',
    url: 'household',
    icon: 'users',
    label: '住户管理'
  },{
    id: "4",
    pid: "0",
    name: 'person',
    url: 'person',
    icon: 'user',
    label: '住民管理'
  }]
};