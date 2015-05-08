var UI = require('ui');
var Vector2 = require('vector2');

WindowLayoutManager = {
  init: function() {
    var main = new UI.Card({
      title: 'Pebble.js',
      icon: 'images/menu_icon.png',
      subtitle: 'Hello World!',
      body: 'Press any button.'
    });

    main.show();

    main.on('click', 'up', function(e) {
      var menu = new UI.Menu({
        sections: [{
          items: [{
            title: 'Pebble.js',
            icon: 'images/menu_icon.png',
            subtitle: 'Can do Menus'
          }, {
            title: 'Second Item',
            subtitle: 'Subtitle Text'
          }]
        }]
      });
      menu.on('select', function(e) {
        console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
        console.log('The item is titled "' + e.item.title + '"');
      });
      menu.show();
    });

    main.on('click', 'select', function(e) {
      var card = new UI.Card();
      card.title('Started Recording');
      accelerometerManager.startRecording(card);
      card.show();
    });

    main.on('click', 'down', function(e) {
      var card = new UI.Card();
      card.title('A Card');
      card.subtitle('Is a Window');
      card.body('The simplest window type in Pebble.js.');
      card.show();
    });
  }
}

module.exports = WindowLayoutManager;
