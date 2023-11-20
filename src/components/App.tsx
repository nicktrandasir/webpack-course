import React, {FC, useState} from 'react';
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";

type App = {}

export const App: FC<App> = () => {
    const [count, setCount] = useState(0)

    const onCLick = () => setCount(prev => prev + 1)

    return (
        <div className={classes.container}>
            <Link to={'/'}> Main page!</Link>
            <Link to={'/about'}> About page!</Link>
            <Link to={'/shop'}> Shop page!</Link>
            <br/>
            <button onClick={onCLick} className={classes.button}>
                Count
            </button>
            <br/>
            <span> {count}</span>
            <Outlet/>
        </div>

    );
};
