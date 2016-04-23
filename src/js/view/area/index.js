var Table = require('../table');
var operationTpl = require('../table/operation.html');
module.exports = {
  view: Backbone.View.extend(Table.view({
    name: 'area',
    label: '群组',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    popup:{
      size: null
    },
    filter:{
      select:true
    },
    columnsPure:[
      {
        field: "name",
        title: "片区名称",
        create: true,
        update: true,
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
      },
    ]
  }))
};