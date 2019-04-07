class User {
    constructor(id_user, username) {
      this.id_user = id_user;
      this.username = username;
      this.listOfFriends = [];
    }
    get getUserName() {
      return this.username;
    }
  
    get getIdUser() {
      return this.id_user;
    }
  
    get getListOfFriends() {
      return this.listOfFriends;
    }
  
    set setListOfFriends(listOfFriends) {
      this.listOfFriends = listOfFriends;
    }
  }
  
  
  module.exports = User
  