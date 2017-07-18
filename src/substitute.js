/**
 * Substitutes keywords in a string using an object/array.
 * Removes undefined keywords and ignores escaped keywords.
 *
 * @method substitute
 * @param {String} str template string
 * @param {Object} o json data
 * @param {RegExp} [regexp] to match a piece of template string
 */
export function substitute(str, o, regexp) {
    var substituteReg = /\\?\{([^{}]+)\}/g;
    if (typeof str !== 'string' || !o) {
        return str;
    }
    return str.replace(regexp || substituteReg, function(match, name) {
        if (match.charAt(0) === '\\') {
            return match.slice(1);
        }
        return (o[name] === undefined) ? '' : o[name];
    });
}