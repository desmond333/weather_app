import {
    weatherItemsReducerAction,
    weatherItemsReducerAT_TYPES,
    weatherItemsReducerType
} from "../types/weatherItemsReducerType"

const initialState: weatherItemsReducerType = {
    allWeatherItems: [
        {
            id: 1,
            city: 'Moscow',
            coordinates: [0, 0],
            temperature: '25 degrees',
            rainfall: 'some',
        },
        {
            id: 2,
            city: 'Saint-Petersburg',
            coordinates: [0, 0],
            temperature: '25 degrees',
            rainfall: 'strong',
        },
        {
            id: 3,
            city: 'Krasnodar',
            coordinates: [0, 0],
            temperature: '300 degrees',
            rainfall: 'none',
        },
    ],
}

export const weatherItemsReducer = (state = initialState,
                                    action: weatherItemsReducerAction) => {
    switch (action.type) {
        case weatherItemsReducerAT_TYPES.ADD_WEATHER_ITEM:
            return {
                allWeatherItems: [
                    ...state.allWeatherItems,
                    {
                        id: action.payload.weatherItem.id,
                        city: action.payload.weatherItem.city,
                        temperature: action.payload.weatherItem.temperature,
                        rainfall: action.payload.weatherItem.rainfall
                    }
                ]
            }
        case weatherItemsReducerAT_TYPES.DELETE_WEATHER_ITEM:
            return {
                allWeatherItems: [
                    ...state.allWeatherItems.filter(item => item.id !== action.payload.id)
                ]
            }
        case weatherItemsReducerAT_TYPES.CHANGE_WEATHER_ITEM:
            return {
                allWeatherItems: [
                    ...state.allWeatherItems.map(item => {
                        if (item.id === action.payload.id) {
                            return {...item, [action.payload.typeInp]: action.payload.value}
                        }
                        return item
                    })
                ]
            }
        default:
            return state
    }
}