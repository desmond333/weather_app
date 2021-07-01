import React, {useState} from "react";
import {ListItems} from "./ListItems/ListItems";
import styles from "./ComponentForUseState.module.css"
import {weatherItemType} from "../../types/weatherItemType";

const ComponentForUseState: React.FC = () => {
    const [cityValue, setCityValue] = useState('')
    const [temperatureValue, setTemperatureValue] = useState('')
    const [rainfallValue, setRainfallValue] = useState('')
    const [weatherItems, setWeatherItems] = useState<weatherItemType[]>([{
        id: 1,
        city: 'Moscow',
        temperature: '25 degrees',
        rainfall: 'some',
    }, {
        id: 2,
        city: 'Saint-Petersburg',
        temperature: '25 degrees',
        rainfall: 'strong',
    }, {
        id: 3,
        city: 'krasnodar',
        temperature: '30 degrees',
        rainfall: 'none',
    }])
    const createWeatherItem = (): void => {
        if (cityValue && temperatureValue && rainfallValue) {
            setWeatherItems([...weatherItems, {
                id: Date.now(),
                city: cityValue,
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
    const changeWeatherItem = (id: number, type: string, value:string): void => {
        switch (type) {
            case 'city':
                return setWeatherItems([...weatherItems.map<any>((item)=>{
                    debugger
                    if (item.id === id) {
                        return {...item, city: value}
                    }
                }) ])
            case 'temperature':
                return console.log('change temperature')
            case 'rainfall':
                return console.log('change rainfall')
        }
    }
    return (
        <div className={styles.app__useState}>
            <h1 className={styles.app__bodyTitle}>Используем useState</h1>
            <div className={styles.app__addArea}>
                <input className={styles.app__input} value={cityValue}
                       onChange={e => setCityValue(e.target.value)}
                       placeholder={'Город'}/>
                <input className={styles.app__input} value={temperatureValue}
                       onChange={e => setTemperatureValue(e.target.value)}
                       placeholder={'Температура'}/>
                <input className={styles.app__input} value={rainfallValue}
                       onChange={e => setRainfallValue(e.target.value)}
                       placeholder={'Осадки'}/>
                <button onClick={createWeatherItem}>Добавить</button>
            </div>
            <ListItems weatherItems={weatherItems} changeWeatherItem={changeWeatherItem} deleteWeatherItem={deleteWeatherItem}/>
        </div>
    )
}

export {ComponentForUseState}