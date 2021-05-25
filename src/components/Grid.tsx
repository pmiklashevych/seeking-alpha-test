import React, { useState, useEffect, useMemo } from "react";
import Cell from "./Cell";
import { generateData, transformData } from "../util/helper";

import classes from './Grid.module.css';

type GridProps = {
    width: number,
    height: number,
    generation: number,
    initialData?: number[][]
};

const Grid = ({ width, height, generation, initialData }: GridProps) => {
    const [data, setData] = useState(initialData || [[0]]);

    // Update data for each generation
    useEffect(() => {
        if (generation > 0) {
            setData(prevData => transformData(prevData));
        }
    }, [generation]);

    // Init/reset data when generation is 0
    useEffect(() => {
        if (generation === 0) {
            setData(generateData(width, height));
        }
    }, [generation, width, height]);

    const grid = useMemo(() => {
        return (data.length && data[0].length) ? data.map(
            (row, i) => {
                const cells = row.map((value, j) => <Cell key={j} status={value} />);
                return <div key={i} className={classes.Row}>{cells}</div>
            }
        ) : null
    }, [data]);

    return grid
        ? <div data-testid="grid-element" className={classes.Grid}>{grid}</div>
        : <p>Provide correct grid dimension</p>;
}

export default Grid;
