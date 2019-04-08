const defaultState = {
    listOfPlaylist: [],
    groupPlaylists: [],
    selectedPlaylist: '',
    videosOfPlaylist: []
};

const playlist = (state = defaultState, action) => {
    switch (action.type) {
        case 'LIST_OF_PLAYLIST':
            return {
                ...state,
                listOfPlaylist: action.listOfPlaylist
            };
        
        case 'PLAYLIST_GROUP':
            return {
                ...state,
                groupPlaylists: action.groupPlaylists
            };
        case 'SELECTED_PLAYLIST':{
            return {
                ...state,
                selectedPlaylist: action.selectedPlaylist
            }
        }
        case 'VIDEOS_OF_PLAYLIST': {
            return {
                ...state,
                videosOfPlaylist: action.videosOfPlaylist
            }
        }
        default:
            return state;
    }
};

export default playlist;
