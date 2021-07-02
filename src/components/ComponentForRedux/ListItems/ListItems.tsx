import React from 'react';

import styles from './ListItems.module.css';
import {WeatherItem} from "./WeatherItem/WeatherItem";
import {weatherItemType} from "../../../types/weatherItemType";

interface ListItemsProps {
    weatherItems: weatherItemType[]
    deleteWeatherItem: (id: number) => void
    changeWeatherItem: (id: number, typeInp: string, value: string) => void
    openWeatherItemYMap: (isOpen: boolean, coordinats: any) => void
}

export const ListItems: React.FC<ListItemsProps> = ({
                                                        weatherItems,
                                                        deleteWeatherItem,
                                                        changeWeatherItem,
                                                        openWeatherItemYMap,
                                                    }): JSX.Element => {
    return (
        <div className={styles.app__listItems}>
            {weatherItems.map((item) => {
                return <WeatherItem
                    key={item.id}
                    deleteWeatherItem={deleteWeatherItem}
                    changeWeatherItem={changeWeatherItem}
                    openWeatherItemYMap={openWeatherItemYMap}
                    {...item}/>
            })}
        </div>
    )
}