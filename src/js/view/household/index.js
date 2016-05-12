var Table = require('../table');
var operationTpl = require('../table/operation.html');
module.exports = {
  view: Backbone.View.extend(Table.view({
    name: '住户管理',
    label: '住户',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    url:{
      list: 'classes/household',
      create: 'classes/household',
      update: 'classes/household',
      delete: 'classes/household',
    },
    popup:{
      size: null,
      select:true
    },
    filter:{
      select:true
    },
    columnsPure:[
      {
        data: "name",
        title: "住户名称",
        popup:{
          modal: ['create','update'],
          type: 'input',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'input'
        },
      },{
        data: "building",
        title: "所属楼房",
        type: "select",
        pointer: "building",
        popup:{
          modal: ['create','update'],
          type: 'select',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'select'
        },
        option:{
          url:'classes/building',
          value:'objectId',
          label:'name'
        }
      },{
        data: "personNumTotal",
        title: "家庭人口",
        filter:{
          type: 'range'
        },
        option:{
          url:'classes/person',
        },
        render:function(data,type,full,meta) {
          var column = meta.settings.aoColumns[meta.col];
          return _.size(_.filter(column.options,function(option) {
            return option.household.objectId===full.objectId
          },'asdfasd'));
        }
      },{
        data: "personNumResident",
        title: "常住",
        filter:{
          type: 'range'
        },
        option:{
          url:'classes/person'
        },
        render:function(data,type,full,meta) {
          var column = meta.settings.aoColumns[meta.col];
          return _.size(_.filter(column.options,function(option) {
            return option.household.objectId===full.objectId&&option.resident==='1'
          },'asdfasd'));
        }
      },{
        data: "personNumHang",
        title: "空挂",
        filter:{
          type: 'range'
        },
        option:{
          url:'classes/person'
        },
        render:function(data,type,full,meta) {
          var column = meta.settings.aoColumns[meta.col];
          return _.size(_.filter(column.options,function(option) {
            return option.household.objectId===full.objectId&&option.resident==='2'
          },'asdfasd'));
        }
      },{
        data: "personNumFlow",
        title: "流动",
        filter:{
          type: 'range'
        },
        option:{
          url:'classes/person'
        },
        render:function(data,type,full,meta) {
          var column = meta.settings.aoColumns[meta.col];
          return _.size(_.filter(column.options,function(option) {
            return option.household.objectId===full.objectId&&option.resident==='3'
          },'asdfasd'));
        }
      },{
        data: "notLow",
        title: "正常",
        filter:{
          type: 'range'
        },
        option:{
          url:'classes/person'
        },
        render:function(data,type,full,meta) {
          var column = meta.settings.aoColumns[meta.col];
          return _.size(_.filter(column.options,function(option) {
            return option.household.objectId===full.objectId&&!option.isLow
          },'asdfasd'));
        }
      },{
        data: "isLow",
        title: "低保",
        filter:{
          type: 'range'
        },
        option:{
          url:'classes/person'
        },
        render:function(data,type,full,meta) {
          var column = meta.settings.aoColumns[meta.col];
          return _.size(_.filter(column.options,function(option) {
            return option.household.objectId===full.objectId&&option.isLow
          },'asdfasd'));
        }
      },{
        data: "remark",
        title: "备注",
        visible: false,
        defaultContent: '',
        popup:{
          modal: ['create','update'],
          type: 'input'
        },
        filter:{
          type: 'input'
        }
      }
    ],
    customEvents:{},
    customOperation:[],
    customFunctions:{
    },
  })),
};