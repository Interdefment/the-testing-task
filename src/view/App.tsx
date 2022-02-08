import React from 'react';
import { PublicLayout } from 'src/view/layout/Public/PublicLayout';
import { PublicRoutes } from 'src/view/routes/public';
import { MainLayout } from './layout/Main/MainLayout';
import { PrivateRoutes } from './routes/private';


import 'src/view/styles/index.scss';
import 'tailwindcss/tailwind.css';
import { useAppSelector } from 'src/tools/hooks/redux';
import { selectIsAuthorized } from 'src/ducks/auth';

export const App: React.FC = () => {
    console.warn('Warning! Using unoptimized development build.');

    const isAuthorized = useAppSelector(selectIsAuthorized);
    // const isAuthorized = true;

    if (!isAuthorized) {
        return (
            <PublicLayout>
                <PublicRoutes />
            </PublicLayout>
        );
    }

    return (
        <MainLayout>
            <PrivateRoutes />
        </MainLayout>
    );
};
