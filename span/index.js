'use strict';

module.exports = class Span {
	constructor(from, to) {
		this.from = from;
		this.to = to;
	}

	contains(date) {
		return (this.from <= date) && (date <= this.to);
	}

	inside(date) {
		return (this.from < date) && (date < this.to);
	}

	overlaps(span) {
		return (
			(this.from < span.from && span.from < this.to) ||
			(this.from < span.to && span.to < this.to) ||
			(span.from <= this.from && this.to <= span.to)
		);
	}

	intersection(span) {
		return (new Span(
			new Date(Math.min(this.from, span.from)),
			new Date(Math.max(this.to, span.to))
		));
	}
};
