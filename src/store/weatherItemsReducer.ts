import {
    weatherItemsReducerAction,
    weatherItemsReducerAT_TYPES,
    weatherItemsReducerType
} from "../types/for_redux/weatherItemsReducerType"

const initialState: weatherItemsReducerType = {
    allWeatherItems: [
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
            temperature: '300 degrees',
            rainfall: 'none',
        },
    ],
}

const weatherItemsReducer = (state = initialState,
                             action: weatherItemsReducerAction) => {
    switch (action.type) {
        case weatherItemsReducerAT_TYPES.ADD_WEATHER_ITEM:
            return {
                allWeatherItems: [
                    ...state.allWeatherItems,
                    {
                        id: action.weatherItem.id,
                        city: action.weatherItem.city,
                        temperature: action.weatherItem.temperature,
                        rainfall: action.weatherItem.rainfall
                    }
                ]
            }
        case weatherItemsReducerAT_TYPES.DELETE_WEATHER_ITEM:
            debugger
            return {
                allWeatherItems: [
                    ...state.allWeatherItems.filter(item=> item.id !== action.id)
                ]
            }
        default:
            return state
    }
}

export {weatherItemsReducer}