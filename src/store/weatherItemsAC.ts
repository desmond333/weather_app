import {
    addWeatherItemAC_TYPE,
    deleteWeatherItemAC_TYPE,
    weatherItemsReducerAT_TYPES
} from "../types/for_redux/weatherItemsReducerType";
import {weatherItemType} from "../types/weatherItemType";

export const addWeatherItemAC = (weatherItem: weatherItemType): addWeatherItemAC_TYPE => ({
    type: weatherItemsReducerAT_TYPES.ADD_WEATHER_ITEM, weatherItem
})

export const deleteWeatherItemAC = (id: number): deleteWeatherItemAC_TYPE => ({
    type: weatherItemsReducerAT_TYPES.DELETE_WEATHER_ITEM, id
})