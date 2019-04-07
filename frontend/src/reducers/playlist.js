const defaultState = {
    listOfPlaylist: [],
    groupPlaylists: []
    //videosOfPlaylist: []
};

const playlist = (state = defaultState, action) => {
    switch (action.type) {
        case 'LIST_OF_PLAYLIST':
            return {
                ...state,
                listOfPlaylist: action.listOfPlaylist
            };
        
        case '"PLAYLIST_GROUP"':
            return {
                ...state,
                groupPlaylists: action.groupPlaylists
            };
        default:
            return state;
    }
};

export default playlist;
