const defaultState = {
    listOfGroups: [],
    selectedGroup: ''
};

const chatroom = (state = defaultState, action) => {
    switch (action.type) {
        case 'LIST_OF_GROUPS':
            return {
                ...state,
                listOfGroups: action.listOfGroups
            };
            case 'SELECTED_GROUP':
            return {
                ...state,
                selectedGroup: action.selectedGroup
            };  
        default:
            return state;
    }
};

export default chatroom;
