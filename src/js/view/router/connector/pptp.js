var Table = require('../../table');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: '线路',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    url:{
      list: 'router/connector/pptp-table.json',
      create: 'create',
      update: 'update',
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
        title: "线路名",
        popup:{
          modal:['create','update'],
          type: 'input',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'input'
        },
      },{
        data: "domain",
        title: "服务器地址/域名",
        popup:{
          modal:['create','update'],
          type: 'input',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'input'
        },
      },{
        data: "output",
        title: "出口",
        type: 'select',
        popup: {
          modal:['create','update'],
          type: 'select',
          rule:{
            required:true
          }
        },
        filter: {
          type: 'select'
        },
        option:{
          url: 'router/connector/nic-table.json',
          value: 'id',
          label: 'name'
        },
      },{
        data: "username",
        title: "PPTP拨号用户名",
        popup:{
          modal:['create','update'],
          type: 'input',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'input'
        },
      },{
        data: "password",
        title: "PPTP拨号密码",
        visible: false,
        noVis: true,
        defaultContent: '',
        popup:{
          modal:['create','update'],
          type: 'input',
          rule:{
            required: true
          }
        },
      },{
        data: "ip",
        title: "本地IP",
        filter:{
          type: 'input'
        },
      },{
        data: "gateway",
        title: "网关",
        filter:{
          type: 'input'
        },
      },{
        data: "status",
        title: "状态",
        type: "select",
        filter:{
          type: 'select'
        },
        options:[
          {label:'禁用',value:"0"},
          {label:'启用',value:"1"}
        ]
      },{
        data: "mask",
        title: "源地址伪装:",
        visible: false,
        defaultContent: '',
        popup:{
          modal:['create','update'],
          type: 'select',
        },
        option:{
          url: 'router/connector/nic-table.json',
          value: 'id',
          label: 'name'
        },
      },{
        data: "probe",
        title: "链路探测:",
        visible: false,
        defaultContent: '',
        popup:{
          modal:['create','update'],
          type: 'select',
          handleChange:function(status){
            $('#popup-form [name="probeAddress"],#popup-form [name="probeTimes"]').prop('disabled',true).parents('.form-group').hide();
            switch(status){
              case '2':
                $('#popup-form [name="probeTimes"]').prop('disabled',false).parents('.form-group').show();
                break;
              case '3':
                $('#popup-form [name="probeAddress"]').prop('disabled',false).parents('.form-group').show();
                $('#popup-form [name="probeTimes"]').prop('disabled',false).parents('.form-group').show();
                break;
            }
          }
        },
        options:[
          {label:'自动探测',value:"1"},
          {label:'探测网关',value:"2"},
          {label:'手工配置',value:"3"},
          {label:'关闭',value:"0"}
        ]
      },{
        data: "probeAddress",
        title: "探测地址:",
        visible: false,
        defaultContent: '',
        popup:{
          modal:['create','update'],
          disable: true,
          type: 'input'
        }
      },{
        data: "probeTimes",
        title: "探测失败次数:",
        visible: false,
        defaultContent: '',
        popup:{
          modal:['create','update'],
          disable: true,
          type: 'input'
        }
      }
    ]
  })),
};