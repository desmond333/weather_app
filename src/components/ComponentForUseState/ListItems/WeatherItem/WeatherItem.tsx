import React, {useEffect, useRef, useState} from 'react';

import styles from './WeatherItem.module.css';

import {weatherItemType} from '../../../../types/weatherItemType'

interface WeatherItemProps extends weatherItemType {
    deleteWeatherItem: (id: number) => void
    changeWeatherItem: (id: number, type: string, value:string) => void
}

const WeatherItem: React.FC<WeatherItemProps> = (props) => {
    const [editModeCityInp, setEditModeCityInp] = useState(false)
    const [editModeTemperatureInp, setEditModeTemperatureInp] = useState(false)
    const [editModeRainfallInp, setEditModeRainfallInp] = useState(false)

    const {id, city, temperature, rainfall, deleteWeatherItem, changeWeatherItem} = props

    //для input city
    const activateEditModeCityInp = (): void => {
        setEditModeCityInp(true)
    }
    const deactivateEditModeCityInp = (): void => {
        setEditModeCityInp(false)
    }
    const blurInputValue: React.FocusEventHandler<HTMLInputElement> = (e): void => {
        const value = e.target.value
        changeWeatherItem(id, 'city', value)
        setEditModeCityInp(false)
    }

    //для input Temperature
    const activateEditModeTemperatureInp = (): void => {
        setEditModeTemperatureInp(true)
    }
    const deactivateEditModeTemperatureInp = (): void => {
        setEditModeTemperatureInp(false)
    }


    return (
        <div className={styles.weather_item}>
            {editModeCityInp
                ? <input autoFocus={true}
                         onBlur={blurInputValue}
                         onClick={deactivateEditModeCityInp}/>
                : <div onClick={activateEditModeCityInp}>{city}</div>
            }
            {editModeTemperatureInp
                ? <input autoFocus={true}
                         onClick={deactivateEditModeTemperatureInp}/>
                : <div onClick={activateEditModeTemperatureInp}>{temperature}</div>
            }
            <div>{rainfall}</div>
            <button onClick={() => {
                deleteWeatherItem(id)
            }}>удалить
            </button>
        </div>
    )
}

export {WeatherItem}