var Table = require('../table');
var operationTpl = require('../table/operation.html');
module.exports = {
  view: Backbone.View.extend(Table.view({
    name: '楼房管理',
    label: '楼房',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    url:{
      list: 'classes/building',
      create: 'classes/building',
      update: 'classes/building',
      delete: 'classes/building',
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
        title: "楼房名称",
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
        data: "address",
        title: "地址",
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
        data: "area",
        title: "所属区域",
        type: "select",
        pointer: "area",
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
          url:'classes/area',
          value:'objectId',
          label:'name'
        }
      },{
        data: "remark",
        title: "备注",
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