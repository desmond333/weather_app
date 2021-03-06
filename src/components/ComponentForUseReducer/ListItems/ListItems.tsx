import React from 'react';

import styles from './ListItems.module.css';
import {WeatherItem} from "./WeatherItem/WeatherItem";
import {weatherItemType} from "../../../types/weatherItemType";

interface ListItemsProps {
    weatherItems: weatherItemType[]
    deleteWeatherItem: (id: number) => void
    changeWeatherItem: (id: number, typeInp: string, value: string) => void
    onSetCityQueryString: (queryString: string) => void
}

export const ListItems: React.FC<ListItemsProps> = ({
                                                        weatherItems,
                                                        deleteWeatherItem,
                                                        changeWeatherItem,
                                                        onSetCityQueryString,
                                                    }): JSX.Element => {
    return (
        <div className={styles.app__listItems}>
            {weatherItems.map((item) => <WeatherItem key={item.id} deleteWeatherItem={deleteWeatherItem}
                                                     changeWeatherItem={changeWeatherItem}
                                                     onSetCityQueryString={onSetCityQueryString}
                                                     id={item.id} city={item.city} rainfall={item.rainfall}
                                                     temperature={item.temperature} coordinates={item.coordinates}/>
            )}
        </div>
    )
}


