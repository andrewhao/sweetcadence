/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var AccelerometerManager = require('accelerometerManager');
var WindowLayoutManager = require('windowLayoutManager');
var Accel = require('ui/accel');

var accelManager = new AccelerometerManager(accel);
var windowLayoutManager = new WindowLayoutManager(accelManager);
accel.init();
windowLayoutManager.init();
