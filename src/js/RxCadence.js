/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(28);


/***/ },

/***/ 1:
/***/ function(module, exports) {

	eval("// shim for using process in browser\n\nvar process = module.exports = {};\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = setTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    clearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        setTimeout(drainQueue, 0);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL34vcHJvY2Vzcy9icm93c2VyLmpzPzgyZTQiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG5cbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHNldFRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZHJhaW5RdWV1ZSwgMCk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9wcm9jZXNzL2Jyb3dzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },

/***/ 5:
/***/ function(module, exports, __webpack_require__) {


/***/ },

/***/ 14:
/***/ function(module, exports) {

	eval("module.exports = function(module) {\r\n\tif(!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tmodule.children = [];\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n}\r\n//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTQuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzP2MzYzIiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0bW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAyXG4gKiovIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

	eval("\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"]) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError(\"Invalid attempt to destructure non-iterable instance\"); } }; }();\n\nexports.convertPower = convertPower;\nexports.detectSteps = detectSteps;\nexports.calculateCadence = calculateCadence;\n\nvar _rx = __webpack_require__(5);\n\nvar calculatePower = function calculatePower(d) {\n  return parseInt(d.y, 10);\n};\nvar DEBOUNCE_THRESHOLD = 200;\nvar CYCLE_SAMPLE_BUFFER_SIZE = 10;\n\nfunction pipe(stream) {\n  return calculateCadence(detectSteps(convertPower(stream)));\n}\n\nfunction convertPower(stream) {\n  return stream.map(function (v) {\n    return Object.assign(v, { power: calculatePower(v) });\n  });\n};\n\nfunction detectSteps(stream) {\n  return stream.pairwise().map(function (_ref) {\n    var _ref2 = _slicedToArray(_ref, 2);\n\n    var e1 = _ref2[0];\n    var e2 = _ref2[1];\n\n    var powerDiff = e2.power - e1.power;\n    var changeSignal = powerDiff > 0;\n    return {\n      \"timestamp\": e1.time,\n      \"diff\": powerDiff,\n      \"changeSignal\": changeSignal\n    };\n  }).pairwise().filter(function (_ref3) {\n    var _ref4 = _slicedToArray(_ref3, 2);\n\n    var e1 = _ref4[0];\n    var e2 = _ref4[1];\n    return e1.changeSignal !== e2.changeSignal;\n  }).map(function (_ref5) {\n    var _ref6 = _slicedToArray(_ref5, 2);\n\n    var e1 = _ref6[0];\n    var e2 = _ref6[1];\n    return e2;\n  }).pairwise().filter(function (_ref7) {\n    var _ref8 = _slicedToArray(_ref7, 2);\n\n    var e1 = _ref8[0];\n    var e2 = _ref8[1];\n    return e2.timestamp - e1.timestamp > DEBOUNCE_THRESHOLD;\n  }).map(function (_ref9) {\n    var _ref10 = _slicedToArray(_ref9, 2);\n\n    var e1 = _ref10[0];\n    var e2 = _ref10[1];\n    return e2;\n  });\n};\n\nfunction calculateCadence(stream) {\n  return stream.map(function (v) {\n    return v.timestamp;\n  }).bufferWithCount(CYCLE_SAMPLE_BUFFER_SIZE, 1).map(function (times) {\n    var t1 = times[0];\n    var tlast = times[times.length - 1];\n    // ms per event\n    var msPerEvent = (tlast - t1) / times.length;\n    // 2 \"event\"s, a min and a max, per period.\n    var msPerPeriod = msPerEvent * 2;\n    return msPerPeriod;\n  }).map(function (duration) {\n    // periods per ms\n    var periodsPerMs = 1 / duration;\n    // periods per minute\n    return periodsPerMs * 1000 * 60;\n  });\n};\n\nvar RxCadence = {\n  pipe: pipe,\n  convertPower: convertPower,\n  detectSteps: detectSteps,\n  calculateCadence: calculateCadence\n};\n\nexports.default = RxCadence;//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMjguanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vbGliL1J4Q2FkZW5jZS5qcz82M2JlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeCc7XG5cbmNvbnN0IGNhbGN1bGF0ZVBvd2VyID0gKGQpID0+IHBhcnNlSW50KGQueSwgMTApXG5jb25zdCBERUJPVU5DRV9USFJFU0hPTEQgPSAyMDA7XG5jb25zdCBDWUNMRV9TQU1QTEVfQlVGRkVSX1NJWkUgPSAxMFxuXG5mdW5jdGlvbiBwaXBlKHN0cmVhbSkge1xuICByZXR1cm4gY2FsY3VsYXRlQ2FkZW5jZShcbiAgICBkZXRlY3RTdGVwcyhcbiAgICAgIGNvbnZlcnRQb3dlcihzdHJlYW0pXG4gICAgKVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0UG93ZXIoc3RyZWFtKSB7XG4gIHJldHVybiBzdHJlYW1cbiAgLm1hcCgodikgPT4gT2JqZWN0LmFzc2lnbih2LCB7IHBvd2VyOiBjYWxjdWxhdGVQb3dlcih2KSB9KSlcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBkZXRlY3RTdGVwcyhzdHJlYW0pIHtcbiAgcmV0dXJuIHN0cmVhbVxuICAucGFpcndpc2UoKVxuICAubWFwKChbZTEsIGUyXSkgPT4ge1xuICAgIGxldCBwb3dlckRpZmYgPSBlMi5wb3dlciAtIGUxLnBvd2VyO1xuICAgIGxldCBjaGFuZ2VTaWduYWwgPSBwb3dlckRpZmYgPiAwO1xuICAgIHJldHVybiB7XG4gICAgICBcInRpbWVzdGFtcFwiOiBlMS50aW1lLFxuICAgICAgXCJkaWZmXCI6IHBvd2VyRGlmZixcbiAgICAgIFwiY2hhbmdlU2lnbmFsXCI6IGNoYW5nZVNpZ25hbFxuICAgIH1cbiAgfSlcbiAgLnBhaXJ3aXNlKClcbiAgLmZpbHRlcigoW2UxLCBlMl0pID0+IGUxLmNoYW5nZVNpZ25hbCAhPT0gZTIuY2hhbmdlU2lnbmFsKVxuICAubWFwKChbZTEsIGUyXSkgPT4gZTIpXG4gIC5wYWlyd2lzZSgpXG4gIC5maWx0ZXIoKFtlMSwgZTJdKSA9PiBlMi50aW1lc3RhbXAgLSBlMS50aW1lc3RhbXAgPiBERUJPVU5DRV9USFJFU0hPTEQpXG4gIC5tYXAoKFtlMSwgZTJdKSA9PiBlMilcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVDYWRlbmNlKHN0cmVhbSkge1xuICByZXR1cm4gc3RyZWFtXG4gIC5tYXAodiA9PiB2LnRpbWVzdGFtcClcbiAgLmJ1ZmZlcldpdGhDb3VudChDWUNMRV9TQU1QTEVfQlVGRkVSX1NJWkUsIDEpXG4gIC5tYXAoKHRpbWVzKSA9PiB7XG4gICAgbGV0IHQxID0gdGltZXNbMF1cbiAgICBsZXQgdGxhc3QgPSB0aW1lc1t0aW1lcy5sZW5ndGggLSAxXVxuICAgIC8vIG1zIHBlciBldmVudFxuICAgIGxldCBtc1BlckV2ZW50ID0gKHRsYXN0IC0gdDEpIC8gdGltZXMubGVuZ3RoXG4gICAgLy8gMiBcImV2ZW50XCJzLCBhIG1pbiBhbmQgYSBtYXgsIHBlciBwZXJpb2QuXG4gICAgbGV0IG1zUGVyUGVyaW9kID0gbXNQZXJFdmVudCAqIDJcbiAgICByZXR1cm4gbXNQZXJQZXJpb2Q7XG4gIH0pXG4gIC5tYXAoKGR1cmF0aW9uKSA9PiB7XG4gICAgLy8gcGVyaW9kcyBwZXIgbXNcbiAgICB2YXIgcGVyaW9kc1Blck1zID0gMSAvIGR1cmF0aW9uXG4gICAgLy8gcGVyaW9kcyBwZXIgbWludXRlXG4gICAgcmV0dXJuIHBlcmlvZHNQZXJNcyAqIDEwMDAgKiA2MFxuICB9KVxufTtcblxuY29uc3QgUnhDYWRlbmNlID0ge1xuICBwaXBlLFxuICBjb252ZXJ0UG93ZXIsXG4gIGRldGVjdFN0ZXBzLFxuICBjYWxjdWxhdGVDYWRlbmNlLFxufVxuXG5leHBvcnQgZGVmYXVsdCBSeENhZGVuY2U7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBsaWIvUnhDYWRlbmNlLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWNBO0FBS0E7QUFvQkE7QUFDQTs7O0FBdENBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQUE7QUFGQTtBQUNBO0FBSUE7QUFDQTs7O0FBRUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFIQTs7O0FBVUE7QUFBQTtBQUFBO0FBQUE7OztBQUNBO0FBQUE7QUFBQTtBQUFBOzs7QUFFQTtBQUFBO0FBQUE7QUFBQTs7O0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFqQkE7QUFDQTtBQW1CQTtBQUNBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7O0FBRkE7O0FBQUE7QUFPQTtBQVBBOztBQVdBOztBQUZBO0FBQUE7QUFiQTtBQUNBO0FBb0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQUNBO0FBTUEiLCJzb3VyY2VSb290IjoiIn0=");

/***/ }

/******/ });