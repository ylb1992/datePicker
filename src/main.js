var getCalendarStr = require('./getCalendarStr');

var mainEle = document.getElementById('main');
var today = new Date();

// console.log(getCalendarStr(1, new Date()));

mainEle.innerHTML = getCalendarStr(1,today);