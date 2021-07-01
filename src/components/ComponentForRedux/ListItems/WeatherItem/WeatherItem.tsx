import React from 'react';

import styles from './WeatherItem.module.css';

import {weatherItemType} from '../../../../types/weatherItemType'

interface WeatherItemProps extends weatherItemType {
    deleteWeatherItem: (id: number) => void;
}

const WeatherItem: React.FC<WeatherItemProps> = (props) => {
    const {id, city, temperature, rainfall, deleteWeatherItem} = props
    return (
        <div className={styles.weather_item}>
            <div>{city}</div>
            <div>{temperature}</div>
            <div>{rainfall}</div>
            <button onClick={()=>{deleteWeatherItem(id)}}>удалить</button>
        </div>
    )
}

export {WeatherItem}