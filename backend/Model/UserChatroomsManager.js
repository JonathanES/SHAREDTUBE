class UsersChatroomManager {
    constructor() {
      this.listOfUsersChatroom = [];
    }
  
    get getlistOfUsersChatroom() {
      return this.listOfUsersChatroom;
    }
  
    set setlistOfUsersChatroom(listOfUsersChatroom) {
      this.listOfUsersChatroom = listOfUsersChatroom;
    }
  }
  
  
  module.exports = UsersChatroomManager
  