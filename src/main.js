import {getMonthsStr} from './getMonthsStr';
import {substitute} from './substitute';
import {TMP} from './template';
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
        this._setUniqueId(); // 设置唯一标识
        this._renderUI();
    }

    _setUniqueId() {
        const uniqueId = new Date().getTime().toString(); // 简单的取时间戳作为唯一ID
        this._datePickerId = `datePicker-${uniqueId}`;
        this._delegateClickClassName = `delegate-click-${uniqueId}`;
        this._triggerNodeClassName = `trigger-node-${uniqueId}`; 
        return this;
    }

    _renderUI() {
        const tmpObj = {};
        let datePickerStr = '';
        tmpObj['delegate_click'] = this._delegateClickClassName;
        tmpObj['bounding_box_id'] = this._datePickerId;
        tmpObj['date_template'] = getMonthsStr(this.opt.count, this.opt.date);
        datePickerStr = substitute(TMP.calendarTmp, tmpObj);

        if(this.opt.container) {
            document.getElementById(this.opt.container).innerHTML += datePickerStr;
        } else {
            document.body.innerHTML += datePickerStr;
        }

        this.wrapEle = document.getElementById(this._datePickerId);
        console.log(this.wrapEle);

        // 渲染失败，直接退出
        if(!this.wrapEle) return;

        // 如果设置了container属性，则认为是静态日历，否则认为是弹出式日历
        if(!this.opt.container) {
            this.wrapEle.style.position = 'absolute';
            this.wrapEle.style.top = '-9999px';
            this._initTriggerNode();
        } else {
            this.wrapEle.style.position = 'relative';
        }

    }

    _initTriggerNode() {
        const triggerNode = document.getElementById(this.opt.triggerNode), // 开始日期的触发元素
              finalTriggerNode = document.getElementById(this.opt.finalTriggerNode); // 结束日期的触发元素,可以没有

        if(this._isInput(triggerNode)) {
            triggerNode.className += ' ' + this._triggerNodeClassName;
            triggerNode.setAttribute('autocomplete', 'off');
        }

        if(this._isInput(finalTriggerNode)) {
            finalTriggerNode.className += ' ' + this._triggerNodeClassName;
            finalTriggerNode.setAttribute('autocomplete', 'off');
        }
    }

    _isInput(v) {
        if(!v) {
            return false
        }
        return v.tagName.toUpperCase() === 'INPUT' && (v.getAttribute('type') === 'text' || v.getAttribute('type') === 'date');
    }
}

// datePicker();
export { DatePicker as Calendar }
// module.exports = datePicker;