import React from 'react';

import styles from './WeatherItem.module.css';

import {weatherItemType} from '../../../types/data'

interface WeatherItemProps extends weatherItemType {}

const WeatherItem: React.FC<WeatherItemProps> = (props) => {
    const {id, city, temperature, rainfall} = props
    return (
        <div className={styles.weather_item}>
            <div>{city}</div>
            <div>{temperature}</div>
            <div>{rainfall}</div>
        </div>
    )
}

export {WeatherItem}