import React, {useState} from 'react';

import styles from './WeatherItem.module.css';

import {weatherItemType} from '../../../../types/weatherItemType'

interface WeatherItemProps extends weatherItemType {
    id: number
    city: string
    temperature: string
    rainfall: string
    deleteWeatherItem: (id: number) => void
    changeWeatherItem: (id: number, type: string, value: string) => void
}

export const WeatherItem: React.FC<WeatherItemProps> = ({
                                                            id,
                                                            city,
                                                            temperature,
                                                            rainfall,
                                                            deleteWeatherItem,
                                                            changeWeatherItem
                                                        }): JSX.Element => {
    const [editModeCityInp, setEditModeCityInp] = useState(false)
    const [editModeTemperatureInp, setEditModeTemperatureInp] = useState(false)
    const [editModeRainfallInp, setEditModeRainfallInp] = useState(false)

    //для input city
    const activateEditModeCityInp = (): void => {
        setEditModeCityInp(true)
    }
    const changeInputCityValue: React.FocusEventHandler<HTMLInputElement> = (e): void => {
        const value = e.target.value
        changeWeatherItem(id, 'city', value)
    }
    const blurInputCityValue = (): void => {
        setEditModeCityInp(false)
    }

    //для input Temperature
    const activateEditModeTemperatureInp = (): void => {
        setEditModeTemperatureInp(true)
    }
    const changeInputTemperatureValue: React.FocusEventHandler<HTMLInputElement> = (e): void => {
        const value = e.target.value
        changeWeatherItem(id, 'temperature', value)
    }
    const blurInputTemperatureValue = (): void => {
        setEditModeTemperatureInp(false)
    }

    //для input Rainfall
    const activateEditModeRainfallInp = (): void => {
        setEditModeRainfallInp(true)
    }
    const changeInputRainfallValue: React.FocusEventHandler<HTMLInputElement> = (e): void => {
        const value = e.target.value
        changeWeatherItem(id, 'rainfall', value)
    }
    const blurInputRainfallValue = (): void => {
        setEditModeRainfallInp(false)
    }

    return (
        <div className={styles.weather_item}>
            {editModeCityInp
                ? <input autoFocus value={city} onChange={changeInputCityValue} onBlur={blurInputCityValue}/>
                : <div onClick={activateEditModeCityInp}>{city}</div>
            }
            {editModeTemperatureInp
                ? <input autoFocus value={temperature} onChange={changeInputTemperatureValue}
                         onBlur={blurInputTemperatureValue}/>
                : <div onClick={activateEditModeTemperatureInp}>{temperature}</div>
            }
            {editModeRainfallInp
                ?
                <input autoFocus value={rainfall} onChange={changeInputRainfallValue} onBlur={blurInputRainfallValue}/>
                : <div onClick={activateEditModeRainfallInp}>{rainfall}</div>
            }
            <button onClick={() => {
                deleteWeatherItem(id)
            }}>удалить
            </button>
        </div>
    )
}