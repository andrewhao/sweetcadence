/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var AccelerometerManager = require('accelerometerManager');
var WindowLayoutManager = require('windowLayoutManager');
AccelerometerManager.init();
WindowLayoutManager.init(AccelerometerManager);