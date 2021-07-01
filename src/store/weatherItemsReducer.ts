import {weatherItemsReducerAT_TYPES} from "../types/weatherItemsReducerType"
import {weatherItemsReducerType} from "../types/weatherItemsReducerType"

const initialState: weatherItemsReducerType = {
    weatherItems: [
        {
            id: 1,
            city: 'Moscow',
            temperature: '25 degrees',
            rainfall: 'some',
        },
        {
            id: 2,
            city: 'Saint-Petersburg',
            temperature: '25 degrees',
            rainfall: 'strong',
        },
        {
            id: 3,
            city: 'krasnodar',
            temperature: '30 degrees',
            rainfall: 'none',
        },
    ],
}

const weatherItemsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case weatherItemsReducerAT_TYPES.ADD_WEATHER_ITEM:

        case weatherItemsReducerAT_TYPES.DELETE_WEATHER_ITEM:

        default:
            return state
    }
}

export {weatherItemsReducer}