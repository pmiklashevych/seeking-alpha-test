import React, {useState, useCallback, useEffect} from "react";
import Cell from "./Cell";
import {transformData} from "../util/helper";

import classes from './Grid.module.css';

type GridProps = {
    width: number,
    height: number,
    initialData?: number[][]
};

const generateData = (width: number, height: number): number[][] => {
    const grid = [];

    for (let i = 0; i < height; i++) {
        const row = [];

        for (let j = 0; j < width; j++) {
            row.push(Math.round(Math.random()));
        }

        grid.push(row);
    }

    return grid;
}

const Grid = ({width, height, initialData}: GridProps) => {
    if (!initialData) {
        initialData = generateData(width, height);
    }

    const [data, setData] = useState(initialData);

    const nextTick = useCallback(() => {
        setData(prevData => transformData(prevData));
    }, []);

    useEffect(() => {
        // Start timer on mount
        setInterval(nextTick, 400)
    }, [nextTick]);

    const grid = (data.length && data[0].length) ? data.map(
        (row, i) => {
            const cells = row.map((cell, j) => <Cell key={j} alive={cell} />);
            return <div key={i} className={classes.Row}>{cells}</div>
        }
    ) : null;

    return <>
        <button className={classes.Button} onClick={nextTick}>Update</button>
        {grid ? <div className={classes.Grid}>{grid}</div> : 'Enter correct grid dimension'}
    </>;
}

export default Grid;
