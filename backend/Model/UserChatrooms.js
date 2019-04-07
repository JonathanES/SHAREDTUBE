class UserChatrooms {
    constructor(id_user, listOfChatrooms){
        this.id_user = id_user,
      this.listOfChatrooms = listOfChatrooms;
    }
  
    get getlistOfChatrooms() {
      return this.listOfChatrooms;
    }
  
    set setlistOfChatrooms(listOfChatrooms) {
      this.listOfChatrooms = listOfChatrooms;
    }
  }
  
  
  module.exports = UserChatrooms
  