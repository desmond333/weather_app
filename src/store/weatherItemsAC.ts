import {
    addWeatherItemAC_TYPE, changeWeatherItemAC_TYPE,
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

export const changeWeatherItemAC = (id: number, typeInp: string, value:string): changeWeatherItemAC_TYPE=> ({
    type: weatherItemsReducerAT_TYPES.CHANGE_WEATHER_ITEM, id, typeInp, value
})