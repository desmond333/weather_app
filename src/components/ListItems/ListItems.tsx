import React from 'react';

import styles from './ListItems.module.css';
import {WeatherItem} from "./WeatherItem/WeatherItem";
import {weatherItemType} from "../../types/data";

interface ListItemsProps {
    weatherItems: weatherItemType[];
}

const ListItems: React.FC<ListItemsProps> = (props) => {
    return (
        <div className={styles.app__listItems}>
            {props.weatherItems.map((item) => {
                return <WeatherItem key={item.id} id={item.id} city={item.city} temperature={item.temperature}
                                    rainfall={item.rainfall}/>
            })}
        </div>
    )
}

export {ListItems}