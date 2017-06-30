/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/static/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var TMP = __webpack_require__(4);
var filled = __webpack_require__(2);
var substitute = __webpack_require__(3);

/**
 * @param count{Number} numbers of month
 * @param date{Date} init date
 */

function getCalendarStr(count, date) {
	if (typeof count === 'undefined' || isNaN(parseInt(count)) || parseInt(count) > 10) {
		count = 1;
	}

	if (typeof date === 'undefined' || !(date instanceof Date)) {
		date = new Date();
	}

	var tmp = '';

	for (var i = 0; i < count; i++) {
		tmp += getCalendarBody(count, date);
	}

	return tmp;
}

function getCalendarBody(count, date) {
	var bodyTmp = '',
	    daysArr = [],
	    cYear = date.getFullYear(),
	    cMonth = date.getMonth(),
	    rows = 0;

	var firstDays = new Date(cYear, cMonth, 1).getDay(),
	    // 当月第一天是周几
	totalDays = new Date(cYear, cMonth + 1, 0).getDate(); // 当月一共多少天

	for (; firstDays--;) {
		// 日期数组中属于前一个月的日期用0占位
		daysArr.push(0);
	}

	for (var i = 0; i <= totalDays; i++) {
		daysArr.push(i);
	}

	daysArr.length = maxCell(count, date);

	rows = Math.ceil(daysArr.length / 7); // total rows

	for (var _i = 0; _i < rows; _i++) {
		var caldayRow = '';
		for (var j = 0; j <= 6; j++) {
			var days = daysArr[j + 7 * _i] || '';
			var thisDay = days ? cYear + '-' + filled(cMonth + 1) + '-' + filled(days) : '';
			caldayRow += substitute(TMP.dayTmp, {
				'day': days,
				'date': thisDay,
				'disabled': getDisableStatus(thisDay, date) // TODO 判断不可选择日期
				// 'dayDomStr': getDisableStatus(thisDay) === 'disabled' ? '' : getDaysStr(filled(days))
			});
		}
		bodyTmp += substitute(TMP.bodyTmp, {
			calday_row: caldayRow
		});
	}

	var tableTmp = {};
	tableTmp['head_template'] = getWeekHeadTmp();
	tableTmp['body_template'] = bodyTmp;

	//single Calendar object
	var singleCalendarTmp = {};

	singleCalendarTmp['table_template'] = substitute(TMP.tableTmp, tableTmp);
	return substitute(TMP.dateTmp, singleCalendarTmp);
}

function getDisableStatus(days) {
	var disabled = '';
	if (days === '') {
		disabled = 'disabled';
	} else {
		var today = new Date(),
		    todayStr = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate(),
		    thisDay = new Date(days);
		if (thisDay.getTime() < new Date(todayStr).getTime()) {
			disabled = 'disabled';
		}
	}

	return disabled;
}

// get week head template
function getWeekHeadTmp() {
	var weekHeadStr = '',
	    weeks = [{ name: '日', cls: 'weekDay sunday' }, { name: '一', cls: 'weekDay' }, { name: '二', cls: 'weekDay' }, { name: '三', cls: 'weekDay' }, { name: '四', cls: 'weekDay' }, { name: '五', cls: 'weekDay' }, { name: '六', cls: 'weekDay saturday' }];

	for (var i = 0; i < 7; i++) {
		weekHeadStr += substitute(TMP.weekHeadTmp, {
			week_name: weeks[i].name,
			week_cls: weeks[i].cls
		});
	}
	return weekHeadStr;
}

function maxCell(count, date) {
	var iYear = date.getFullYear(),
	    iMonth = date.getMonth() + 1,
	    aCell = [];

	for (var i = 0; i < count; i++) {
		aCell.push(new Date(iYear, iMonth - 1 + i, 1).getDay() + new Date(iYear, iMonth + i, 0).getDate());
	}

	return Math.max.apply(null, aCell);
}

module.exports = getCalendarStr;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getCalendarStr = __webpack_require__(0);

var mainEle = document.getElementById('main');
var today = new Date();

// console.log(getCalendarStr(1, new Date()));

mainEle.innerHTML = getCalendarStr(1, today);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function filled(v) {
	return String(v).replace(/^(\d)$/, '0$1');
}

module.exports = filled;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function substitute(str, o, regexp) {
	var substituteReg = /\\?\{([^{}]+)\}/g;
	if (typeof str !== 'string' || !o) {
		return str;
	}
	return str.replace(regexp || substituteReg, function (match, name) {
		if (match.charAt(0) === '\\') {
			return match.slice(1);
		}
		return o[name] === undefined ? '' : o[name];
	});
}

module.exports = substitute;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	weekHeadTmp: '<th class="{week_cls}">{week_name}</th>',

	dayTmp: '' + '<td data-date="{date}" class="dayItem j_dayItem {disabled}">' + '<a class="dayNum" href="javascript:;">{day}</a>' + '{dayDomStr}' + '</td>',

	bodyTmp: '<tr>{calday_row}</tr>',

	tableTmp: '' + '<table class="calendarTable">' + '<thead>' + '<tr>{head_template}</tr>' + '</thead>' + '<tbody>' + '{body_template}' + '</tbody>' + '</table>',

	dateTmp: '' + '<div class="tableWrap">' + '{table_template}' + '</div>'
};

/***/ })
/******/ ]);