'use strict';
/* globals bench suite */
const moment = require('moment');
require('twix');
const raider = require('./');

suite('isSameDay', function () {
	const date1 = new Date(2010, 0, 1, 0, 0, 0, 0);
	const date2 = new Date(2010, 0, 1, 23, 59, 59, 59);
	const date3 = new Date(2010, 0, 2, 0, 0, 0, 0);
	const date4 = new Date(2010, 1, 1, 0, 0, 0, 0);
	const date5 = new Date(2011, 0, 1, 0, 0, 0, 0);
	const momentDate = moment(date1);
	const twixSame = moment.twix(date1, date2);
	const twixDay = moment.twix(date1, date3);
	const twixMonth = moment.twix(date1, date4);
	const twixYear = moment.twix(date1, date5);

	bench('raider - same', function () {
		raider.isSameDay(date1, date2);
	});

	bench('raider - different day', function () {
		raider.isSameDay(date1, date3);
	});

	bench('raider - different month', function () {
		raider.isSameDay(date1, date4);
	});

	bench('raider - different year', function () {
		raider.isSameDay(date1, date5);
	});

	bench('moment - same', function () {
		momentDate.isSame(date2, 'day');
	});

	bench('moment - different day', function () {
		momentDate.isSame(date3, 'day');
	});

	bench('moment - different month', function () {
		momentDate.isSame(date4, 'day');
	});

	bench('moment - different year', function () {
		momentDate.isSame(date5, 'day');
	});

	bench('twix - same', function () {
		twixSame.isSame('day');
	});

	bench('twix - different day', function () {
		twixDay.isSame('day');
	});

	bench('twix - different month', function () {
		twixMonth.isSame('day');
	});

	bench('twix - different year', function () {
		twixYear.isSame('day');
	});
});

suite('getMinutes', function () {
	const date1 = new Date(2010, 0, 1, 0, 0, 0, 0);
	const date2 = new Date(2010, 0, 1, 1, 0, 0, 0);
	const date3 = new Date(2020, 0, 1, 0, 0, 0, 0);
	const twixSmall = moment.twix(date1, date2);
	const twixBig = moment.twix(date1, date3);

	bench('raider - small', function () {
		raider.getMinutes(date1, date2);
	});

	bench('raider - big', function () {
		raider.getMinutes(date1, date3);
	});

	bench('twix - small', function () {
		twixSmall.countInner('minutes');
	});

	bench('twix - big', function () {
		twixBig.countInner('minutes');
	});
});

suite('getWeekday', function () {
	const date = new Date(2010, 0, 1, 0, 0, 0, 0);
	const mom = moment(date);

	bench('native', function () {
		date.getDay();
	});

	bench('raider', function () {
		raider.getWeekday(date);
	});

	bench('moment - prepared', function () {
		mom.day();
	});

	bench('moment - unprepared', function () {
		moment(date).day();
	});
});
