const TMP = require('./template');
var filled = require('./dateTools/filled');
var substitute = require('./substitute');

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

	let tmp = '';

	for (let i = 0; i < count; i++) {
		tmp += getCalendarBody(count, date);
	}

	return tmp;
}

function getCalendarBody(count, date) {
	let bodyTmp = '',
		daysArr = [],
		cYear = date.getFullYear(),
		cMonth = date.getMonth(),
		rows = 0;

	let firstDays = new Date(cYear, cMonth, 1).getDay(), // 当月第一天是周几
		totalDays = new Date(cYear, cMonth + 1, 0).getDate(); // 当月一共多少天

	for (; firstDays--;) { // 日期数组中属于前一个月的日期用0占位
		daysArr.push(0);
	}

	for (let i = 0; i <= totalDays; i++) {
		daysArr.push(i);
	}

	daysArr.length = maxCell(count, date);

	rows = Math.ceil(daysArr.length / 7); // total rows

	for (let i = 0; i < rows; i++) {
		let caldayRow = '';
		for (let j = 0; j <= 6; j++) {
			let days = daysArr[j + 7 * i] || '';
			let thisDay = days ? cYear + '-' + filled(cMonth + 1) + '-' + filled(days) : '';
			caldayRow += substitute(TMP.dayTmp, {
				'day': days,
				'date': thisDay,
				'disabled': getDisableStatus(thisDay, date), // TODO 判断不可选择日期
				// 'dayDomStr': getDisableStatus(thisDay) === 'disabled' ? '' : getDaysStr(filled(days))
			});
		}
		bodyTmp += substitute(TMP.bodyTmp, {
			calday_row: caldayRow
		});
	}

	let tableTmp = {};
	tableTmp['head_template'] = getWeekHeadTmp();
	tableTmp['body_template'] = bodyTmp;

	//single Calendar object
	let singleCalendarTmp = {};

	singleCalendarTmp['table_template'] = substitute(TMP.tableTmp, tableTmp);
	return substitute(TMP.dateTmp, singleCalendarTmp);

}

function getDisableStatus(days) {
	let disabled = '';
	if (days === '') {
		disabled = 'disabled';
	} else {
		let today = new Date(),
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
	let weekHeadStr = '',
		weeks = [
		{name: '日', cls: 'weekDay sunday'},
		{name: '一', cls: 'weekDay'},
		{name: '二', cls: 'weekDay'},
		{name: '三', cls: 'weekDay'},
		{name: '四', cls: 'weekDay'},
		{name: '五', cls: 'weekDay'},
		{name: '六', cls: 'weekDay saturday'}
	];

	for (let i = 0; i < 7; i++) {
		weekHeadStr += substitute(TMP.weekHeadTmp, {
			week_name: weeks[i].name,
			week_cls: weeks[i].cls
		})
	}
	return weekHeadStr;
}

function maxCell(count, date) {
	let iYear = date.getFullYear(),
		iMonth = date.getMonth() + 1,
		aCell = [];

	for (let i = 0; i < count; i++) {
		aCell.push(new Date(iYear, iMonth - 1 + i, 1).getDay() + new Date(iYear, iMonth + i, 0).getDate());
	}

	return Math.max.apply(null, aCell);

}

module.exports = getCalendarStr;