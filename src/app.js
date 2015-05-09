/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var AccelerometerManager = require('accelerometerManager');
var WindowLayoutManager = require('windowLayoutManager');
var Accel = require('ui/accel');

var accelManager = new AccelerometerManager(Accel);
var windowLayoutManager = new WindowLayoutManager(accelManager);
accelManager.init();
windowLayoutManager.init();
