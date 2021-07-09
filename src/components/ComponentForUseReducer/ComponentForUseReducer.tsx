import React, {useEffect, useReducer, useState} from "react";
import styles from "./ComponentForUseReducer.module.css"
import {addCoordinatesWeatherItemAC, addWeatherItemAC, changeWeatherItemAC, deleteWeatherItemAC} from "./actionCreators"
import {Map} from "react-yandex-maps";
import {coordinatesType, weatherItemType} from "../../types/weatherItemType";
import {ListItems} from "./ListItems/ListItems";
import {init, initialState, weatherItemsReducer} from "./useReducerParametrs";

export const ComponentForUseReducer: React.FC = (): JSX.Element => {
    //for edit mode
    const [cityValue, setCityValue] = useState<string>('')
    const [temperatureValue, setTemperatureValue] = useState<string>('')
    const [rainfallValue, setRainfallValue] = useState<string>('')
    //for map mode
    const [isShowYMap, setIsShowYMap] = useState<boolean>(false)
    const [cityAPIQueryString, setCityAPIQueryString] = useState<string>('')
    const [coordinatesSelectedWeatherItem, setCoordinatesSelectedWeatherItem] = useState<coordinatesType>([0, 0])
    const apiKey: string = '611a996d-0dd0-4327-807d-1964284093ef'

    const [state, dispatch] = useReducer(weatherItemsReducer, initialState, init)
    const allWeatherItems: [weatherItemType] = state.allWeatherItems

    const onCreateWeatherItem = (): void => {
        dispatch(addWeatherItemAC({
            id: Date.now(),
            city: cityValue,
            coordinates: null,
            temperature: temperatureValue,
            rainfall: rainfallValue,
        }))
    }

    const onDeleteWeatherItem = (id: number): void => {
        dispatch(deleteWeatherItemAC(id))
    }

    const onChangeWeatherItem = (id: number, typeInp: string, value: string): void => {
        dispatch(changeWeatherItemAC(id, typeInp, value))
    }

    const onSetCityAPIQueryString = (queryString: string): void => {
        if (queryString) {
            allWeatherItems.forEach(item => {
                if (item.city === queryString) {
                    if (item.coordinates) {
                        console.log('Для этого города координаты уже были добавлены с сервера')
                        setCoordinatesSelectedWeatherItem(item.coordinates)
                        setIsShowYMap(true)
                    } else {
                        setCityAPIQueryString(queryString)
                    }
                }
            })
        }
    }
    //используем JavaScript API and Geocoder HTTP API для того чтобы переводить слова в координаты
    useEffect(() => {
        if (cityAPIQueryString) {
            fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${cityAPIQueryString}&results=1`)
                .then((res) => res.json())
                .then((data) => {
                    const stringCoordinatesArr = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
                    const numCoordinatesArr = [Number(stringCoordinatesArr[1]), Number(stringCoordinatesArr[0])]
                    console.log('Сервер прислал координаты запрашиваемого города: ' + numCoordinatesArr)

                    dispatch(addCoordinatesWeatherItemAC(numCoordinatesArr, cityAPIQueryString))
                    setCoordinatesSelectedWeatherItem(numCoordinatesArr)
                    setIsShowYMap(true)
                })
        }
    }, [cityAPIQueryString])

    return (
        <div className={styles.app__useState}>
            <h1 className={styles.app__bodyTitle}>Используем useReducer</h1>
            <div className={styles.app__addArea}>
                <input className={styles.app__input} value={cityValue}
                       onChange={e => setCityValue(e.target.value)}
                       placeholder='Город'/>
                <input className={styles.app__input} value={temperatureValue}
                       onChange={e => setTemperatureValue(e.target.value)}
                       placeholder='Температура'/>
                <input className={styles.app__input} value={rainfallValue}
                       onChange={e => setRainfallValue(e.target.value)}
                       placeholder='Осадки'/>
                <button onClick={onCreateWeatherItem}>Добавить</button>
            </div>
            <ListItems weatherItems={allWeatherItems} changeWeatherItem={onChangeWeatherItem}
                       deleteWeatherItem={onDeleteWeatherItem} onSetCityQueryString={onSetCityAPIQueryString}/>
            {isShowYMap && coordinatesSelectedWeatherItem &&
            <Map state={{center: coordinatesSelectedWeatherItem, zoom: 9}}/>
            }
        </div>
    )
}