var Common = require('../../common');
module.exports = {
  filterInit:function(columnsDom) {
    var columns = columnsDom.context[0].aoColumns;
    columnsDom.every( function () {
      var column = this;
      var index = column[0][0];
      var filter = '<div class="table-filter">';
      if (columns[index].filter) {
        switch (columns[index].filter.type) {
          case 'input':
            filter += '<input name="'+columns[index].name+'-filter" type="text" value="" class="form-control form-filter input-sm" style="width:'+columns[index].filter.size+';">';
            break;
          case 'select':
            filter += '<select name="'+columns[index].name+'-filter" class="form-control form-filter select-sm"><option value="">所有</option>';
            _.forEach(columns[index].options,function(option) {
              filter += '<option value='+option.value+'>'+option.label+'</option>';
            });
            filter += '</select>';
            break;
          case 'range':
            filter += '<div class="input-group form-filter"><input name="'+columns[index].name+'-filter-min" type="text" value="" class="form-control input-sm" /><span class="input-group-addon">-</span><input name="'+columns[index].name+'-filter-max" type="text" value="" class="form-control input-sm" /></div>';
            break;
          case 'date':
            filter += '<div class="input-group form-filter date-filter"><input type="text" name="'+columns[index].name+'-filter-daterange" id="table-'+columns[index].name+'-filter-date" class="form-control input-sm"><span class="input-group-btn"><label for="table-'+columns[index].name+'-filter-date" class="btn btn-sm default date-range-toggle"><i class="fa fa-calendar"></i></label></span></div>';
            break;
          case 'button':
            filter += '<button class="btn btn-sm green btn-outline filter-submit" type="submit"><i class="fa fa-search"></i>&nbsp;搜索</button><button class="btn btn-sm red btn-outline filter-cancel" type="reset"><i class="fa fa-times"></i>&nbsp;重置</button>';
          default:
            break;
        }
      } else {
        filter += '&nbsp;';
      }
      filter += '</div>';
      $(filter).appendTo($(column.header()));
    });
    if (this.settings.filter){
      if (this.settings.filter.select){
        $('#table thead select').selectpicker({width:'auto'});
      }
      if (this.settings.filter.date){
        $('#table thead .date-filter input').daterangepicker({
          autoUpdateInput: false,
          locale: {
            cancelLabel: '清空'
          }
        });
        $('#table thead .date-filter input').on('apply.daterangepicker', function(ev, picker) {
            $(this).val(picker.startDate.format('YYYY-MM-DD') + ' - ' + picker.endDate.format('YYYY-MM-DD'));
        });
        $('#table thead .date-filter input').on('cancel.daterangepicker', function(ev, picker) {
            $(this).val('');
        });
      }
    }
  },
  filterSubmit:function(event) {
    var data = $('#table-filter').serializeArray();
    _.remove(data, function(n) {
      return n.name === 'table_length';
    });
    var columns = this.table.api().columns().context[0].aoColumns;
    for (var i = 0; i < columns.length; i++) {
      var column = columns[i];
      if(column.filter&&(column.filter.type==='input'||column.filter.type==='select')){
        column.sSearch = $('[name="'+column.name+'-filter"]').val();
      }
      if(column.filter&&column.filter.type==='range'){
        column.min = $('[name="'+column.name+'-filter-min"]').val();
        column.max = $('[name="'+column.name+'-filter-max"]').val();
      }
      if(column.filter&&column.filter.type==='date'){
        var dateranges = $('[name="'+column.name+'-filter-daterange"]').val().split(' ~ ');
        column.min = Number(moment(dateranges[0]).format('X'));
        column.max = Number(moment(dateranges[1]).format('X'))+86400;
      }
    }
    this.table.fnMultiFilter(Common.formFormat(data));
    return false;
  },
  filterReset:function(event){
    event.preventDefault();
    $('#table-filter')[0].reset();
    $('select.form-filter').selectpicker('render');
    this.filterSubmit();
  },
};