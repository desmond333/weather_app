import React, {useState} from 'react';

import styles from '../styles/App.module.css';

import {weatherItemType} from '../types/data'

import {ListItems} from "./ListItems/ListItems";

const App: React.FC = () => {
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
    return (
        <div className={styles.container}>
            <div className={styles.app}>
                <div className={styles.app__titles}>
                    <div className={styles.app__titlesItem}>Город</div>
                    <div className={styles.app__titlesItem}>Температура</div>
                    <div className={styles.app__titlesItem}>Осадки</div>
                </div>
                <div className={styles.app__addArea}>
                    <input className={styles.app__input} value={cityValue} onChange={e => setCityValue(e.target.value)}
                           placeholder={'Город'}/>
                    <input className={styles.app__input} value={temperatureValue}
                           onChange={e => setTemperatureValue(e.target.value)}
                           placeholder={'Температура'}/>
                    <input className={styles.app__input} value={rainfallValue}
                           onChange={e => setRainfallValue(e.target.value)}
                           placeholder={'Осадки'}/>
                    <button onClick={createWeatherItem}>Добавить</button>
                </div>
                <ListItems weatherItems={weatherItems} deleteWeatherItem={deleteWeatherItem}/>
            </div>
        </div>
    );
}

export {App}
