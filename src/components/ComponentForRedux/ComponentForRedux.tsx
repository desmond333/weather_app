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

const mapZoom: number = 9
const getGeocoderAPIQueryString = (cityAPIQueryString: string): string => {
    const apiKey: string = '611a996d-0dd0-4327-807d-1964284093ef'
    return `https://geocode-maps.yandex.ru/1.x/?apikey=${apiKey}&format=json&geocode=${cityAPIQueryString}&results=1`
}

export const ComponentForRedux: React.FC = (): JSX.Element => {
    //for edit mode
    const [cityValue, setCityValue] = useState<string>('')
    const [temperatureValue, setTemperatureValue] = useState<string>('')
    const [rainfallValue, setRainfallValue] = useState<string>('')
    //for map mode
    const [isShowYMap, setIsShowYMap] = useState<boolean>(false)
    const [cityAPIQueryString, setCityAPIQueryString] = useState<string>('')
    const [coordinatesSelectedWeatherItem, setCoordinatesSelectedWeatherItem] = useState<coordinatesType>([0, 0])

    const allWeatherItems: weatherItemType[] = useSelector((state: RootState) => state.weatherItems.allWeatherItems)

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
            (async () => {
                try {
                    const response = await fetch(getGeocoderAPIQueryString(cityAPIQueryString));
                    const respJson = await response.json();
                    const stringCoordinatesArr = respJson.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
                    const numCoordinatesArr = [Number(stringCoordinatesArr[1]), Number(stringCoordinatesArr[0])]
                    console.log('Сервер прислал координаты запрашиваемого города: ' + numCoordinatesArr)

                    dispatch(addCoordinatesWeatherItemAC(numCoordinatesArr, cityAPIQueryString))
                    setCoordinatesSelectedWeatherItem(numCoordinatesArr)
                    setIsShowYMap(true)
                } catch (err) {
                    // перехватит любую ошибку в блоке try: и в fetch, и в response.json
                    alert('Some error: ' + err);
                }
            })()
        }
    }, [cityAPIQueryString])

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
                       deleteWeatherItem={onDeleteWeatherItem} onSetCityQueryString={onSetCityAPIQueryString}/>
            {isShowYMap && coordinatesSelectedWeatherItem &&
            <Map state={{center: coordinatesSelectedWeatherItem, zoom: mapZoom}}/>
            }
        </div>
    )
}