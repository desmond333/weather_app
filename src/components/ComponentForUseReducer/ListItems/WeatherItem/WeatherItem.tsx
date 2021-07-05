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
    const [editModeCityInp, setEditModeCityInp] = useState(false)
    const [editModeTemperatureInp, setEditModeTemperatureInp] = useState(false)
    const [editModeRainfallInp, setEditModeRainfallInp] = useState(false)
    const [visibleCityPopup, setVisibleCityPopup] = useState(false)
    const [eventCityDiv, setEventCityDiv] = useState<any>(null)

    const popupRef = useRef<HTMLDivElement>(null)

    //при клике на div city
    const onClickDivCity: React.MouseEventHandler<HTMLDivElement> = (e): void => {
        setVisibleCityPopup(true)
        setEventCityDiv(e)
    }
    //для позиционирования cityPopup относительно курсора
    useEffect(() => {
        if (popupRef.current) {
            popupRef.current.style.top = eventCityDiv.clientY + 'px';
            popupRef.current.style.left = eventCityDiv.clientX + 'px';
        }
    }, [eventCityDiv])
    //чтобы отменить вызов cityPopup
    const onCancelCityPopup = (): void => {
        setVisibleCityPopup(false)
    }
    //для начала редактирования названия города
    const activateEditModeCityInp = (): void => {
        setVisibleCityPopup(false)
        setEditModeCityInp(true)
    }
    //для того чтобы показать город на карте
    const onShowWeatherItemYMap = (): void => {
        setVisibleCityPopup(false)
        onSetCityQueryString(city)
    }
    //для установки нового названия города
    const changeInputCityValue: React.FocusEventHandler<HTMLInputElement> = (e): void => {
        const value = e.target.value
        changeWeatherItem(id, 'city', value)
    }
    //для окончания редактирования названия города
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
        <div className={styles.weather__item}>
            {!editModeCityInp
                ? <div onClick={onClickDivCity}>{city}</div>
                : <input autoFocus value={city} onChange={changeInputCityValue} onBlur={blurInputCityValue}/>
            }
            {visibleCityPopup && <div className={styles.popupContainer}>
                <div className={styles.weather__itemPopup} ref={popupRef}>
                    <div onClick={activateEditModeCityInp} style={{borderBottom: "2px solid white"}} >Изменить название
                        города
                    </div>
                    <div onClick={onShowWeatherItemYMap} style={{borderBottom: "2px solid white"}}>Посмотреть на карте</div>
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