import {createStore, combineReducers} from "redux"

import {weatherItemsReducer} from "./weatherItemsReducer"

const rootReducer = combineReducers({
    weatherItems: weatherItemsReducer,
})

//для работы useSelector
export type RootState = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);