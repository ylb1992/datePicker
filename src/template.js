export var TMP = {
	weekHeadTmp: '<th class="{week_cls}">{week_name}</th>',
		
		dayTmp: '' +
			'<td data-date="{date}" class="dayItem j_dayItem {disabled}">' +
				'<a class="dayNum" href="javascript:;">{day}</a>' +
				'{dayDomStr}' +
			'</td>',
		
		bodyTmp: '<tr>{calday_row}</tr>',

		tableTmp: '' +
			'<table class="calendarTable">' +
				'<thead>' +
					'<tr>{head_template}</tr>' +
				'</thead>' +
				'<tbody>' +
					'{body_template}' +
				'</tbody>' +
			'</table>',

		dateTmp: '' +
			'<div class="tableWrap">' +
				'{table_template}' +
			'</div>',
}

// export {TMP};