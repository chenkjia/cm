var Table = require('../../table');
var Common = require('../../../common');
module.exports = {
  view: Backbone.View.extend(Table.view({
    label: '线路',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    url:{
      list: 'router/connector/wan-table.json',
      create: 'create',
      update: 'update',
    },
    tooltip: true,
    popup:{
      size: null,
      select: true,
      radio: true,
    },
    filter:{
      select:true,
      date:true
    },
    columnsPure:[{
      data: "name",
      title: "线路名称",
      popup: {
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
      data: "netport",
      title: "物理接口",
      type: "select",
      visible: false,
      popup: {
        modal: ['create','update'],
        type: 'select',
        rule:{
          required: true
        }
      },
      filter:{
        type: 'select'
      },
      options:[
        { label:'eth1',value:0 },
        { label:'eth0',value:1 }
      ]
    },{
      data: "vlan",
      title: "VLAN",
      visible: false,
      defaultContent: '',
      popup: {
        modal: ['create','update'],
        type: 'input'
      },
      filter:{
        type: 'input'
      },
    },{
      data: "access",
      title: "接入方式",
      visible: false,
      type:"select",
      popup: {
        modal: ['create','update'],
        type: 'select',
        handleChange:function(status){
          $('#popup-form [name="ip"],#popup-form [name="mask"],#popup-form [name="gateway"]').prop('disabled',true).parents('.form-group').hide();
          switch(status){
            case '0':
              $('#popup-form [name="ip"],#popup-form [name="mask"],#popup-form [name="gateway"]').prop('disabled',false).parents('.form-group').show();
              break;
            case '2':
              $('#popup-form [name="probeAddress"]').prop('disabled',false).parents('.form-group').show();
              $('#popup-form [name="probeTimes"]').prop('disabled',false).parents('.form-group').show();
              break;
          }
        }
      },
      options:[
        { label:'以太网/静态IP',value:'0',subtext:'(固定IP上网，如光纤)' },
        { label:'以太网/动态IP',value:'1',subtext:'(通过DHCP自动获取IP)'  },
        { label:'ADSL/PPPOE拨号',value:'2',subtext:'(通过电话线+猫或以太网/光纤上网)'  },
      ]
    },{
      data: "mac",
      title: "克隆MAC地址",
      visible: false,
      defaultContent: '',
      popup: {
        modal: ['create','update'],
        type: 'input'
      },
    },{
      data: "type",
      title: "网卡类型",
      filter: {
        type: 'input'
      },
    },{
      data: "status",
      title: "状态",
      class:'text-center table-tooltip',
      filter: {
        type: 'select'
      },
      render: function(data, type, full, meta) {
        switch(data){
          case 0:
            return '<i class="fa fa-exclamation-circle font-red"></i><span style="display:none;">异常</span>';
          case 1:
            return '<i class="fa fa-check-circle font-green"></i><span style="display:none;">正常</span>';
        }
      },
      createdCell: function (td, cellData, rowData, row, col,a,b,c) {
        $(td).attr({
          'data-content': _.find(_.find(this.api().context[0].aoColumns,['data','status']).options,['value',cellData]).label,
        });
      },
      options:[
        {label:'异常',value:0},
        {label:'正常',value:1}
      ]
    },{
      data: "ip",
      title: "IP地址",
      popup: {
        modal: ['create','update'],
        disabled: true,
        type: 'input',
      },
      filter: {
        type: 'input'
      },
      render: function(data, type, full, meta) {
        var mask = _.find(_.find(meta.settings.aoColumns,['data','mask']).options,['value',full.mask]).label;
        return data+'/'+mask;
      }
    },{
      data: "mask",
      title: "子网掩码",
      type: 'select',
      visible: false,
      noVis: true,
      popup: {
        modal: ['create','update'],
        disabled: true,
        type: 'select'
      },
      options:[
        {label:'255.255.255.0',value:0},
        {label:'255.255.0.0',value:1}
      ]
    },{
      data: "gateway",
      title: "网关",
      filter: {
        type: 'input'
      },
      popup: {
        modal: ['create','update'],
        disabled: true,
        type: 'input'
      },
    },{
      title: "速率(bps)",
      render: function(data, type, full, meta) {
        return '<i class="fa fa-arrow-circle-up font-green"></i> '+Common.bpsFormat(full.obps,1000,'bps') + ' <i class="fa fa-arrow-circle-down font-red"></i> ' + Common.bpsFormat(full.ibps,1000,'bps');
      },
    },{
      name: "group",
      data: "group",
      title: "群组",
      visible: false,
      defaultContent: '',
      noVis: true,
      popup: {
        modal: ['group'],
        type: 'select'
      },
      option:{
        url: 'router/connector/group-table.json',
        value: 'id',
        label: 'name'
      },
    }],
    customEvents:{
      'click #table_wrapper .table-operation-link-btn':'operationLink',
      'click #table_wrapper .table-batch-group-btn':'batchGroup'
    },
    cuntomBatch:[{label:'加入群组',name:'group',icon:'users'}],
    customFunctions:{
      batchGroup:function (event) {
        var columns = _.filter(this.settings.columns,function(column){
          return column.popup&&column.popup.modal&&column.popup.modal.indexOf('group')!=-1;
        });
        console.log(columns);
        this.popup({
          title: '加入群组',
          action: 'update',
          columns: columns,
          data:{},
        });
      }
    },
  })),
};