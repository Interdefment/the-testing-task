import { Button } from '@vechaiui/button';
import { Input } from '@vechaiui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { publicRoutes } from 'src/constants/routes';
import { loginRequest } from 'src/ducks/auth';
import { setCredentials } from 'src/ducks/user';
import { useAppDispatch, useAppSelector } from 'src/tools/hooks/redux';
import { ErrorBoundary } from 'src/view/components/ErrorBoundary/ErrorBoundary';

export const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { credentials, loading } = useAppSelector((state) => ({
        credentials: state.user.credentials,
        loading: state.auth.loading,
    }));

    const handleChange = (field: keyof typeof credentials) => {
        return (event: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setCredentials({
                field,
                value: event.target.value,
            }));
        };
    };

    const onLogin = () => {
        dispatch(loginRequest(credentials));
    };

    return (
        <div className='w-96 flex flex-col'>
            <Input
                className='mb-5 border border-black'
                disabled={loading}
                placeholder='Введите ваш логин'
                value={credentials.username}
                onChange={handleChange('username')}
            />
            <Input
                className='mb-5 border border-black'
                disabled={loading}
                placeholder='Введите ваш пароль'
                type='password'
                value={credentials.password}
                onChange={handleChange('password')}
            />
            <div className='flex flex-row items-center'>
                <Button
                    color='primary'
                    // disabled={loading}
                    variant='solid'
                    onClick={onLogin}>
                    Войти
                </Button>
                <Link
                    className='ml-5 flex-1 whitespace-nowrap'
                    to={publicRoutes.RESET_PASSWORD}>
                    Забыли пароль
                </Link>
            </div>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <LoginPage />
    </ErrorBoundary>
);
