import React from 'react';

import styles from './ListItems.module.css';
import {WeatherItem} from "./WeatherItem/WeatherItem";
import {weatherItemType} from "../../../types/weatherItemType";

interface ListItemsProps {
    weatherItems: weatherItemType[];
    deleteWeatherItem: (id: number) => void;
    changeWeatherItem: (id: number, typeInp: string, value: string) => void;
}

const ListItems: React.FC<ListItemsProps> = (props) => {
    const {weatherItems, deleteWeatherItem} = props
    return (
        <div className={styles.app__listItems}>
            {weatherItems.map((item) => {
                return <WeatherItem
                    key={item.id}
                    deleteWeatherItem={deleteWeatherItem}
                    changeWeatherItem={props.changeWeatherItem}
                    {...item}/>
            })}
        </div>
    )
}

export {ListItems}