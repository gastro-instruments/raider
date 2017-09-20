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
		return this.to > span.from && this.from < span.to;
	}

	intersection(span) {
		return (new Span(
			Math.max(this.from, span.from),
			Math.min(this.to, span.to)
		));
	}

	toArray() {
		return [this.from, this.to];
	}

	xor(span) {
		const dates = this.toArray().concat(span.toArray()).sort((a, b) => a - b);
		const result = [];
		for (var i = 0; i < dates.length; i += 2) {
			result.push(new Span(dates[i], dates[i + 1]));
		}
		return result;
	}

	getMinutes() {
		return (this.to - this.from) / 60000;
	}

	length() {
		return this.to - this.from;
	}
};
