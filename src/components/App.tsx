import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'

import styles from '../styles/App.module.css';
import {ComponentForRedux} from "./ComponentForRedux/ComponentForRedux";
import {ComponentForUseReducer} from "./ComponentForUseReducer/ComponentForUseReducer";

export const App: React.FC = (): JSX.Element => {
    return (
        <Router>
            <div className={styles.container}>
                <div className={styles.app}>
                    <div className={styles.app__header}>
                        <Link to="/useReducer">
                            <div className={styles.app__headerItem}>
                                Используем хук useReducer
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
                            <Route path="/useReducer">
                                <ComponentForUseReducer/>
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
