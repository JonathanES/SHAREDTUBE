class Chatroom {
    constructor(id_group, name) {
      this.id_group = id_group;
      this.name = name;
      this.chatroomHistory = [];
      this.chatroomPlaylist = [];
    }
    get name() {
      return this.name;
    }

    get id_group(){
        return this.id_group;
    }

    get chatroomHistory(){
        return this.chatroomHistory;
    }

    set chatroomHistory(chatroomHistory){
        this.chatroomHistory = chatroomHistory;
    }
  }


module.exports = {
    Chatroom: Chatroom
}