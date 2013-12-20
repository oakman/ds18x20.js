"use strict";

var test = require('tap').test,
	fs = require('fs'),
	path = require('path'),
	DeviceLister = require('../../lib/device-lister');

function getTester(t, testDirName, expectedResult) {

	var deviceLister = new DeviceLister(fs, path.resolve(__dirname, 'dirs', testDirName, 'w1_master_slaves'));

	t.test('... synchronous...', function (t) {

		var result = deviceLister.get();
		t.deepEqual(result, expectedResult, 'should return a list with the expected device name(s)');
		t.end();
	});
	t.test('... asynchronous...', function (t) {

		deviceLister.get(function (err, result) {

			t.notOk(err, 'should not error');
			t.deepEqual(result, expectedResult, 'should return a list with the expected device name(s)');
			t.end();
		});
	});
	t.end();
}

test('Getting no device names from directory...', function (t) {
	getTester(t, '0-devices', []);
});
test('Getting one device name from directory...', function (t) {
	getTester(t, '1-device', ['28-011111111111']);
});
test('Getting two device names from directory...', function (t) {
	getTester(t, '2-devices', ['28-011111111111', '28-022222222222']);
});
test('Getting five device names from directory...', function (t) {
	getTester(t, '6-devices', [
		'28-011111111111',
		'28-022222222222',
		'28-033333333333',
		'28-044444444444',
		'28-055555555555',
		'28-066666666666']);
});
