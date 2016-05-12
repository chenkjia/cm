var Table = require('../table');
var operationTpl = require('../table/operation.html');
module.exports = {
  view: Backbone.View.extend(Table.view({
    name: '住民管理',
    label: '住民',
    sort: true,
    toolbar: ['create'],
    operation: ['update','delete'],
    url:{
      list: 'classes/person',
      create: 'classes/person',
      update: 'classes/person',
      delete: 'classes/person',
    },
    popup:{
      leftnum: 5,
      size: null,
      select:true,
      switch:true,
      date:true
    },
    filter:{
      select:true,
      date:true
    },
    columnsPure:[
      {
        data: "name",
        title: "姓名",
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
        data: "household",
        title: "所属住户",
        type: "select",
        pointer: "household",
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
          url:'classes/household',
          value:'objectId',
          label:'name'
        }
      },{
        data: "sex",
        title: "性别",
        type: "select",
        popup:{
          modal: ['create','update'],
          type: 'switch',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'select'
        },
        options:[{value:'1',label:'男',color:'success'},{value:'2',label:'女',color:'danger'}]
      },{
        data: "birth",
        title: "出生日期",
        popup:{
          modal: ['create','update'],
          type: 'date',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'date'
        },
        render:function(data, type, full, meta) {
          return moment(data, "YYYYMMDD").format('YYYY-MM-DD');
        }
      },{
        data: "contact",
        title: "与户主关系",
        type: 'select',
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
        options:[{value:'1',label:'本人'},{value:'2',label:'父'},{value:'3',label:'母'},{value:'4',label:'夫'},{value:'5',label:'妻'},{value:'6',label:'子'},{value:'7',label:'女'},{value:'8',label:'其他'}]
      },{
        data: "age",
        title: "年龄",
        filter:{
          type: 'range'
        },
        render:function(data, type, full, meta) {
          return Math.floor((Number(moment().format('YYYYMMDD'))-Number(full.birth))/10000);
        }
      },{
        data: "idNum",
        title: "身份证号码",
        popup:{
          modal: ['create','update'],
          type: 'input',
          rule:{
            required: true,
            minlength:15,
            maxlength:18
          }
        },
        filter:{
          type: 'input'
        }
      },{
        data: "resident",
        title: "常住情况",
        type: 'select',
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
        options:[{value:'1',label:'常住'},{value:'2',label:'空挂'},{value:'3',label:'流动'}]
      },{
        data: "isLow",
        title: "低保",
        type: 'select',
        popup:{
          modal: ['create','update'],
          type: 'switch',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'select'
        },
        options:[{value:false,label:'低保',color:'danger'},{value:true,label:'正常',color:'success'}]
      },{
        data: "marry",
        title: "婚姻",
        type: 'select',
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
        options:[{value:'1',label:'未婚'},{value:'2',label:'已婚'},{value:'3',label:'离异'},{value:'4',label:'丧偶'}]
      },{
        data: "education",
        title: "文件程度",
        type: 'select',
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
        options:[{value:'1',label:'小学'},{value:'2',label:'初中'},{value:'3',label:'高中'},{value:'3',label:'大专'},{value:'4',label:'本科'},{value:'5',label:'研究生'},{value:'6',label:'博士'}]
      },{
        data: "political",
        title: "政治面貌",
        type: 'select',
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
        options:[{value:'1',label:'群众'},{value:'2',label:'团员'},{value:'3',label:'党员'}]
      },{
        data: "work",
        title: "工作单位",
        popup:{
          modal: ['create','update'],
          type: 'input',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'input'
        }
      },{
        data: "hasPension",
        title: "养老保险",
        type: 'select',
        popup:{
          modal: ['create','update'],
          type: 'switch',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'select'
        },
        options:[{value:false,label:'没有',color:'danger'},{value:true,label:'有',color:'success'}]
      },{
        data: "hasMedical",
        title: "医疗保险",
        type: 'select',
        popup:{
          modal: ['create','update'],
          type: 'switch',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'select'
        },
        options:[{value:false,label:'没有',color:'danger'},{value:true,label:'有',color:'success'}]
      },{
        data: "mobile",
        title: "手机号码",
        popup:{
          modal: ['create','update'],
          type: 'input',
          rule:{
            required: true
          }
        },
        filter:{
          type: 'input'
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