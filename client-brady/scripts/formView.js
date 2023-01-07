// FormView is an object which houses all the message form functionality.
// Consider the provided code and complete the functionality.
// Apply what you learn here to other interactive views if necessary.

var FormView = {
  $form: $('form'),

  initialize: function () {
    FormView.$form.on('submit', FormView.handleSubmit);
  },

  handleSubmit: function (event) {
    event.preventDefault();
    var text = $('#message').val();
    // TODO: Currently, this is all handleSubmit does.
    // Make this function actually send a message to the Parse API.

    /*var fakeMessage = {
      campus: 'rpp',
      'created_at': '2022-12-08T01:41:04.278Z',
      'github_handle': 'chustanley',
      'message_id': 79716,
      roomname: '14',
      text: '<h1 style="color: red">"You got hacked"</h1>',
      'updated_at': '2022-12-08T01:41:04.278Z',
      username: 'virus'
    };*/

    //generate a format message
    // send to Parse API
    FormView.createMessage(text);
    document.getElementById('message').value = '';
  },

  setStatus: function (status = false) {
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },

  createMessage: function(text) {
    var message = {};
    message.text = text;
    message.username = App.username;
    message.roomname = RoomsView.$select.val() !== null ? RoomsView.$select.val() : 'lobby';
    Parse.create(message);
  }
};