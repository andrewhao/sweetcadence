var StepDetector   = require('./quickCadence/stepDetector'),
    PowerConverter = require('./quickCadence/powerConverter'),
    CadenceCounter = require('./quickCadence/cadenceCounter'),
    inspect = require('./vendor/objectInspect');

var QuickCadence = {
  pipe: function(stream) {
    var power = PowerConverter.pipe(stream);
    power.onValue(function(v) { console.log(inspect(v)); });
    var steps = StepDetector.pipe(power);
    steps.onValue(function(v) { console.log(inspect(v)); });
    var cadence = CadenceCounter.pipe(steps);
    return cadence;
  }
};

module.exports = QuickCadence;
