'use strict';

const test = require('ava');
const Span = require('./');

const dates = [
	new Date(2010, 0, 1, 8, 0, 0, 0),
	new Date(2010, 0, 2, 0, 0, 0, 0),
	new Date(2010, 0, 3, 0, 0, 0, 0),
	new Date(2010, 0, 4, 0, 0, 0, 0),
	new Date(2010, 0, 4, 8, 0, 0, 0)
];

function thatDay(start, end) {
	return new Span(new Date("1982-05-25T" + start), new Date("1982-05-25T" + end));
}

function assertOverlap(first, second) {
	assertOverlapness(true).bind(this)(first, second);
}

function assertNoOverlap(first, second) {
	assertOverlapness(false).bind(this)(first, second);
}

function assertOverlapness(shouldOverlap) {
	return function (first, second) {
		this.is(shouldOverlap, first.overlaps(second));
		this.is(shouldOverlap, second.overlaps(first));
	};
}

test('constructor', t => {
	const span = new Span(dates[0], dates[1]);

	t.truthy(span);
	t.is(span.from, Number(dates[0]));
	t.is(span.to, Number(dates[1]));
});

test('contains(date)', t => {
	const span = new Span(dates[1], dates[3]);

	t.is(span.contains(dates[0]), false);
	t.is(span.contains(dates[1]), true);
	t.is(span.contains(dates[2]), true);
	t.is(span.contains(dates[3]), true);
	t.is(span.contains(dates[4]), false);
});

test('inside(date)', t => {
	const span = new Span(dates[1], dates[3]);

	t.is(span.inside(dates[0]), false);
	t.is(span.inside(dates[1]), false);
	t.is(span.inside(dates[2]), true);
	t.is(span.inside(dates[3]), false);
	t.is(span.inside(dates[4]), false);
});

test('returns false for a later range', t => {
	const someTime = thatDay('05:30', '08:30');
	assertNoOverlap.bind(t)(someTime, thatDay('09:30', '11:30'));
});

test('returns false for an earlier range', t => {
	const someTime = thatDay('05:30', '08:30');
	assertNoOverlap.bind(t)(someTime, thatDay('03:30', '04:30'));
});

test('returns true for a partially later range', t => {
	const someTime = thatDay('05:30', '08:30');
	assertOverlap.bind(t)(someTime, thatDay('08:00', '11:30'));
});

test('returns true for a partially earlier range', t => {
	const someTime = thatDay('05:30', '08:30');
	assertOverlap.bind(t)(someTime, thatDay('04:30', '06:30'));
});

test('returns true for an engulfed range', t => {
	const someTime = thatDay('05:30', '08:30');
	assertOverlap.bind(t)(someTime, thatDay('06:30', '07:30'));
});

test('returns true for an engulfing range', t => {
	const someTime = thatDay('05:30', '08:30');
	assertOverlap.bind(t)(someTime, thatDay('04:30', '09:30'));
});

test('returns false for a range that starts immediately afterwards', t => {
	const someTime = thatDay('05:30', '08:30');
	assertNoOverlap.bind(t)(someTime, thatDay('08:30', '09:30'));
});

test('returns false for a range that ends immediately before', t => {
	const someTime = thatDay('05:30', '08:30');
	assertNoOverlap.bind(t)(someTime, thatDay('04:30', '05:30'));
});

test('intersection(span) - not with later', t => {
	const someTime = thatDay('05:30', '08:30');
	const intersection = someTime.intersection(thatDay('09:30', '11:30'));
	t.deepEqual(intersection, thatDay('09:30', '08:30'));
	// t.is(intersection.isValid(), false);
});

test('intersection(span) - not with earlier', t => {
	const someTime = thatDay('05:30', '08:30');
	const intersection = someTime.intersection(thatDay('03:30', '04:30'));
	t.deepEqual(thatDay('05:30', '04:30'), intersection);
	// t.is(false, intersection.isValid());
});

test('intersection(span) - with partially later', t => {
	const someTime = thatDay('05:30', '08:30');
	t.deepEqual(thatDay('08:00', '08:30'), someTime.intersection(thatDay('08:00', '11:30')));
});

test('intersection(span) - with partially earlier', t => {
	const someTime = thatDay('05:30', '08:30');
	t.deepEqual(thatDay('05:30', '06:30'), someTime.intersection(thatDay('04:30', '06:30')));
});

test('intersection(span) - with engulfed', t => {
	const someTime = thatDay('05:30', '08:30');
	t.deepEqual(thatDay('06:30', '07:30'), someTime.intersection(thatDay('06:30', '07:30')));
});

test('intersection(span) - with engulfing', t => {
	const someTime = thatDay('05:30', '08:30');
	t.deepEqual(thatDay('05:30', '08:30'), someTime.intersection(thatDay('04:30', '09:30')));
});

test('intersection(span) - not with adjacent later', t => {
	const someTime = thatDay('05:30', '08:30');
	t.is(0, someTime.intersection(thatDay('08:30', '09:30')).length());
});

test('intersection(span) - not with adjacent earlier', t => {
	const someTime = thatDay('05:30', '08:30');
	t.is(0, someTime.intersection(thatDay('04:30', '05:30')).length());
});

test('intersection(span) - self for identical', t => {
	const someTime = thatDay('05:30', '08:30');
	t.deepEqual(someTime, someTime.intersection(someTime));
});

test('intersection(span) - self for time that starts same but ends later', t => {
	const someTime = thatDay('05:30', '08:30');
	t.deepEqual(someTime, someTime.intersection(thatDay('05:30', '09:30')));
});

test('xor - not overlapping', t => {
	let someTime = thatDay('05:30', '08:30');
	let later = thatDay('09:30', '11:30');
	let orred;

	orred = someTime.xor(later);
	t.is(orred.length, 2);
	t.deepEqual(someTime, orred[0]);
	t.deepEqual(later, orred[1]);

	orred = later.xor(someTime);
	t.is(orred.length, 2);
	t.deepEqual(someTime, orred[0]);
	t.deepEqual(later, orred[1]);
});

test('xor - overlapping', t => {
	let someTime = thatDay('05:30', '08:30');
	let orred;

	orred = someTime.xor(thatDay('08:00', '11:30'));
	t.is(2, orred.length);
	t.deepEqual(thatDay('05:30', '08:00'), orred[0]);
	t.deepEqual(thatDay('08:30', '11:30'), orred[1]);

	orred = thatDay('08:00', '11:30').xor(someTime);
	t.is(2, orred.length);
	t.deepEqual(thatDay('05:30', '08:00'), orred[0]);
	t.deepEqual(thatDay('08:30', '11:30'), orred[1]);
});

test('xor - engulfed', t => {
	let someTime = thatDay('05:30', '08:30');
	let orred;

	orred = someTime.xor(thatDay('06:30', '07:30'));
	t.is(2, orred.length);
	t.deepEqual(thatDay('05:30', '06:30'), orred[0]);
	t.deepEqual(thatDay('07:30', '08:30'), orred[1]);

	orred = thatDay('06:30', '07:30').xor(someTime);
	t.is(2, orred.length);
	t.deepEqual(thatDay('05:30', '06:30'), orred[0]);
	t.deepEqual(thatDay('07:30', '08:30'), orred[1]);
});

test('xor - compare the times correctly with small numbers', t => {
	const span1 = new Span(new Date(0), new Date(10));
	const span2 = new Span(new Date(5), new Date(20));
	let orred;

	orred = span1.xor(span2);
	t.is(2, orred.length);
	t.deepEqual(new Span(0, 5), orred[0]);
	t.deepEqual(new Span(10, 20), orred[1]);

	orred = span2.xor(span1);
	t.is(2, orred.length);
	t.deepEqual(new Span(0, 5), orred[0]);
	t.deepEqual(new Span(10, 20), orred[1]);
});

test('xor - compare the times correctly with negative numbers', t => {
	const span1 = new Span(new Date(-20), new Date(-5));
	const span2 = new Span(new Date(-10), new Date(20));
	let orred;

	orred = span1.xor(span2);
	t.is(2, orred.length);
	t.deepEqual(new Span(-20, -10), orred[0]);
	t.deepEqual(new Span(-5, 20), orred[1]);

	orred = span2.xor(span1);
	t.is(2, orred.length);
	t.deepEqual(new Span(-20, -10), orred[0]);
	t.deepEqual(new Span(-5, 20), orred[1]);
});

test('getMinutes', t => {
	let span = thatDay('06:30', '08:30');
	t.is(span.getMinutes(), 120);
});
