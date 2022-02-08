import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import { VechaiProvider } from '@vechaiui/react';
import {
    reduxStore,
    reduxPersistor,
} from 'src/redux/store';

import { App } from './view/App';

const Root = () => {
    return (
        <React.StrictMode>
            <VechaiProvider>
                <ReduxProvider store={reduxStore}>
                    <PersistGate
                        loading={null}
                        persistor={reduxPersistor}>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </PersistGate>
                </ReduxProvider>
            </VechaiProvider>
        </React.StrictMode>
    );
};

render(<Root />, document.getElementById('root'));
