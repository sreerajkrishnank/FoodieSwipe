/**
 * Created by payyan1 on 18/06/18.
 */
import {combineReducers} from 'redux';
import locationReducer from './locationReducer';

export default combineReducers({
    location: locationReducer
})