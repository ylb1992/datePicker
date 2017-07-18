export const TMP = {
	calendarTmp: `
		<div id="{bounding_box_id}" class="ui_datePicker">
			<div class="calendar-container">
				<div class="content-box">
					<div class="arrow">
						<span class="close-btn {delegate_click}" title="关闭">X</span>
						<span class="prev-year {delegate_click}" title="上一年">&lt;&lt;</span>
						<span class="prev-month {delegate_click}" title="上月">&lt;</span>
						<span class="next-month {delegate_click}" title="下月">&gt;</span>
						<span class="next-year {delegate_click}" title="下一年">&gt;&gt;</span>
					</div>
					<div class="date-box">{date_template}</div>
				</div>
			</div>
		</div>`,
	weekHeadTmp: `<th class="{week_cls}">{week_name}</th>`,

	dayTmp: `
		<td data-date="{date}" class="dayItem j_dayItem {disabled}">
			 <span class="{date_class}" href="javascript:;">{day}</span>
			{dayDomStr}
		</td>
		`,

	bodyTmp: `<tr>{calday_row}</tr>`,

	tableTmp: `
			<table class="calendarTable">
				<thead>
					<tr>{head_template}</tr>
				</thead>
				<tbody>
					{body_template}
				</tbody>
			</table>
			`,

	dateTmp: `
			<div class="inner">
				<h4>{month}</h4>
				{table_template}
			</div>
			`
}