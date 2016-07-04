export formatTime = function(date, splitStr) {
  splitStr = splitStr || '-';
  var year = date.getFullYear();
  var _month = date.getMonth() + 1;
  var month = _month < 10 ? '0' + _month : _month;
  var _day = date.getDate();
  var day = _day < 10 ? '0' + _day : _day;
  return [year, month, day].join(splitStr);
}