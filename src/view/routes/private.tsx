import React, { Suspense } from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';
import { Home } from 'src/view/pages';
import * as routes from 'src/constants/routes';

export const PrivateRoutes = () => {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <Routes>
                <Route
                    element={<Home />}
                    path={routes.HOME_ROUTE}
                />
                <Route
                    element={<Home />}
                    path=':id'
                />
            </Routes>
        </Suspense>
    );
};
