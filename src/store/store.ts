import {createStore, combineReducers, applyMiddleware} from "redux"
import logger from 'redux-logger';

import {weatherItemsReducer} from "./weatherItemsReducer"

const rootReducer = combineReducers({ //смешиваем все reducer с помощью f combineReducers
    weatherItems: weatherItemsReducer,
})
//для адекватной работы useSelector в компоненте
export type rootReducerType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(logger));