import React, {FC, useState} from 'react';
import './App.scss'

type App = {}

export const App: FC<App> = () => {
    const [count, setCount] = useState(0)

    const onCLick = () => setCount(prev => prev + 1)

    return (
        <div >
            <button onClick={onCLick}>
                Count
            </button>
            <span>{count}</span>
        </div>

    );
};
