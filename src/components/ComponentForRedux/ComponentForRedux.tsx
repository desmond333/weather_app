import React, {useEffect, useState} from "react";
import styles from "./ComponentForRedux.module.css"
import {useDispatch, useSelector} from "react-redux";
import {
    addCoordinatesWeatherItemAC,
    addWeatherItemAC,
    changeWeatherItemAC,
    deleteWeatherItemAC
} from "../../store/weatherItemsAC"
import {Map} from "react-yandex-maps";
import {coordinatesType, weatherItemType} from "../../types/weatherItemType";
import {RootState} from "../../store/store";
import {ListItems} from "./ListItems/ListItems";
import {weatherItemsReducerType} from "../../types/weatherItemsReducerType";

export const ComponentForRedux: React.FC = (): JSX.Element => {
    //for edit mode
    const [cityValue, setCityValue] = useState('')
    const [temperatureValue, setTemperatureValue] = useState('')
    const [rainfallValue, setRainfallValue] = useState('')
    //for map mode
    const [isShowYMap, setIsShowYMap] = useState(false)
    const [cityQueryString, setCityQueryString] = useState('')
    const [coordinatesSelectedWeatherItem, setCoordinatesSelectedWeatherItem] = useState([0, 0])
    const apiKey = '611a996d-0dd0-4327-807d-1964284093ef'

    const allWeatherItems: Array<weatherItemType> = useSelector((state: RootState) => state.weatherItems.allWeatherItems)

    const dispatch = useDispatch()

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

    const onSetCityQueryString = (queryString: string): void => {
        if (queryString) {
            allWeatherItems.forEach((item)=> {
                if (item.city === queryString && !item.coordinates ) {
                    debugger
                    setCityQueryString(queryString)
                } else if (item.city === queryString && item.coordinates) {
                    debugger
                    console.log('Для этого города координаты уже были добавлены с сервера')
                    setCoordinatesSelectedWeatherItem(item.coordinates)
                    setIsShowYMap(true)
                }
            })
        }
    }
    //используем JavaScript API and Geocoder HTTP API для того чтобы переводить слова в координаты
    useEffect(() => {
        console.log(cityQueryString)
        if (cityQueryString !== '') {
            fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${cityQueryString}&results=1`)
                .then((res) => res.json())
                .then((data) => {
                    console.log('Пришли данные с сервера')
                    const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
                    const x = Number(coordinates[1])
                    const y = Number(coordinates[0])
                    onAddCoordinatesWeatherItem([x, y], cityQueryString)
                })
        }
    }, [cityQueryString])
    const onAddCoordinatesWeatherItem = (coordinates: coordinatesType, cityName: string): void => {
        if (coordinates) {
            debugger
            dispatch(addCoordinatesWeatherItemAC(coordinates, cityName))
            setCoordinatesSelectedWeatherItem(coordinates)
            setIsShowYMap(true)
        }
    }


    return (
        <div className={styles.app__useState}>
            <h1 className={styles.app__bodyTitle}>Используем redux</h1>
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
                       deleteWeatherItem={onDeleteWeatherItem} onSetCityQueryString={onSetCityQueryString}/>
            {isShowYMap &&
            <Map state={{center: coordinatesSelectedWeatherItem, zoom: 9}}/>
            }
        </div>
    )
}