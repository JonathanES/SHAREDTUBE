const defaultState = {
  username: '',
  id_user: '',
  registerDemand: false,
  connexionDemand: true,
  playlistDemand: false,
  thumbnailsDemand: true,
  friendDemand: false,
  createGroup: false,
  listOfUserConnected: [],
  listOfFriends: []
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.username,
        id_user: action.id_user,
        connexionDemand: false,
        registerDemand: false,
        listOfUserConnected: defaultState.listOfUserConnected.push(action.username)
      };
      case 'LOGOUT':
      return {
        ...state,
        username: '',
        id_user: '',
        connexionDemand: true
      };
      case 'REGISTER_DEMAND':
      return {
        ...state,
        registerDemand: true,
        connexionDemand: false
      };
      case 'CONNEXION_DEMAND':
      return {
        ...state,
        connexionDemand: true,
        registerDemand: false
      };
      case 'PLAYLIST_DEMAND':
      return {
        ...state,
        playlistDemand: true,
        thumbnailsDemand: false,
        friendDemand: false
      };
      case 'THUMBNAILS_DEMAND':
      return {
        ...state,
        playlistDemand: false,
        thumbnailsDemand: true,
        friendDemand: false
      };
      case 'FRIEND_DEMAND':
      return {
        ...state,
        playlistDemand: false,
        thumbnailsDemand: false,
        friendDemand: true
      };
      case 'CREATE_GROUP_DEMAND':
      return {
        ...state,
        createGroup: !state.createGroup
      };
      case 'LIST_OF_FRIENDS':
      return {
        ...state,
        listOfFriends: action.listOfFriends
      };
    default:
      return state;
  }
};

export default user;
