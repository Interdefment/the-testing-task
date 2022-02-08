import React from 'react';
import { Link } from 'react-router-dom';
import { publicRoutes } from 'src/constants/routes';

import './MainLayout.scss';

export const MainLayout: React.FC = ({ children }) => {
    return (
        <main className='main-layout'>
            <div className='main-layout__header'>
                <Link to={publicRoutes.HOME}>The App</Link>
            </div>
            <div className='main-layout__content'>
                {children}
            </div>
        </main>
    );
};
