const defaultState = {
    dataList: []
};
export default function TravelPlanReducer(state = defaultState, action) {
    switch (action.type) {
        case 'FETCH_TRAVEL_PLAN_LIST_START':
            return {
                ...state,
                type: 'doing'
            };
        case 'FETCH_TRAVEL_PLAN_LIST_SUCCESS':
            return {
                ...state,
                type: 'success',
                dataList: action.data
            };
        case 'FETCH_TRAVEL_PLAN_LIST_FAILURE':
            return {
                ...state,
                type: 'failure'
            };
        default:
            return state;
    }
}
