'use strict';

module.exports = class Span {
	constructor(from, to) {
		this.from = Number(from);
		this.to = Number(to);
	}

	contains(date) {
		return this.from <= date && date <= this.to;
	}

	inside(date) {
		return this.from < date && date < this.to;
	}

	overlaps(span) {
		return this.to > Number(span.from) && this.from < Number(span.end);
	}

	intersection(span) {
		return (new Span(
			Math.min(this.from, span.from),
			Math.max(this.to, span.to)
		));
	}
};
