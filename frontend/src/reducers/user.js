const defaultState = {
  username: '',
  id_user: '',
  registerDemand: false,
  connexionDemand: true,
  playlistDemand: false,
  thumbnailsDemand: true
};

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        username: action.username,
        id_user: action.id_user,
        connexionDemand: false,
        registerDemand: false
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
        thumbnailsDemand: false
      };
      case 'THUMBNAILS_DEMAND':
      return {
        ...state,
        playlistDemand: false,
        thumbnailsDemand: true
      };
    default:
      return state;
  }
};

export default user;
