import { put, takeEvery } from 'redux-saga/effects';
import actions from '../actions';
import axios from 'axios';

const _actions = actions.PhotoWall;
function* fetchPhotoWallById(data) {
    try {
        const res = yield axios.get('/api/viewPoint/photo/' + data.id);
        yield put(_actions.fetchPhotoWallByIdSuccess(res.data));
    } catch (e) {
        yield put(_actions.fetchPhotoWallByIdFailure(e));
    }
}

function* photoWallSaga() {
    yield takeEvery(_actions.FETCH_PHOTO_WALL_BY_ID_START, fetchPhotoWallById);
}

export default photoWallSaga;
