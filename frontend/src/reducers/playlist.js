const defaultState = {
    listOfPlaylist: [],
    //videosOfPlaylist: []
};

const playlist = (state = defaultState, action) => {
    switch (action.type) {
        case 'LIST_OF_PLAYLIST':
            return {
                ...state,
                listOfPlaylist: action.listOfPlaylist
            };
        /*case 'PLAYLIST_VIDEOS':
            return {
                ...state,
                videosOfPlaylist: action.videosOfPlaylist
            };*/
        default:
            return state;
    }
};

export default playlist;
