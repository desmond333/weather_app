import React, {useState} from 'react';

import styles from './WeatherItem.module.css';

import {weatherItemType} from '../../../../types/weatherItemType'

interface WeatherItemProps extends weatherItemType {
    deleteWeatherItem: (id: number) => void
    changeWeatherItem: (id: number, type: string, value: string) => void
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
    const blurInputCityValue: React.FocusEventHandler<HTMLInputElement> = (e): void => {
        const value = e.target.value
        changeWeatherItem(id, 'city', value)
        setEditModeCityInp(false)
    }

    //для input Temperature
    const activateEditModeTemperatureInp = (): void => {
        setEditModeTemperatureInp(true)
    }
    const blurInputTemperatureValue: React.FocusEventHandler<HTMLInputElement> = (e): void => {
        const value = e.target.value
        changeWeatherItem(id, 'temperature', value)
        setEditModeTemperatureInp(false)
    }

    //для input Rainfall
    const activateEditModeRainfallInp = (): void => {
        setEditModeRainfallInp(true)
    }
    const blurInputRainfallValue: React.FocusEventHandler<HTMLInputElement> = (e): void => {
        const value = e.target.value
        changeWeatherItem(id, 'rainfall', value)
        setEditModeRainfallInp(false)
    }

    return (
        <div className={styles.weather_item}>
            {editModeCityInp
                ? <input autoFocus={true} onBlur={blurInputCityValue}/>
                : <div onClick={activateEditModeCityInp}>{city}</div>
            }
            {editModeTemperatureInp
                ? <input autoFocus={true} onBlur={blurInputTemperatureValue}/>
                : <div onClick={activateEditModeTemperatureInp}>{temperature}</div>
            }
            {editModeRainfallInp
                ? <input autoFocus={true} onBlur={blurInputRainfallValue}/>
                : <div onClick={activateEditModeRainfallInp}>{rainfall}</div>
            }
            <button onClick={() => {
                deleteWeatherItem(id)
            }}>удалить
            </button>
        </div>
    )
}

export {WeatherItem}