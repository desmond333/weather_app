import React, {useState} from "react";
// import {ListItems} from "./ListItems/ListItems";
import styles from "./ComponentForUseState.module.css"
import {weatherItemType} from "../../types/weatherItemType";

export const ComponentForUseState: React.FC = (): JSX.Element => {
    const [cityValue, setCityValue] = useState('')
    const [temperatureValue, setTemperatureValue] = useState('')
    const [rainfallValue, setRainfallValue] = useState('')
    const [weatherItems, setWeatherItems] = useState<weatherItemType[]>([
        {
            id: 1,
            city: 'Moscow',
            coordinates: [55.75, 37.57],
            temperature: '25 degrees',
            rainfall: 'some',
        },
        {
            id: 2,
            city: 'Saint-Petersburg',
            coordinates: [59.94, 30.31],
            temperature: '25 degrees',
            rainfall: 'strong',
        },
        {
            id: 3,
            city: 'Krasnodar',
            coordinates: [45.04, 38.97],
            temperature: '300 degrees',
            rainfall: 'none',
        },])
    const createWeatherItem = (): void => {
        if (cityValue && temperatureValue && rainfallValue) {
            setWeatherItems([...weatherItems, {
                id: Date.now(),
                city: cityValue,
                coordinates: [0, 0],
                temperature: temperatureValue,
                rainfall: rainfallValue,
            }])
            setCityValue('')
            setTemperatureValue('')
            setRainfallValue('')
        }
    }
    const deleteWeatherItem = (id: number): void => {
        setWeatherItems(weatherItems.filter(item => item.id !== id))
    }
    const changeWeatherItem = (id: number, type: string, value: string): void => {

    }
    return (
        <div className={styles.app__useState}>
            {/*<h1 className={styles.app__bodyTitle}>Используем useState</h1>*/}
            {/*<div className={styles.app__addArea}>*/}
            {/*    <input className={styles.app__input} value={cityValue}*/}
            {/*           onChange={e => setCityValue(e.target.value)}*/}
            {/*           placeholder='Город'/>*/}
            {/*    <input className={styles.app__input} value={temperatureValue}*/}
            {/*           onChange={e => setTemperatureValue(e.target.value)}*/}
            {/*           placeholder='Температура'/>*/}
            {/*    <input className={styles.app__input} value={rainfallValue}*/}
            {/*           onChange={e => setRainfallValue(e.target.value)}*/}
            {/*           placeholder='Осадки'/>*/}
            {/*    <button onClick={createWeatherItem}>Добавить</button>*/}
            {/*</div>*/}
            {/*<ListItems weatherItems={weatherItems} changeWeatherItem={changeWeatherItem} deleteWeatherItem={deleteWeatherItem}/>*/}
        </div>
    )
}