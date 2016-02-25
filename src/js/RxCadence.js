"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.convertPower = convertPower;
exports.detectSteps = detectSteps;
exports.calculateCadence = calculateCadence;

var _rx = require("./vendor/rx.all");

var calculatePower = function calculatePower(d) {
  return parseInt(d.y, 10);
};
var DEBOUNCE_THRESHOLD = 200;
var CYCLE_SAMPLE_BUFFER_SIZE = 10;

function pipe(stream) {
  return calculateCadence(detectSteps(convertPower(stream)));
}

function convertPower(stream) {
  return stream.map(function (v) {
    return Object.assign(v, { power: calculatePower(v) });
  });
};

function detectSteps(stream) {
  return stream.pairwise().map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var e1 = _ref2[0];
    var e2 = _ref2[1];

    var powerDiff = e2.power - e1.power;
    var changeSignal = powerDiff > 0;
    return {
      "timestamp": e1.time,
      "diff": powerDiff,
      "changeSignal": changeSignal
    };
  }).pairwise().filter(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var e1 = _ref4[0];
    var e2 = _ref4[1];
    return e1.changeSignal !== e2.changeSignal;
  }).map(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2);

    var e1 = _ref6[0];
    var e2 = _ref6[1];
    return e2;
  }).pairwise().filter(function (_ref7) {
    var _ref8 = _slicedToArray(_ref7, 2);

    var e1 = _ref8[0];
    var e2 = _ref8[1];
    return e2.timestamp - e1.timestamp > DEBOUNCE_THRESHOLD;
  }).map(function (_ref9) {
    var _ref10 = _slicedToArray(_ref9, 2);

    var e1 = _ref10[0];
    var e2 = _ref10[1];
    return e2;
  });
};

function calculateCadence(stream) {
  return stream.map(function (v) {
    return v.timestamp;
  }).bufferWithCount(CYCLE_SAMPLE_BUFFER_SIZE, 1).map(function (times) {
    var t1 = times[0];
    var tlast = times[times.length - 1];
    // ms per event
    var msPerEvent = (tlast - t1) / times.length;
    // 2 "event"s, a min and a max, per period.
    var msPerPeriod = msPerEvent * 2;
    return msPerPeriod;
  }).map(function (duration) {
    // periods per ms
    var periodsPerMs = 1 / duration;
    // periods per minute
    return periodsPerMs * 1000 * 60;
  });
};

var RxCadence = {
  pipe: pipe,
  convertPower: convertPower,
  detectSteps: detectSteps,
  calculateCadence: calculateCadence
};

exports.default = RxCadence;

