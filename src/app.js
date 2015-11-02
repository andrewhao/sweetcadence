/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var AccelerometerManager = require('accelerometerManager');
var AppController = require('appController');
var Accel = require('ui/accel');

var accelManager = new AccelerometerManager(Accel);
var appController = new AppController(accelManager);
accelManager.init();
appController.init();
