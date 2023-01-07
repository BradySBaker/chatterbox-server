// RoomsView is an object which controls the DOM elements
// responsible for displaying and selecting rooms.

var RoomsView = {

  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    // TODO: Perform any work which needs to be done
    // when this view loads.
  },

  render: function() {
    Rooms.updateList();
    $(document).ready(function() {
      Rooms.getList().forEach(function(curRoom) {
        RoomsView.$select.append(curRoom);
      });
    });
    // TODO: Render out the list of rooms.
  },

  renderRoom: function(roomname) {
    // TODO: Render out a single room.
    $(document).ready(function() {
      var $roomElement = $(`<option class="room">${roomname}</option>`);
      RoomsView.$select.append($roomElement);
      RoomsView.handleChange(roomname);
    });
  },

  handleChange: function(specificRoom) {
    var roomname = RoomsView.$select.val();
    if (specificRoom !== undefined) {
      roomname = specificRoom;
      RoomsView.$select.val(specificRoom);
    }
    // TODO: Handle a user selecting a different room.
    MessagesView.clearMessage();
    _.each(App.data, function(message) {
      var curRoom = message.roomname;

      if (curRoom === roomname) {
        MessagesView.renderMessage(message);
      }
    });
  },

  handleClick: function(event) {
    // TODO: Handle the user clicking the "Add Room" button.
    Rooms.add();
  }

};