import React, {useState} from 'react';
import {Link, BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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
        <Router>
            <div className={styles.container}>
                <div className={styles.app}>
                    <div className={styles.app__header}>
                        <Link to="/usestate">
                            <div className={styles.app__headerItem}>
                                Используем хук useState
                            </div>
                        </Link>
                        <Link to="/redux">
                            <div className={styles.app__headerItem}>
                                Используем redux
                            </div>
                        </Link>
                    </div>
                    <div className={styles.app__body}>
                        <Switch>
                            <Route path="/usestate">
                                <h1>Используем useState</h1>
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
                                <ListItems weatherItems={weatherItems} deleteWeatherItem={deleteWeatherItem}/>
                            </Route>
                            <Route path="/redux">
                                <h1>Используем redux</h1>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export {App}
