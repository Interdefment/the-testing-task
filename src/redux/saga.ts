import { all } from 'redux-saga/effects';
import { authSaga } from 'src/ducks/auth';
import { userSaga } from 'src/ducks/user';

const rootSaga = function* () {
    yield all([authSaga(), userSaga()]);
};

export default rootSaga;
