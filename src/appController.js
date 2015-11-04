var UI = require('ui'),
    Vector2 = require('vector2'),
    Bacon = require('./js/vendor/bacon.js'),
    inspect = require('./js/vendor/objectInspect');

// Detection state
STARTED = 0;
PAUSED  = 1;
STOPPED = 2;

// UI events
CARD_HIDDEN = 0;
CARD_ENTERED = 1;
CARD_SELECTED = 2;

var AppController = function(accelManager) {
  this.accelManager = accelManager;
};

AppController.prototype = {
  init: function() {
    var self = this;

    var mainCard = new UI.Card({
      title: 'Sweetcadence',
      icon: 'images/menu_icon.png',
      subtitle: 'Click select to start recording',
    });

    var recordingCard = new UI.Card();
    mainCard.show();

    /**
     * Streams
     */

    var recordingCardHideStream = Bacon.fromEvent(recordingCard, 'hide');

    var recordingCardSelectStream = Bacon.fromBinder(function(sink) {
      recordingCard.on('click', 'select', function(e) { sink(e); } );
    });

    var mainCardSelectStream = Bacon.fromBinder(function(sink) {
      mainCard.on('click', 'select', function(e) { sink(e); } );
    });

    var recordingCardDidEnter = mainCardSelectStream
      .map(function() { return CARD_ENTERED; });

    var recordingCardDidHide = recordingCardHideStream
      .map(function() { return CARD_HIDDEN; });

    var recordingCardDidSelect = recordingCardSelectStream
      .map(function() { return CARD_SELECTED; });

    // Given no knowledge of prior state, the default state to transition
    // to from given event.
    var stateMap = {
      CARD_SELECTED: STARTED,
      CARD_ENTERED: STARTED,
      CARD_HIDDEN: STOPPED
    };

    var recordingState = recordingCardDidEnter
      .merge(recordingCardDidHide)
      .merge(recordingCardDidSelect)
      .scan(STOPPED, function(currentState, event) {
        if (currentState === STARTED &&
            event === CARD_SELECTED) {
          return PAUSED;
        } else {
          return stateMap[event];
        }
      });

    var stopRecordingStream = recordingState.filter(function(v) { return v === STOPPED; });
    var startRecordingStream = recordingState.filter(function(v) { return v === STARTED; });
    var pauseRecordingStream = recordingState.filter(function(v) { return v === PAUSED; });

    /**
     * Behaviors/side-effects
     */

    recordingState.onValue(function(v) { console.log("recording state:", v); });

    pauseRecordingStream.onValue(function(v) {
      console.log("recording card: paused") ;
      recordingCard.title('Paused Recording');
      self.accelManager.stopRecording();
    });

    recordingCardSelectStream.onValue(function(e) {
      console.log("recording card: clicked select");
    });

    // Side effect of clicking back is to stop listening to accelerometer events.
    stopRecordingStream.onValue(function() {
      console.log("recording card: hiding");
      mainCard.subtitle("Recording stopped.");
      self.accelManager.stopRecording();
    });

    // Side effect of clicking select on the main card is to begin listening to the accelerometer.
    startRecordingStream.onValue(function(e) {
      console.log("main card: clicked select");
      recordingCard.title('Started Recording');
      recordingCard.show();
      self.accelManager.startRecording();
      self.accelManager.onCadenceValue(function(cadenceValue) {
        recordingCard.subtitle(cadenceValue);
      });
    });
  }
};

module.exports = AppController;
