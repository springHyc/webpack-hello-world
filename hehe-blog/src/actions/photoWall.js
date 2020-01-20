export const FETCH_PHOTO_WALL_BY_ID_START = 'FETCH_PHOTO_WALL_BY_ID_START';
export const FETCH_PHOTO_WALL_BY_ID_SUCCESS = 'FETCH_PHOTO_WALL_BY_ID_SUCCESS';
export const FETCH_PHOTO_WALL_BY_ID_FAILURE = 'FETCH_PHOTO_WALL_BY_ID_FAILURE';

export function fetchPhotoWallByIdStart(id) {
    return {
        type: FETCH_PHOTO_WALL_BY_ID_START,
        id
    };
}

export function fetchPhotoWallByIdSuccess(data) {
    return {
        type: FETCH_PHOTO_WALL_BY_ID_SUCCESS,
        data: data
    };
}

export function fetchPhotoWallByIdFailure(data) {
    return {
        type: FETCH_PHOTO_WALL_BY_ID_FAILURE,
        data: data
    };
}
