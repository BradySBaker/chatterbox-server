// MessagesView is an object which controls the DOM elements
// responsible for displaying messages.

var MessagesView = {

  $chats: $('#chats'),

  initialize: function () {
    // TODO: Perform any work which needs to be done
    // when this view loads.
    MessagesView.render();
  },

  render: function () {
    MessagesView.clearMessage();
    // TODO: Render _all_ the messages.
    // array of objects/messages
    //each message
    //add each to the $chat
    // console.log(data);
    _.each(App.data, function(message) {
      MessageView.render(message);
    });
    /*var fakeMessage = {
      campus: 'rpp',
      'created_at': '2022-12-08T01:41:04.278Z',
      'github_handle': 'chustanley',
      'message_id': 79716,
      roomname: '14',
      text: '<h1 style="color: red">"You got hacked"</h1>',
      'updated_at': '2022-12-08T01:41:04.278Z',
      username: 'virus'
    };
    MessageView.render(fakeMessage);*/
  },

  renderMessage: function (message) {
    // TODO: Render a single message.
    MessageView.render(message);
  },

  clearMessage: function() {
    $(document).ready(function() {
      $('#chats').empty();
    });
  },

  handleClick: function (event) {
    // TODO: handle a user clicking on a message
    // (this should add the sender to the user's friend list).
    var username = event.currentTarget.innerHTML;
    console.log(username);
    Friends.toggleStatus(username);
    Friends.render(username);
    App.fetch(RoomsView.$select.val());
  }
};