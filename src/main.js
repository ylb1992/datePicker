import {getCalendarStr} from './getCalendarStr';

class DatePicker {
	constructor(opt = {}) {
		this.opt = {
			date: opt.date || new Date(), // 日历的初始化日期
			count: opt.count || 2, // 日历个数，默认为2
			container: opt.container || null, // 放置日期的容器，非弹出式日历必填
			triggerNode: opt.triggerNode || '', // 弹出式日历 开始日期触发节点 必填，支持单日历
			finalTriggerNode: opt.finalTriggerNode || '' // 弹出式日期 结束日期触发节点
		};

		this._init();
	}

	_init() {
		this._renderUI();
	}

	_renderUI() {
		// 如果设置了container属性，则认为是静态日历，否则认为是弹出式日历
		// let container = this.opt.container ? this.opt.container ? 'body';
		if(this.opt.container) {
			document.getElementById(this.opt.container).innerHTML += getCalendarStr(this.opt.count, this.opt.date);
		} else {
			document.body.innerHTML += getCalendarStr(this.opt.count, this.opt.date);
		}

	}
}

function datePicker() {
	return new DatePicker();
}

datePicker();
// export {datePicker}
// module.exports = datePicker;