const defaultState = {
    listOfPlaylist: [],
    currentPlaylist: [],
    thumbnails: [],
    searchedValue: '',
    selectedVideo: '',
    videoIsSelected: false
};

const video = (state = defaultState, action) => {
    switch (action.type) {
        case 'THUMBNAILS':
            return {
                ...state,
                thumbnails: action.thumbnails,
                searchedValue: action.searchedValue
            };
        case 'CURRENT_VIDEO':
            return {
                ...state,
                selectedVideo: action.video,
                videoIsSelected: true
            };
        case 'EXIT_VIDEO':
            return {
                ...state,
                selectedVideo: '',
                videoIsSelected: false
            }
        default:
            return state;
    }
};

export default video;
