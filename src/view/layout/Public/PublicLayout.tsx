import React from 'react';

import './PublicLayout.scss';

export const PublicLayout: React.FC = ({ children }) => {
    return (
        <main className='authorization-page'>
            <div className='authorization-page__title'>
                Hello, fellow!
            </div>
            <div className='authorization-page__content'>
                {children}
            </div>
        </main>
    );
};
