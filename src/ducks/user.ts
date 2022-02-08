import {
    createSlice,
    PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from 'src/redux/store';
import { Credentials } from 'src/@types/auth';
import { takeLatest } from 'redux-saga/effects';

import { loginSuccess, logout } from './auth';

import {
    call,
    put,
} from 'redux-saga/effects';
import { fetchProfile, resetPassword } from 'src/api/user.api';
import { UserProfile } from 'src/@types/user';

interface ResetPasswordPayload {
    username: string;
    successSideEffect?: () => void;
    errorSideEffect?: () => void;
    finallySideEffect?: () => void;
}

interface UserState {
    credentials: Credentials;
    profile: UserProfile;
    loading: boolean,
    resetingPassword: boolean,
}

const initialState: UserState = {
    profile: {
        username: '',
    },
    credentials: {
        password: '',
        username: '',
    },
    loading: false,
    resetingPassword: false,
};

type UserReducerType<PayloadType> = (
    state: UserState,
    action: PayloadAction<PayloadType>
) => void;

const fetchProfileErrorReducer: UserReducerType<void> = (state) => {
    state.loading = false;
};

const resetPasswordRequestReducer: UserReducerType<ResetPasswordPayload> = (state) => {
    state.resetingPassword = true;
};
const resetPasswordErrorReducer: UserReducerType<void> = (state) => {
    state.resetingPassword = false;
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetchProfileError: fetchProfileErrorReducer,
        fetchProfileSuccess(state, { payload }: PayloadAction<UserProfile>) {
            state.profile = payload;
            state.loading = false;
        },
        setCredentials(state, { payload }: PayloadAction<{ field: keyof Credentials, value: string}>) {
            state.credentials[ payload.field ] = payload.value;
        },
        resetPasswordRequest: resetPasswordRequestReducer,
        resetPasswordError: resetPasswordErrorReducer,
        resetPasswordSuccess: resetPasswordErrorReducer,
    },
    extraReducers(builder) {
        builder.addCase(loginSuccess.type, (state) => {
            state.loading = true;
            state.credentials = initialState.credentials;
        });
        builder.addCase(logout.type, () => {
            return initialState;
        });
    },
});

export const {
    fetchProfileSuccess,
    setCredentials,
    fetchProfileError,
    resetPasswordError,
    resetPasswordRequest,
    resetPasswordSuccess,
} = userSlice.actions;

export default userSlice.reducer;


export const selectIsAuthorized = (state: RootState) => state.auth.refreshToken !== null;

// === Sagas ===
export function* handleAuthLogin() {
    try {
        const response: UserProfile = yield call(() => fetchProfile());
        yield put(fetchProfileSuccess(response));
    } catch (error) {
        yield put(fetchProfileError());
    }
}

export function* handleResetPassword({ payload }: PayloadAction<ResetPasswordPayload>) {
    try {
        console.error('An error occured. Unable to reset password');

        // yield call(() => resetPassword(payload.username));
        // yield put(resetPasswordSuccess());

        if (payload.successSideEffect) {
            payload.successSideEffect();
        }
    } catch (error) {
        yield put(resetPasswordError());

        if (payload.errorSideEffect) {
            payload.errorSideEffect();
        }
    } finally {
        if (payload.errorSideEffect) {
            payload.errorSideEffect();
        }
    }
}

export function* userSaga() {
    yield takeLatest(loginSuccess.type, handleAuthLogin);
    yield takeLatest(resetPasswordRequest.type, handleResetPassword);
}
