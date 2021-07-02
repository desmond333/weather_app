import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {App} from './components/App';
import {store} from "./store/store";
import {Provider} from "react-redux";
import {YMaps} from "react-yandex-maps";

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*Использует контекст апи, чтобы в контекст засунуть store*/}
            <YMaps>
                <App/>
            </YMaps>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);