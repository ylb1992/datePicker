(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Datepicker"] = factory();
	else
		root["Datepicker"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Calendar = undefined;

var _classCallCheck2 = __webpack_require__(11);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(12);

var _createClass3 = _interopRequireDefault(_createClass2);

var _getMonthsStr = __webpack_require__(10);

var _substitute = __webpack_require__(3);

var _template = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function () {
    function DatePicker() {
        var opt = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        (0, _classCallCheck3.default)(this, DatePicker);

        this.opt = {
            date: opt.date || new Date(), // 日历的初始化日期
            count: opt.count || 2, // 日历个数，默认为2
            container: opt.container || null, // 放置日期的容器，非弹出式日历必填
            triggerNode: opt.triggerNode || '', // 弹出式日历 开始日期触发节点 必填，支持单日历
            finalTriggerNode: opt.finalTriggerNode || '' // 弹出式日期 结束日期触发节点
        };

        this._init();
    }

    (0, _createClass3.default)(DatePicker, [{
        key: '_init',
        value: function _init() {
            this._setUniqueId(); // 设置唯一标识
            this._renderUI();
        }
    }, {
        key: '_setUniqueId',
        value: function _setUniqueId() {
            var uniqueId = new Date().getTime().toString(); // 简单的取时间戳作为唯一ID
            this._datePickerId = 'datePicker-' + uniqueId;
            this._delegateClickClassName = 'delegate-click-' + uniqueId;
            this._triggerNodeClassName = 'trigger-node-' + uniqueId;
            return this;
        }
    }, {
        key: '_renderUI',
        value: function _renderUI() {
            var tmpObj = {};
            var datePickerStr = '';
            tmpObj['delegate_click'] = this._delegateClickClassName;
            tmpObj['bounding_box_id'] = this._datePickerId;
            tmpObj['date_template'] = (0, _getMonthsStr.getMonthsStr)(this.opt.count, this.opt.date);
            datePickerStr = (0, _substitute.substitute)(_template.TMP.calendarTmp, tmpObj);

            if (this.opt.container) {
                document.getElementById(this.opt.container).innerHTML += datePickerStr;
            } else {
                document.body.innerHTML += datePickerStr;
            }

            this.wrapEle = document.getElementById(this._datePickerId);
            console.log(this.wrapEle);

            // 渲染失败，直接退出
            if (!this.wrapEle) return;

            // 如果设置了container属性，则认为是静态日历，否则认为是弹出式日历
            if (!this.opt.container) {
                this.wrapEle.style.position = 'absolute';
                this.wrapEle.style.top = '-9999px';
                this._initTriggerNode();
            } else {
                this.wrapEle.style.position = 'relative';
            }
        }
    }, {
        key: '_initTriggerNode',
        value: function _initTriggerNode() {
            var triggerNode = document.getElementById(this.opt.triggerNode),
                // 开始日期的触发元素
            finalTriggerNode = document.getElementById(this.opt.finalTriggerNode); // 结束日期的触发元素,可以没有

            if (this._isInput(triggerNode)) {
                triggerNode.className += ' ' + this._triggerNodeClassName;
                triggerNode.setAttribute('autocomplete', 'off');
            }

            if (this._isInput(finalTriggerNode)) {
                finalTriggerNode.className += ' ' + this._triggerNodeClassName;
                finalTriggerNode.setAttribute('autocomplete', 'off');
            }
        }
    }, {
        key: '_isInput',
        value: function _isInput(v) {
            if (!v) {
                return false;
            }
            return v.tagName.toUpperCase() === 'INPUT' && (v.getAttribute('type') === 'text' || v.getAttribute('type') === 'date');
        }
    }]);
    return DatePicker;
}();

// datePicker();


exports.Calendar = DatePicker;
// module.exports = datePicker;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.substitute = substitute;
/**
 * Substitutes keywords in a string using an object/array.
 * Removes undefined keywords and ignores escaped keywords.
 *
 * @method substitute
 * @param {String} str template string
 * @param {Object} o json data
 * @param {RegExp} [regexp] to match a piece of template string
 */
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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var TMP = exports.TMP = {
    calendarTmp: "\n        <div id=\"{bounding_box_id}\" class=\"ui_datePicker\">\n            <div class=\"calendar-container\">\n                <div class=\"content-box\">\n                    <div class=\"arrow\">\n                        <span class=\"close-btn {delegate_click}\" title=\"\u5173\u95ED\">X</span>\n                        <span class=\"prev-year {delegate_click}\" title=\"\u4E0A\u4E00\u5E74\">&lt;&lt;</span>\n                        <span class=\"prev-month {delegate_click}\" title=\"\u4E0A\u6708\">&lt;</span>\n                        <span class=\"next-month {delegate_click}\" title=\"\u4E0B\u6708\">&gt;</span>\n                        <span class=\"next-year {delegate_click}\" title=\"\u4E0B\u4E00\u5E74\">&gt;&gt;</span>\n                    </div>\n                    <div class=\"date-box\">{date_template}</div>\n                </div>\n            </div>\n        </div>",
    weekHeadTmp: "<th class=\"{week_cls}\">{week_name}</th>",

    dayTmp: "\n        <td data-date=\"{date}\" class=\"dayItem j_dayItem {disabled}\">\n             <span class=\"{date_class}\" href=\"javascript:;\">{day}</span>\n            {dayDomStr}\n        </td>\n        ",

    bodyTmp: "<tr>{calday_row}</tr>",

    tableTmp: "\n            <table class=\"calendarTable\">\n                <thead>\n                    <tr>{head_template}</tr>\n                </thead>\n                <tbody>\n                    {body_template}\n                </tbody>\n            </table>\n            ",

    dateTmp: "\n            <div class=\"inner\">\n                <h4>{month}</h4>\n                {table_template}\n            </div>\n            "
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.filled = filled;
/**
 * 数字不足两位前面补0
 *
 * @method filled
 * @param  {Number} v 要补全的数字
 * @return {String} 补0后的字符串
 */
function filled(v) {
  return String(v).replace(/^(\d)$/, '0$1');
}

/***/ }),
/* 6 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(17)
  , IE8_DOM_DEFINE = __webpack_require__(22)
  , toPrimitive    = __webpack_require__(24)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(1) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMonthsStr = undefined;

var _template = __webpack_require__(4);

var _filled = __webpack_require__(5);

var _stringify = __webpack_require__(13);

var _substitute = __webpack_require__(3);

/**
 * 获取日历的dom字符串
 * @param count{Number} numbers of month
 * @param date{Date} init date
 *
 * @return tmp datePicker Dom str
 */
function getMonthsStr(count, date) {
    if (typeof count === 'undefined' || isNaN(parseInt(count)) || parseInt(count) > 10) {
        count = 1;
    }

    if (typeof date === 'undefined' || !(date instanceof Date)) {
        date = new Date();
    }

    var tmp = '';
    var iYear = date.getFullYear(),
        iMonth = date.getMonth();
    for (var i = 0; i < count; i++) {
        tmp += getCalendarBody(count, new Date(iYear, iMonth + i));
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

    for (var i = 1; i <= totalDays; i++) {
        daysArr.push(i);
    }

    daysArr.length = maxCell(count, date);

    rows = Math.ceil(daysArr.length / 7); // total rows

    for (var _i = 0; _i < rows; _i++) {
        var caldayRow = '';
        for (var j = 0; j <= 6; j++) {
            var days = daysArr[j + 7 * _i] || '';
            var thisDay = days ? cYear + '-' + (0, _filled.filled)(cMonth + 1) + '-' + (0, _filled.filled)(days) : '';
            caldayRow += (0, _substitute.substitute)(_template.TMP.dayTmp, {
                'day': days,
                'date': thisDay,
                'disabled': getDisableStatus(thisDay, date), // TODO 判断不可选择日期
                'date_class': getDateClass(thisDay)
                // 'dayDomStr': getDisableStatus(thisDay) === 'disabled' ? '' : getDaysStr(filled(days))
            });
        }
        bodyTmp += (0, _substitute.substitute)(_template.TMP.bodyTmp, {
            calday_row: caldayRow
        });
    }

    var tableTmp = {};
    tableTmp['head_template'] = getWeekHeadTmp();
    tableTmp['body_template'] = bodyTmp;

    //single Calendar object
    var singleCalendarTmp = {};

    singleCalendarTmp['table_template'] = (0, _substitute.substitute)(_template.TMP.tableTmp, tableTmp);
    singleCalendarTmp['month'] = cYear + '年' + (cMonth + 1) + '月';
    return (0, _substitute.substitute)(_template.TMP.dateTmp, singleCalendarTmp);
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
        weekHeadStr += (0, _substitute.substitute)(_template.TMP.weekHeadTmp, {
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

function getDateClass(v) {
    return v === (0, _stringify.stringify)(new Date()) ? 'today' : 'dayNum';
}

exports.getMonthsStr = getMonthsStr;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(14);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringify = stringify;

var _filled = __webpack_require__(5);

/**
 * 将日期对象转为日期字符串
 *
 * @method stringify
 * @param  {Date} v 日期对象
 * @return {String} 日期字符串
 */
function stringify(v) {
  return v.getFullYear() + '-' + (0, _filled.filled)(v.getMonth() * 1 + 1) + '-' + (0, _filled.filled)(v.getDate());
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(15), __esModule: true };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(25);
var $Object = __webpack_require__(6).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(16);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2)
  , document = __webpack_require__(8).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(8)
  , core      = __webpack_require__(6)
  , ctx       = __webpack_require__(18)
  , hide      = __webpack_require__(21)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(9)
  , createDesc = __webpack_require__(23);
module.exports = __webpack_require__(1) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(1) && !__webpack_require__(7)(function(){
  return Object.defineProperty(__webpack_require__(19)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(2);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(20);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(1), 'Object', {defineProperty: __webpack_require__(9).f});

/***/ })
/******/ ]);
});