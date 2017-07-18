import {filled} from './filled.js';

/**
 * 将日期对象转为日期字符串
 *
 * @method stringify
 * @param  {Date} v 日期对象
 * @return {String} 日期字符串
 */
export function stringify(v) {
    return v.getFullYear() + '-' + filled(v.getMonth() * 1 + 1) + '-' + filled(v.getDate());
}