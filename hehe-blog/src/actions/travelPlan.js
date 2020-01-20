export const FETCH_TRAVEL_PLAN_LIST_START = 'FETCH_TRAVEL_PLAN_LIST_START';
export const FETCH_TRAVEL_PLAN_LIST_SUCCESS = 'FETCH_TRAVEL_PLAN_LIST_SUCCESS';
export const FETCH_TRAVEL_PLAN_LIST_FAILURE = 'FETCH_TRAVEL_PLAN_LIST_FAILURE';

export function fetchTravelPlanListStart() {
    return {
        type: FETCH_TRAVEL_PLAN_LIST_START
    };
}

export function fetchTravelPlanListSuccess(data) {
    return {
        type: FETCH_TRAVEL_PLAN_LIST_SUCCESS,
        data: data
    };
}

export function fetchTravelPlanListFailure(data) {
    return {
        type: FETCH_TRAVEL_PLAN_LIST_FAILURE,
        data: data
    };
}
