import React from 'react';

import styles from './ListItems.module.css';
import {WeatherItem} from "./WeatherItem/WeatherItem";
import {weatherItemType} from "../../types/data";

interface ListItemsProps {
    weatherItems: weatherItemType[];
    deleteWeatherItem: (id: number) => void;
}

const ListItems: React.FC<ListItemsProps> = (props) => {
    const {weatherItems, deleteWeatherItem} = props
    return (
        <div className={styles.app__listItems}>
            {weatherItems.map((item) => {
                return <WeatherItem
                    key={item.id}
                    deleteWeatherItem={deleteWeatherItem}
                    {...item}/>
            })}
        </div>
    )
}

export {ListItems}