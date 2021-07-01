import React, {useState} from "react";
import {ListItems} from "./ListItems/ListItems";
import styles from "./ComponentForRedux.module.css"
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {addWeatherItemAC, changeWeatherItemAC, deleteWeatherItemAC} from "../../store/weatherItemsAC"

const ComponentForRedux: React.FC = () => {
    const [cityValue, setCityValue] = useState('')
    const [temperatureValue, setTemperatureValue] = useState('')
    const [rainfallValue, setRainfallValue] = useState('')
    const {allWeatherItems} = useTypedSelector(state => state.weatherItems)
    const dispatch = useDispatch()
    const createWeatherItem = (): void => {
        dispatch(addWeatherItemAC({
            id: Date.now(),
            city: cityValue,
            temperature: temperatureValue,
            rainfall: rainfallValue,
        }))
    }
    const deleteWeatherItem = (id: number): void => {
        debugger
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
                       placeholder={'Город'}/>
                <input className={styles.app__input} value={temperatureValue}
                       onChange={e => setTemperatureValue(e.target.value)}
                       placeholder={'Температура'}/>
                <input className={styles.app__input} value={rainfallValue}
                       onChange={e => setRainfallValue(e.target.value)}
                       placeholder={'Осадки'}/>
                <button onClick={createWeatherItem}>Добавить</button>
            </div>
            <ListItems weatherItems={allWeatherItems} changeWeatherItem={changeWeatherItem} deleteWeatherItem={deleteWeatherItem}/>
        </div>
    )
}

export {ComponentForRedux}