module.exports = {
  treeFormat: function(list, key, parentKey, childKey) {
    var sNodes = _.cloneDeep(list);
    var i, j, k, l, len, len1, r, tmpMap;
    if (!key) {
      key = "id";
    }
    if (!parentKey) {
      parentKey = "pid";
    }
    if (!childKey) {
      childKey = "children";
    }
    if (_.isArray(sNodes)) {
      r = [];
      tmpMap = [];
      for (k = 0, len = sNodes.length; k < len; k++) {
        i = sNodes[k];
        tmpMap[i[key]] = i;
      }
      for (l = 0, len1 = sNodes.length; l < len1; l++) {
        j = sNodes[l];
        if (tmpMap[j[parentKey]] && j[key] !== j[parentKey]) {
          if (!tmpMap[j[parentKey]][childKey]) {
            tmpMap[j[parentKey]][childKey] = [];
          }
          tmpMap[j[parentKey]][childKey].push(j);
        } else {
          r.push(j);
        }
      }
      return r;
    } else {
      return [sNodes];
    }
  },
  bpsFormat: function(number,k,unit) {
    if (number === 0) return '0'+unit;
    var sizes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'],
        i = Math.floor(Math.log(number) / Math.log(k));
    return (number / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]+unit;
  },
  uniCheckbox: function(checkboxes) {
    if (checkboxes.size() > 0) {
      return checkboxes.each(function() {
        if ($(this).parents(".checker").size() === 0) {
          $(this).show();
          return $(this).uniform();
        }
      });
    }
  },
  checkGroup: function(el) {
    var checked, set;
    set = el.attr("data-set");
    checked = el.is(":checked");
    console.log(checked);
    $(set).each(function() {
      if (checked) {
        return $(this).prop("checked", true);
      } else {
        return $(this).prop("checked", false);
      }
    });
    return $.uniform.update(set);
  },
  formFormat: function(data) {
    var result;
    result = {};
    _.each(data, function(item) {
      return result[item.name] = item.value;
    });
    if (result.loginPasswd) {
      result.loginPasswd = $.sha256(result.loginPasswd).toUpperCase();
    }
    return result;
  },
  // url:'https://192.168.20.34/cgi-php/core.php'
  url:'http://localhost:1337/'
}