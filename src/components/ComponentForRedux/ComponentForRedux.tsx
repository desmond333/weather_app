import React, {useEffect, useState} from "react";
import {ListItems} from "./ListItems/ListItems";
import styles from "./ComponentForRedux.module.css"
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {addWeatherItemAC, changeWeatherItemAC, deleteWeatherItemAC} from "../../store/weatherItemsAC"
import {Map} from "react-yandex-maps";

export const ComponentForRedux: React.FC = (): JSX.Element => {
    const [cityValue, setCityValue] = useState('')
    const [temperatureValue, setTemperatureValue] = useState('')
    const [rainfallValue, setRainfallValue] = useState('')
    const [isShowYMap, setIsShowYMap] = useState(false)
    const [coordinatesSelectedWeatherItem, setCoordinatesSelectedWeatherItem] = useState([0, 0])
    const [cityQueryString, setCityQueryString] = useState('')
    const apiKey = '611a996d-0dd0-4327-807d-1964284093ef'

    const {allWeatherItems} = useTypedSelector(state => state.weatherItems)

    const dispatch = useDispatch()

    const showWeatherItemYMap = (queryString: string): void => {
        if (queryString) setCityQueryString(queryString)
    }
    //используем JavaScript API and Geocoder HTTP API для того чтобы переводить слова в координаты
    useEffect(() => {
        console.log(cityQueryString)
        if (cityQueryString !== '') {
            fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${cityQueryString}&results=1`)
                .then((res) => res.json())
                .then((data) => {
                    const coordinates = data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
                    const x = Number(coordinates[1])
                    const y = Number(coordinates[0])
                    setCoordinatesSelectedWeatherItem([x, y])
                    setIsShowYMap(true)
                })
        }
    }, [cityQueryString])

    const createWeatherItem = (): void => {
        dispatch(addWeatherItemAC({
            id: Date.now(),
            city: cityValue,
            coordinates: [0, 0],
            temperature: temperatureValue,
            rainfall: rainfallValue,
        }))
    }

    const deleteWeatherItem = (id: number): void => {
        dispatch(deleteWeatherItemAC(id))
    }

    const changeWeatherItem = (id: number, typeInp: string, value: string): void => {
        dispatch(changeWeatherItemAC(id, typeInp, value))
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
                <button onClick={createWeatherItem}>Добавить</button>
            </div>
            <ListItems weatherItems={allWeatherItems} changeWeatherItem={changeWeatherItem}
                       deleteWeatherItem={deleteWeatherItem} showWeatherItemYMap={showWeatherItemYMap}/>
            {isShowYMap &&
            <Map state={{center: coordinatesSelectedWeatherItem, zoom: 9}}/>
            }
        </div>
    )
}