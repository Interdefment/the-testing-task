import React, { useState } from 'react';
import { Input, Button } from '@vechaiui/react';
import { Link } from 'react-router-dom';
import { publicRoutes } from 'src/constants/routes';
import { resetPasswordRequest, setCredentials } from 'src/ducks/user';
import { useAppDispatch, useAppSelector } from 'src/tools/hooks/redux';
import { ErrorBoundary } from 'src/view/components/ErrorBoundary/ErrorBoundary';

import './ResetPasswordPage.scss';

export const ResetPasswordPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { credentials, resetingPassword } = useAppSelector((state) => state.user);

    const [ resetSucceed, setResetSucceed ] = useState(false);

    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setCredentials({
            field: 'username',
            value: event.target.value,
        }));
    };

    const onReset = () => {
        dispatch(resetPasswordRequest({
            username: credentials.username,
            successSideEffect: () => {
                setResetSucceed(true);
            },
        }));
    };

    if (resetSucceed) {
        return (
            <div>
                <p className='authorization__reset-success-message mb-8'>Пароль для логина сброшен</p>
                <Link
                    className='w-full whitespace-nowrap'
                    to={publicRoutes.LOGIN}>
                    Перейти к форме входа
                </Link>
            </div>
        );
    }

    return (
        <div className='flex flex-col items-start'>
            <Input
                className='mb-5 w-full border border-black'
                disabled={resetingPassword}
                placeholder='Введите ваш логин'
                type='text'
                value={credentials.username}
                onChange={onUsernameChange}
            />
            <Button
                className='mr-3 whitespace-nowrap'
                color='primary'
                disabled={resetingPassword}
                onClick={onReset}>
                Сбросить пароль
            </Button>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <ResetPasswordPage />
    </ErrorBoundary>
);
