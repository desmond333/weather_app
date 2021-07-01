import {weatherItemType} from './weatherItemType'

export enum weatherItemsReducerAT_TYPES {
    ADD_WEATHER_ITEM = 'ADD_WEATHER_ITEM',
    DELETE_WEATHER_ITEM = 'DELETE_WEATHER_ITEM',
}

export interface weatherItemsReducerType {
    weatherItems: Array<weatherItemType>
}