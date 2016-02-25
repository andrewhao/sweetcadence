/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var AccelerometerManager = require('accelerometerManager');
var AppController = require('appController');
var DummyAppController = require('dummyAppController');
var Accel = require('ui/accel');

var accelManager = new AccelerometerManager(Accel);
var appController = new AppController(accelManager);
//var appController = new DummyAppController(accelManager);
accelManager.init();
appController.init();
