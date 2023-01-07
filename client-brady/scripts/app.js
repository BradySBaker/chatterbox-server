// This App object represents the Chatterbox application.
// It should initialize the other parts of the application
// and begin making requests to the Parse API for data.
//
var App = {
  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);
    App.data = null;

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch();

    setInterval(function() { App.fetch(RoomsView.$select.val()); }, 3000);
    // TODO: Make sure the app loads data from the API
    // continually, instead of just once at the start.
  },

  fetch: function(roomName = 'Lobby') {
    App.startSpinner();
    Parse.readAll((data) => {
      // examine the response from the server request:
      // TODO: Use the data to update Messages and Rooms
      App.data = data;
      console.log(App.data[0].username);
      RoomsView.render();
      RoomsView.handleChange(roomName);
      App.stopSpinner();
      // and re-render the corresponding views.
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  }
};

$(document).ready(function() {
  $('#rooms select').on('change', function() {
    RoomsView.handleChange();
  });
  $('#rooms button').on('click', function() {
    RoomsView.handleClick();
  });
  $('#chats').on('click', '.username', function(event) {
    MessagesView.handleClick(event);
  });
});
