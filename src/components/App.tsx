import React, {useState, useEffect} from 'react';

import styles from '../styles/App.module.css';

import {weatherItem} from '../types/data'

const App: React.FC = () => {
    const [cityValue, setCityValue] = useState('')
    const [temperatureValue, setTemperatureValue] = useState('')
    const [rainfallValue, setRainfallValue] = useState('')
    const [weatherItems, setWeatherItems] = useState<weatherItem[]>([{
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
        temperature: '1000 degrees',
        rainfall: 'none',
    }])
    const createWeatherItem = () => {
        if (cityValue && temperatureValue && rainfallValue) {
            setWeatherItems([...weatherItems, {
                id: Date.now(),
                city: cityValue,
                temperature: temperatureValue,
                rainfall: rainfallValue,
            }])
        }
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
                    <input className={styles.app__input} onChange={e => setCityValue(e.target.value)}
                           placeholder={'Город'}/>
                    <input className={styles.app__input} onChange={e => setTemperatureValue(e.target.value)}
                           placeholder={'Температура'}/>
                    <input className={styles.app__input} onChange={e => setRainfallValue(e.target.value)}
                           placeholder={'Осадки'}/>
                    <button onClick={createWeatherItem}>Добавить</button>
                </div>
                <div className={styles.app__createdItems}>
                    {weatherItems.map((weatherItem) => {
                        return <div>{weatherItem.city}</div>
                    })}
                </div>
            </div>
        </div>
    );
}

export {App}
