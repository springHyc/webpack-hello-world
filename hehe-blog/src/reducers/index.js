import { combineReducers } from 'redux';
import travelPlan from './travelPlan';
import photoWall from './photoWall';

const reducers = combineReducers({
    travelPlan,
    photoWall
});

export default reducers;
