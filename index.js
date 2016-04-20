'use strict';

const Span = require('./span');

module.exports = {
	isSameDay,
	getMinutes,
	getWeekday,
	Span
};

function isSameDay(dateA, dateB) {
	return (dateA.getDate() === dateB.getDate()) &&
		(dateA.getMonth() === dateB.getMonth()) &&
		(dateA.getFullYear() === dateB.getFullYear());
}

function getMinutes(dateA, dateB) {
	return (dateB.getTime() - dateA.getTime()) / (60000);
}

function getWeekday(date) {
	return date.getDay();
}
