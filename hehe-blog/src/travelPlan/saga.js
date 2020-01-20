import { put, takeEvery } from 'redux-saga/effects';
import actions from '../actions';
import axios from 'axios';

const travelPlanActions = actions.TravelPlan;
function* fetchTravelPlanList() {
    try {
        const res = yield axios.get('/api/viewPoints');
        yield put(travelPlanActions.fetchTravelPlanListSuccess(res.data));
    } catch (e) {
        yield put(travelPlanActions.fetchTravelPlanListFailure(e));
    }
}

function* travelPlanSaga() {
    yield takeEvery(travelPlanActions.FETCH_TRAVEL_PLAN_LIST_START, fetchTravelPlanList);
}

export default travelPlanSaga;
