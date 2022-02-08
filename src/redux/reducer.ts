import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import localforage from 'localforage';
import authReducer from 'src/ducks/auth';
import userReducer from 'src/ducks/user';

const authPersistConfig = {
    storage: localforage,
    key: 'auth',
    whitelist: ['auth'],
};

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
});

export default persistReducer(authPersistConfig, rootReducer);
