import {
    addCoordinatesWeatherItemAC_TYPE,
    addWeatherItemAC_TYPE,
    changeWeatherItemAC_TYPE,
    deleteWeatherItemAC_TYPE, weatherItemsReducerAT_TYPES
} from "../../types/weatherItemsReducerType";
import {coordinatesType, weatherItemType} from "../../types/weatherItemType";

export const addWeatherItemAC = (weatherItem: weatherItemType): addWeatherItemAC_TYPE => ({
    type: weatherItemsReducerAT_TYPES.ADD_WEATHER_ITEM, payload: {weatherItem}
})

export const deleteWeatherItemAC = (id: number): deleteWeatherItemAC_TYPE => ({
    type: weatherItemsReducerAT_TYPES.DELETE_WEATHER_ITEM, payload: {id}
})

export const changeWeatherItemAC = (id: number, typeInp: string, value:string): changeWeatherItemAC_TYPE=> ({
    type: weatherItemsReducerAT_TYPES.CHANGE_WEATHER_ITEM, payload: {id, typeInp, value}
})

export const addCoordinatesWeatherItemAC = (coordinates: coordinatesType, cityName: string): addCoordinatesWeatherItemAC_TYPE=> ({
    type: weatherItemsReducerAT_TYPES.ADD_COORDINATES_WEATHER_ITEM, payload: {coordinates, cityName}
})