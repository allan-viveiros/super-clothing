//Import libraries
import {combineReducers} from 'redux';

//Import files
import userReducer from './user/user.reducer';

export default combineReducers({
    user: userReducer
});
