// This object houses all the friend _data_ for the app.
// Treat it like a data structure - add methods to interact
// with and manipulate the data.

var Friends = {
  // TODO: Define how you want to store your list of friends.

  _friendList: [],
  $friends: $('#friendsList'),
  appendedFriends: [],

  // TODO: Define methods which allow you to add, toggle,
  // and check the friendship status of other users.
  toggleStatus: function(username) {
    if (!Friends.isFriend(username)) {
      Friends._friendList.push(username);
    }
  },
  isFriend: function(username) {
    if (Friends._friendList.includes(username)) {
      return true;
    }
  },
  render: function(username) {
    if (!Friends.appendedFriends.includes(username)) {
      var $username = $(`<li>${username}</li>`);
      Friends.$friends.append($username);
      Friends.appendedFriends.push(username);
    }
  }
};