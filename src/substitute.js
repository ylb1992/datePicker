function substitute(str, o, regexp) {
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

module.exports = substitute;