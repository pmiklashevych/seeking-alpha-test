import React, { useState, useCallback, useEffect } from "react";
import Cell from "./Cell";
import { generateData, transformData } from "../util/helper";

import classes from './Grid.module.css';

type GridProps = {
    width: number,
    height: number,
    initialData?: number[][]
};

const Grid = ({ width, height, initialData }: GridProps) => {
    if (!initialData) {
        initialData = generateData(width, height);
    }

    const [data, setData] = useState(initialData);

    const nextTick = useCallback(() => {
        setData(prevData => transformData(prevData));
    }, []);

    useEffect(() => {
        // Start timer on mount using requestAnimationFrame instead of setInterval
        let start   = Date.now(),
            timerId = 0;

        const loop = () => {
            cancelAnimationFrame(timerId);
            timerId = requestAnimationFrame(loop);

            const
                current = Date.now(),
                delta   = current - start;

            // 400ms delay
            if (delta >= 400) {
                nextTick();
                start = Date.now();
            }
        }

        timerId = requestAnimationFrame(loop);
    }, [nextTick]);

    const grid = (data.length && data[0].length) ? data.map(
        (row, i) => {
            const cells = row.map((value, j) => <Cell key={j} status={value} />);
            return <div key={i} className={classes.Row}>{cells}</div>
        }
    ) : null;

    return <>
        <button onClick={nextTick}>Update</button>
        {grid ? <div data-testid="grid-element" className={classes.Grid}>{grid}</div> : 'Enter correct grid dimension'}
    </>;
}

export default Grid;
