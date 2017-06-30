function filled(v) {
	return String(v).replace(/^(\d)$/, '0$1');
}

module.exports = filled;