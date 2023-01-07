// This object houses all the room _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Rooms = {

  // TODO: Define how you want to store the list of rooms
  _roomList: [$('<option class="room">Lobby</option>')],
  _roomNameList: ['Lobby'],

  // TODO: Define methods which allow you to add rooms, update the list,
  // mark a room as selected, etc.
  updateList: function() {
    _.each(App.data, function(message) {
      var roomName = message.roomname;
      if (!Rooms._roomNameList.includes(roomName)) {
        // var roomName = message.roomname;
        var $roomElement = $(`<option class="room">${roomName}</option>`);
        Rooms._roomNameList.push(roomName);
        Rooms._roomList.push($roomElement);
      }
    });
  },
  getList: () => Rooms._roomList,

  add: function() {
    var roomName = prompt('Enter Room Name');
    RoomsView.renderRoom(roomName);
  },
};
