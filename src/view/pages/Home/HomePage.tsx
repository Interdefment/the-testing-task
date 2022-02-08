import React from 'react';
import { ErrorBoundary } from 'src/view/components/ErrorBoundary/ErrorBoundary';
import { Button } from '@vechaiui/react';
import { useAppDispatch } from 'src/tools/hooks/redux';
import { logout } from 'src/ducks/auth';

export const HomePage: React.FC = () => {
    const dispatch = useAppDispatch();
    const onLogout = () => {
        dispatch(logout());
    };

    return (
        <div className='px-10 py-5'>
            <Button
                color='danger'
                variant='solid'
                onClick={onLogout}>
                Log out
            </Button>
        </div>
    );
};

export default () => (
    <ErrorBoundary>
        <HomePage />
    </ErrorBoundary>
);
