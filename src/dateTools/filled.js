/**
 * 数字不足两位前面补0
 *
 * @method filled
 * @param  {Number} v 要补全的数字
 * @return {String} 补0后的字符串
 */
export function filled(v) {
	return String(v).replace(/^(\d)$/, '0$1');
}