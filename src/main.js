import {getCalendarStr} from './getCalendarStr';

var mainEle = document.getElementById('main');
var today = new Date();

mainEle.innerHTML = getCalendarStr(2,today);