import React, {useState} from 'react';
import {Link, BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import styles from '../styles/App.module.css';

import {ComponentForUseState} from "./ComponentForUseState/ComponentForUseState";
import {ComponentForRedux} from "./ComponentForRedux/ComponentForRedux";

const App: React.FC = () => {
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
                                <ComponentForUseState/>
                            </Route>
                            <Route path="/redux">
                                <ComponentForRedux/>
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export {App}
