import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { Credentials } from 'src/@types/auth';
import { takeLatest } from 'redux-saga/effects';

import {
    call,
    put,
} from 'redux-saga/effects';
import { login } from 'src/api/auth.api';

interface AuthState {
    refreshToken: string | null;
    accessToken: string | null;
    loading: boolean,
}

interface LoginPayload {
    refresh: string;
    access: string;
}

const initialState: AuthState = {
    refreshToken: null,
    accessToken: null,
    loading: false,
};

type AuthReducerType<PayloadType> = (
    state: AuthState,
    action: PayloadAction<PayloadType>
) => void;

const loginRequestReducer: AuthReducerType<Credentials> = (state) => {
    state.loading = true;
};
const loginErrorReducer: AuthReducerType<Credentials> = (state) => {
    state.loading = false;
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.refreshToken = null;
            state.accessToken = null;
        },
        loginRequest: loginRequestReducer,
        loginError: loginErrorReducer,
        loginSuccess: (state, { payload }: PayloadAction<LoginPayload>) => {
            state.loading = false;
            state.refreshToken = payload.refresh;
            state.accessToken = payload.access;
        },
    },
});

export const { logout, loginRequest, loginSuccess } = authSlice.actions;

export default authSlice.reducer;


export const selectIsAuthorized = (state: RootState) => state.auth.refreshToken !== null;

// === Sagas ===
export function* handleLogin({ payload }: PayloadAction<Credentials>) {
    try {
        const response: { access: string; refresh: string; } = yield call(() => login(payload));
        yield put(loginSuccess(response));
    } catch (error) {
        console.error(error);
    }
}

export function* authSaga() {
    yield takeLatest(loginRequest.type, handleLogin);
}
