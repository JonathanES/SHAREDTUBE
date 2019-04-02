const defaultState = {
    listOfPlaylist: [],
    currentPlaylist: []
};

const playlist = (state = defaultState, action) => {
    switch (action.type) {
        case 'LIST_OF_PLAYLIST':
            return {
                ...state,
                listOfPlaylist: action.listOfPlaylist
            };
        default:
            return state;
    }
};

export default playlist;
