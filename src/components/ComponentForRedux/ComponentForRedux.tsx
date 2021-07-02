import React, {useState} from "react";
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
    const [coordinatsSelWeatherItem, setCoordinatsSelWeatherItem] = useState([0, 0])

    const {allWeatherItems} = useTypedSelector(state => state.weatherItems)

    const dispatch = useDispatch()

    const createWeatherItem = (): void => {
        dispatch(addWeatherItemAC({
            id: Date.now(),
            city: cityValue,
            coordinats: [0, 0],
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

    const openWeatherItemYMap = (isOpen: boolean, coordinats: any): void => {
        setIsShowYMap(isOpen)
        setCoordinatsSelWeatherItem(coordinats)
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
                       deleteWeatherItem={deleteWeatherItem} openWeatherItemYMap={openWeatherItemYMap}/>
            {isShowYMap && <Map defaultState={{center: coordinatsSelWeatherItem, zoom: 9}}/>}
        </div>
    )
}