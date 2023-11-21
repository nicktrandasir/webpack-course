import React, {FC, useState} from 'react';
import classes from './App.module.scss'
import {Link, Outlet} from "react-router-dom";
import BitcoinPng from '@/assets/bitcoin.png'
import BitcoinJpeg from '@/assets/bitcoin.jpg'
import BitcoinSvg from '@/assets/bitcoin.svg'

type App = {}

export const App: FC<App> = () => {
    const [count, setCount] = useState(0)

    const onCLick = () => setCount(prev => prev + 1)

    if (__PLATFORM__ === 'desktop') {  // Легко проверить собрав билд. Строка "Is mobile platform!" будет отсутствовать
        return <div>Is desktop platform!</div>
    }
    if (__PLATFORM__ === 'mobile') { // И тут наоборот
        return <div>Is mobile platform!</div>
    }
    if (__ENV__ === 'development') { // Проверка окружения
        return <div>Is development!</div>
    }


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

            <h1>Platform: {__PLATFORM__}</h1>

            <img src={BitcoinPng} alt=""/>
            <img src={BitcoinJpeg} alt=""/>
            {/*<img src={BitcoinSvg} alt=""/>*/}

            <BitcoinSvg color={'red'} width='100' height='100' />
        </div>

    );
};
