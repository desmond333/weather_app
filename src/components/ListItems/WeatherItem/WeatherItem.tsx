import React from 'react';

import styles from './WeatherItem.module.css';

import {weatherItemType} from '../../../types/data'

interface WeatherItemProps extends weatherItemType {}

const WeatherItem: React.FC<WeatherItemProps> = (props) => {
    return (
        <div className={styles.weather_item}>
            <div>{props.city}</div>
            <div>{props.temperature}</div>
            <div>{props.rainfall}</div>
        </div>
    )
}

export {WeatherItem}