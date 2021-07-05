import {
    weatherItemsReducerAction,
    weatherItemsReducerAT_TYPES,
    weatherItemsReducerType
} from "../../types/weatherItemsReducerType";

export const weatherItemsReducer = (state: weatherItemsReducerType, action: weatherItemsReducerAction): any => {
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
        case weatherItemsReducerAT_TYPES.ADD_COORDINATES_WEATHER_ITEM:
            return {
                allWeatherItems: [
                    ...state.allWeatherItems.map(item => {
                        if (item.city === action.payload.cityName) {
                            return {...item, coordinates: action.payload.coordinates}
                        }
                        return item
                    })
                ]
            }
        default:
            return state
    }
}

export const initialState: weatherItemsReducerType = {
    allWeatherItems: [
        {
            id: 1,
            city: 'Moscow',
            coordinates: null,
            temperature: '25 degrees',
            rainfall: 'some',
        },
        {
            id: 2,
            city: 'Saint-Petersburg',
            coordinates: null,
            temperature: '25 degrees',
            rainfall: 'strong',
        },
        {
            id: 3,
            city: 'Krasnodar',
            coordinates: null,
            temperature: '300 degrees',
            rainfall: 'none',
        },
    ],
}

export const init = (state: weatherItemsReducerType) => {
    return state
}