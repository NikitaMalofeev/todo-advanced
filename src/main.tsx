import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App.tsx';
import './share/styles/style.scss';
import { store } from './app/providers/redux/store.ts';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
