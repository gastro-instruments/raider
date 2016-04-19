'use strict';

const test = require('ava');
const raider = require('./');

test('isSameDay', t => {
	const date1 = new Date(2010, 0, 2, 0, 0, 0, 0);
	const date2 = new Date(2010, 0, 2, 2, 0, 0, 0);
	const date3 = new Date(2010, 0, 3, 2, 0, 0, 0);
	const date4 = new Date(2010, 0, 1, 23, 59, 59, 59);

	t.is(raider.isSameDay(date1, date2), true);
	t.is(raider.isSameDay(date1, date3), false);
	t.is(raider.isSameDay(date1, date4), false);
});

test('getMinutes', t => {
	const date1 = new Date(2010, 0, 0, 0, 0, 0, 0);
	const date2 = new Date(2010, 0, 0, 0, 1, 0, 0);
	const date3 = new Date(2010, 0, 0, 1, 0, 0, 0);

	t.is(raider.getMinutes(date1, date2), 1);
	t.is(raider.getMinutes(date1, date3), 60);
});

test('getWeekday', t => {
	const days = [
		new Date(2016, 3, 10, 1, 0, 0, 0), // sunday = 0
		new Date(2016, 3, 11, 1, 0, 0, 0), // monday = 1
		new Date(2016, 3, 12, 1, 0, 0, 0), // ...
		new Date(2016, 3, 13, 1, 0, 0, 0),
		new Date(2016, 3, 14, 1, 0, 0, 0),
		new Date(2016, 3, 15, 1, 0, 0, 0),
		new Date(2016, 3, 16, 1, 0, 0, 0)
	];

	days.forEach((date, i) => {
		t.is(raider.getWeekday(date), i);
	});
});
