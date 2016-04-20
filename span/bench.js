'use strict';
/* globals bench suite */
const moment = require('moment');
require('twix');
const Span = require('./');

suite('new Span', function () {
	const dateA = new Date(2010, 0, 1, 0, 0, 0, 0);
	const dateB = new Date(2010, 0, 1, 8, 0, 0, 0);

	bench('raider', function () {
		new Span(dateA, dateB);
	});

	bench('twix', function () {
		moment.twix(dateA, dateB);
	});
});

suite('contains', function () {
	const dateA = new Date(2010, 0, 2, 0, 0, 0, 0);
	const dateB = new Date(2010, 0, 2, 8, 0, 0, 0);
	const dateC = new Date(2010, 0, 2, 4, 0, 0, 0);
	const dateD = new Date(2010, 0, 1, 8, 0, 0, 0);
	const dateE = new Date(2010, 0, 3, 8, 0, 0, 0);

	const raiderSpan = new Span(dateA, dateB);
	const twixSpan = moment.twix(dateA, dateB);

	bench('raider - true', function () {
		raiderSpan.contains(dateC);
	});

	bench('raider - before', function () {
		raiderSpan.contains(dateD);
	});

	bench('raider - after', function () {
		raiderSpan.contains(dateE);
	});

	bench('twix - true', function () {
		twixSpan.contains(dateC);
	});

	bench('twix - before', function () {
		twixSpan.contains(dateD);
	});

	bench('twix - after', function () {
		twixSpan.contains(dateE);
	});
});

suite('overlaps', function () {
	const dateFrom = new Date(2010, 0, 2, 0, 0, 0, 0);
	const dateTo = new Date(2010, 0, 2, 8, 0, 0, 0);

	const dateA = new Date(2010, 0, 1, 0, 0, 0, 0);
	const dateB = new Date(2010, 0, 2, 4, 0, 0, 0);
	const dateC = new Date(2010, 0, 3, 0, 0, 0, 0);

	const raiderSpan = new Span(dateFrom, dateTo);
	const raiderIn = new Span(dateA, dateB);
	const raiderBefore = new Span(dateA, dateFrom);
	const raiderAfter = new Span(dateTo, dateC);

	const twixSpan = moment.twix(dateFrom, dateTo);
	const twixIn = moment.twix(dateA, dateB);
	const twixBefore = moment.twix(dateA, dateFrom);
	const twixAfter = moment.twix(dateTo, dateC);

	bench('raider - true', function () {
		raiderSpan.overlaps(raiderIn);
	});

	bench('raider - before', function () {
		raiderSpan.overlaps(raiderBefore);
	});

	bench('raider - after', function () {
		raiderSpan.overlaps(raiderAfter);
	});

	bench('twix - true', function () {
		twixSpan.overlaps(twixIn);
	});

	bench('twix - before', function () {
		twixSpan.overlaps(twixBefore);
	});

	bench('twix - after', function () {
		twixSpan.overlaps(twixAfter);
	});
});

suite('intersection', function () {
	const dateFrom = new Date(2010, 0, 2, 0, 0, 0, 0);
	const dateTo = new Date(2010, 0, 2, 8, 0, 0, 0);

	const dateA = new Date(2010, 0, 1, 0, 0, 0, 0);
	const dateB = new Date(2010, 0, 2, 4, 0, 0, 0);
	const dateC = new Date(2010, 0, 3, 0, 0, 0, 0);

	const raiderSpan = new Span(dateFrom, dateTo);
	const raiderIn = new Span(dateA, dateB);
	const raiderBefore = new Span(dateA, dateFrom);
	const raiderAfter = new Span(dateTo, dateC);

	const twixSpan = moment.twix(dateFrom, dateTo);
	const twixIn = moment.twix(dateA, dateB);
	const twixBefore = moment.twix(dateA, dateFrom);
	const twixAfter = moment.twix(dateTo, dateC);

	bench('raider - true', function () {
		raiderSpan.intersection(raiderIn);
	});

	bench('raider - before', function () {
		raiderSpan.intersection(raiderBefore);
	});

	bench('raider - after', function () {
		raiderSpan.intersection(raiderAfter);
	});

	bench('twix - true', function () {
		twixSpan.intersection(twixIn);
	});

	bench('twix - before', function () {
		twixSpan.intersection(twixBefore);
	});

	bench('twix - after', function () {
		twixSpan.intersection(twixAfter);
	});
});

suite('xor', function () {
	const dateFrom = new Date(2010, 0, 2, 0, 0, 0, 0);
	const dateTo = new Date(2010, 0, 2, 8, 0, 0, 0);

	const dates = [
		new Date(2010, 0, 1, 0, 0, 0, 0),
		new Date(2010, 0, 2, 2, 0, 0, 0),
		new Date(2010, 0, 2, 6, 0, 0, 0),
		new Date(2010, 0, 3, 0, 0, 0, 0),
		new Date(2010, 0, 3, 6, 0, 0, 0)
	]

	const raiderSpan = new Span(dateFrom, dateTo);
	const raiderIn = new Span(dates[1], dates[2]);
	const raiderOutside = new Span(dates[3], dates[4]);
	const raiderBefore = new Span(dates[0], dates[1]);
	const raiderAfter = new Span(dates[2], dates[3]);

	const twixSpan = moment.twix(dateFrom, dateTo);
	const twixIn = moment.twix(dates[1], dates[2]);
	const twixOutside = moment.twix(dates[3], dates[4]);
	const twixBefore = moment.twix(dates[0], dates[1]);
	const twixAfter = moment.twix(dates[2], dates[3]);

	bench('raider - engulfed', function () {
		raiderSpan.xor(raiderIn);
	});

	bench('raider - outside', function () {
		raiderSpan.xor(raiderOutside);
	});

	bench('raider - before', function () {
		raiderSpan.xor(raiderBefore);
	});

	bench('raider - after', function () {
		raiderSpan.xor(raiderAfter);
	});

	bench('twix - engulfed', function () {
		twixSpan.xor(twixIn);
	});

	bench('twix - outside', function () {
		twixSpan.xor(twixOutside);
	});

	bench('twix - before', function () {
		twixSpan.xor(twixBefore);
	});

	bench('twix - after', function () {
		twixSpan.xor(twixAfter);
	});
});

suite('getMinutes', function () {
	const date1 = new Date(2010, 0, 1, 0, 0, 0, 0);
	const date2 = new Date(2010, 0, 1, 1, 0, 0, 0);
	const date3 = new Date(2020, 0, 1, 0, 0, 0, 0);
	const raiderSmall = new Span(date1, date2);
	const raiderBig = new Span(date1, date3);
	const twixSmall = moment.twix(date1, date2);
	const twixBig = moment.twix(date1, date3);

	bench('raider - small', function () {
		raiderSmall.getMinutes();
	});

	bench('raider - big', function () {
		raiderBig.getMinutes();
	});

	bench('twix - small', function () {
		twixSmall.length('minutes');
	});

	bench('twix - big', function () {
		twixBig.length('minutes');
	});
});
