import {weatherItemType} from '../weatherItemType'

export enum weatherItemsReducerAT_TYPES {
    ADD_WEATHER_ITEM = 'ADD_WEATHER_ITEM',
    DELETE_WEATHER_ITEM = 'DELETE_WEATHER_ITEM',
    CHANGE_WEATHER_ITEM = 'CHANGE_WEATHER_ITEM',
}

export interface weatherItemsReducerType {
    allWeatherItems: Array<weatherItemType>
}

export type weatherItemsReducerAction = addWeatherItemAC_TYPE | deleteWeatherItemAC_TYPE | changeWeatherItemAC_TYPE

export interface addWeatherItemAC_TYPE {
    type: weatherItemsReducerAT_TYPES.ADD_WEATHER_ITEM
    weatherItem: weatherItemType
}

export interface deleteWeatherItemAC_TYPE {
    type: weatherItemsReducerAT_TYPES.DELETE_WEATHER_ITEM
    id: number
}

export interface changeWeatherItemAC_TYPE {
    type: weatherItemsReducerAT_TYPES.CHANGE_WEATHER_ITEM
    id: number
    typeInp: string
    value:string
}