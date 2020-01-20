const defaultState = {
    urls: []
};
export default function PhotoWallReducer(state = defaultState, action) {
    switch (action.type) {
        case 'FETCH_PHOTO_WALL_BY_ID_SUCCESS':
            return {
                ...state,
                urls: action.data.urls,
                imgInfos: action.data.imgInfos
            };
        default:
            return state;
    }
}
