import React, {useEffect, useRef, useState} from 'react';

import styles from './WeatherItem.module.css';

import {coordinatesType, weatherItemType} from '../../../../types/weatherItemType'

interface WeatherItemProps extends weatherItemType {
    id: number
    city: string
    coordinates: coordinatesType
    temperature: string
    rainfall: string
    deleteWeatherItem: (id: number) => void
    changeWeatherItem: (id: number, type: string, value: string) => void
    onSetCityQueryString: (queryString: string) => void
}

export const WeatherItem: React.FC<WeatherItemProps> = ({
                                                            id,
                                                            city,
                                                            coordinates,
                                                            temperature,
                                                            rainfall,
                                                            deleteWeatherItem,
                                                            changeWeatherItem,
                                                            onSetCityQueryString
                                                        }): JSX.Element => {

    const [editModeCityInp, setEditModeCityInp] = useState<boolean>(false)
    const [editModeTemperatureInp, setEditModeTemperatureInp] = useState<boolean>(false)
    const [editModeRainfallInp, setEditModeRainfallInp] = useState<boolean>(false)
    const [visibleCityPopup, setVisibleCityPopup] = useState<boolean>(false)
    const [eventCityDiv, setEventCityDiv] = useState<any>(null)

    const popupRef = useRef<HTMLDivElement>(null)

    //on click in div city
    const onClickDivCity: React.MouseEventHandler<HTMLDivElement> = (e): void => {
        setVisibleCityPopup(true)
        setEventCityDiv(e)
    }

    //to position the cityPopup relative to the cursor
    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.style.top = eventCityDiv.clientY + 'px';
            popupRef.current.style.left = eventCityDiv.clientX + 'px';
        }
    }, [eventCityDiv])

    //to cancel invocation cityPopup
    const onCancelCityPopup = (): void => {
        setVisibleCityPopup(false)
    }

    //to start editing a new city name
    const activateEditModeCityInp = (): void => {
        setVisibleCityPopup(false)
        setEditModeCityInp(true)
    }

    //to show the city on the map
    const onShowWeatherItemYMap = (): void => {
        setVisibleCityPopup(false)
        onSetCityQueryString(city)
    }

    //to set a new city name
    const changeInputCityValue: React.FocusEventHandler<HTMLInputElement> = ({target}): void => {
        const {value} = target
        changeWeatherItem(id, 'city', value)
    }

    //to finish editing the city name
    const blurInputCityValue = (): void => {
        setEditModeCityInp(false)
    }


    //for input Temperature
    const activateEditModeTemperatureInp = (): void => {
        setEditModeTemperatureInp(true)
    }
    const changeInputTemperatureValue: React.FocusEventHandler<HTMLInputElement> = ({target}): void => {
        const {value} = target
        changeWeatherItem(id, 'temperature', value)
    }
    const blurInputTemperatureValue = (): void => {
        setEditModeTemperatureInp(false)
    }


    //for input Rainfall
    const activateEditModeRainfallInp = (): void => {
        setEditModeRainfallInp(true)
    }
    const changeInputRainfallValue: React.FocusEventHandler<HTMLInputElement> = ({target}): void => {
        const {value} = target
        changeWeatherItem(id, 'rainfall', value)
    }
    const blurInputRainfallValue = (): void => {
        setEditModeRainfallInp(false)
    }

    return (
        <div className={styles.weather__item}>
            {!editModeCityInp
                ? <div onClick={onClickDivCity}>{city}</div>
                : <input autoFocus value={city} onChange={changeInputCityValue} onBlur={blurInputCityValue}/>
            }

            {visibleCityPopup && <div className={styles.popupContainer}>
                <div className={styles.weather__itemPopup} ref={popupRef}>
                    <div onClick={activateEditModeCityInp} className={styles.popupContainerItem}>Изменить название
                        города
                    </div>
                    <div onClick={onShowWeatherItemYMap} className={styles.popupContainerItem}>Посмотреть на карте</div>
                    <div onClick={onCancelCityPopup}>Отмена</div>
                </div>
            </div>
            }

            {editModeTemperatureInp
                ? <input autoFocus value={temperature} onChange={changeInputTemperatureValue}
                         onBlur={blurInputTemperatureValue}/>
                : <div onClick={activateEditModeTemperatureInp}>{temperature}</div>
            }

            {editModeRainfallInp
                ?
                <input autoFocus value={rainfall} onChange={changeInputRainfallValue}
                       onBlur={blurInputRainfallValue}/>
                : <div onClick={activateEditModeRainfallInp}>{rainfall}</div>
            }

            <button onClick={() => {
                deleteWeatherItem(id)
            }}>удалить
            </button>
        </div>
    )
}