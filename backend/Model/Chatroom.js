class Chatroom {
  constructor(id_group, name) {
    this.id_group = id_group;
    this.name = name;
    this.chatroomHistory = [];
    this.chatroomPlaylist = [];
  }
  get getName() {
    return this.name;
  }

  get getIdGroup() {
    return this.id_group;
  }

  get getChatroomHistory() {
    return this.chatroomHistory;
  }

  set setChatroomHistory(chatroomHistory) {
    this.chatroomHistory = chatroomHistory;
  }

  get getChatroomPlaylist() {
    return this.chatroomHistory;
  }

  set setChatroomPlaylist(chatroomPlaylist) {
    this.chatroomPlaylist = chatroomPlaylist;
  }
}

module.exports = Chatroom
