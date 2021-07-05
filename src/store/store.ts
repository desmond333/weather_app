import {createStore, combineReducers, applyMiddleware} from "redux"
import logger from 'redux-logger';

import {weatherItemsReducer} from "./weatherItemsReducer"

const rootReducer = combineReducers({
    weatherItems: weatherItemsReducer,
})

//для работы useSelector
export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(logger));