var UI = require('ui'),
    Vector2 = require('vector2'),
    Bacon = require('./js/vendor/bacon.js'),
    inspect = require('./js/vendor/objectInspect');

SPLASH_SCREEN_DELAY = 1000;

// Detection state
STARTED = 'STARTED';
PAUSED  = 'PAUSED';
STOPPED = 'STOPPED';

// UI events
CARD_HIDDEN = 'CARD_HIDDEN';
CARD_ENTERED = 'CARD_ENTERED';
CARD_SELECTED = 'CARD_SELECTED';

// Other app events
APP_LAUNCHED = 'APP_LAUNCHED';

var AppController = function(accelManager) {
  this.accelManager = accelManager;
};

AppController.prototype = {
  init: function() {
    var self = this;
    
    // Given no knowledge of prior state, the default state to transition
    // to from given event.
    var stateMap = {
      CARD_SELECTED: STARTED,
      CARD_ENTERED: STARTED,
      CARD_HIDDEN: STOPPED,
      APP_LAUNCHED: STARTED
    };

    /**
     * Models
     */
    var splashCard = new UI.Card({
      banner: 'images/splash.png',
      fullscreen: true
    });
    var recordingCard = new UI.Window({
      backgroundColor: 'black'
    });
    var circle = new UI.Circle({
      position: new Vector2(72, 72),
      radius: 50,
      backgroundColor: 'white',
    });
    recordingCard.add(circle);
    
    var cadenceText = new UI.Text({
      text: "--",
      color: 'black',
      textAlign: 'center',
      font: "Bitham 42 Medium Numbers",
      position: new Vector2(0, 50),
      size: new Vector2(144, 42)
    });
    recordingCard.add(cadenceText);
    
    var playImage = new UI.Image({
      image: 'images/play.png',
      position: new Vector2(109, 120),
      size: new Vector2(25, 28)
    });
    playImage.compositing("normal");
    
    var pauseImage = new UI.Image({
      image: 'images/pause.png',
      position: new Vector2(114, 121),
      size: new Vector2(20, 27)
    });
    pauseImage.compositing("normal");

    /**
     * Set up, initialize input streams
     */
    var appLaunchStream = Bacon.later(SPLASH_SCREEN_DELAY, APP_LAUNCHED);
    var cadenceStream = this.accelManager.getCadenceStream();
    var recordingCardHideStream = Bacon.fromEvent(recordingCard, 'hide');
    var recordingCardSelectStream = Bacon.fromBinder(function(sink) {
      recordingCard.on('click', 'select', function(e) { sink(e); } );
    });
    var splashCardSelectStream = Bacon.fromBinder(function(sink) {
      splashCard.on('click', 'select', function(e) { sink(e); } );
    });

    var recordingCardDidEnter = splashCardSelectStream
      .map(function() { return CARD_ENTERED; });
    var recordingCardDidHide = recordingCardHideStream
      .map(function() { return CARD_HIDDEN; });
    var recordingCardDidSelect = recordingCardSelectStream
      .map(function() { return CARD_SELECTED; });
    
    /**
     * Merge inputs to update state
     */
    var sensorEventStream = recordingCardDidEnter
      .merge(recordingCardDidHide)
      .merge(recordingCardDidSelect)
      .merge(appLaunchStream)
   
    /**
     * Update state of app
     */
    var appState = sensorEventStream
      .scan(STOPPED, function(currentState, event) {
        if (currentState === STARTED &&
            event === CARD_SELECTED) {
          return PAUSED;
        } else {
          return stateMap[event];
        }
      });
    var appChangedState = appState.changes();
    
    appChangedState.log("state:");
   
    /**
     * Route values to ensure side effects
     */
    var stopRecordingStream  = appChangedState.filter(function(v) { return v === STOPPED; });
    var startRecordingStream = appChangedState.filter(function(v) { return v === STARTED; });
    var pauseRecordingStream = appChangedState.filter(function(v) { return v === PAUSED; });

    /**
     * Behaviors/side-effects
     */
    pauseRecordingStream.onValue(function(v) {
      recordingCard.add(pauseImage);
      recordingCard.remove(playImage);
    });

    // Side effect of clicking select on the main card is to begin listening to the accelerometer.
    startRecordingStream.onValue(function(e) {
      recordingCard.remove(pauseImage);
      recordingCard.add(playImage);
    });
    
    appLaunchStream.onValue(function() {
      recordingCard.show();
      splashCard.hide();
    });
    
    // Update the UI view every time a new cadence event comes in.
    var activeCadence = cadenceStream
      .toProperty()
      .startWith(null)
      .map(function(cadence) {
        if (cadence === null) { return "--"; }
        return cadence.toFixed(0);
      })
    
    var assignedCadence = activeCadence
      .combine(appChangedState, function(cadence, appEvent){
        isPaused = appEvent === PAUSED
        return isPaused ? null : cadence; 
      }).scan("--", function(lastValue, cadence) {
        return (cadence === null) ? lastValue : cadence;
      })
      .assign(cadenceText, "text");
   
    /**
     * Initial render.
     */
    splashCard.show();
  }
};

module.exports = AppController;
