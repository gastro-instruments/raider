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

test('constructor', t => {
	const span = new Span(dates[0], dates[1]);

	t.truthy(span);
	t.is(span.from, dates[0]);
	t.is(span.to, dates[1]);
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

test('overlaps(span)', t => {
	const span = new Span(dates[1], dates[3]);

	t.is(span.overlaps(new Span(dates[0], dates[1])), false);
	t.is(span.overlaps(new Span(dates[0], dates[2])), true);
	t.is(span.overlaps(new Span(dates[0], dates[3])), true);
	t.is(span.overlaps(new Span(dates[0], dates[4])), true);

	t.is(span.overlaps(new Span(dates[1], dates[2])), true);
	t.is(span.overlaps(new Span(dates[1], dates[3])), true);
	t.is(span.overlaps(new Span(dates[1], dates[4])), true);

	t.is(span.overlaps(new Span(dates[2], dates[3])), true);
	t.is(span.overlaps(new Span(dates[2], dates[4])), true);

	t.is(span.overlaps(new Span(dates[3], dates[4])), false);
});

test('intersection(span)', t => {
	const span = new Span(dates[1], dates[3]);

	let result = span.intersection(new Span(dates[0], dates[2]));
	t.is(result.from, dates[0]);
	t.is(result.to, dates[3]);
});
