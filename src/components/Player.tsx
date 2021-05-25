import React, { useState, useCallback, useEffect } from "react";
import Grid from "./Grid";

import classes from './Player.module.css';

type GridProps = {
    width: number,
    height: number,
    initialData?: number[][],
    autoPlay?: boolean
};

const Player = ({ width, height, initialData, autoPlay = true }: GridProps) => {
    const [frame, setFrame] = useState(0);
    const [delay] = useState(400);
    const [play, setPlay] = useState(autoPlay);

    const nextFrame = useCallback(() => {
        setFrame(prevFrame => prevFrame + 1);
    }, []);

    const pauseResume = useCallback(() => {
        setPlay(prevPlay => !prevPlay);
    }, []);

    const restart = useCallback(() => {
        setPlay(false);
        setFrame(0);
    }, []);

    // Start timer on mount using requestAnimationFrame
    useEffect(() => {
        let start   = Date.now(),
            timerId = 0;

        if (play) {
            const loop = () => {
                cancelAnimationFrame(timerId);
                timerId = requestAnimationFrame(loop);

                const
                    current = Date.now(),
                    delta   = current - start;

                if (delta >= delay) {
                    nextFrame();
                    start = Date.now();
                }
            }

            timerId = requestAnimationFrame(loop);
        }
        else {
            cancelAnimationFrame(timerId);
        }

        return () => {
            cancelAnimationFrame(timerId);
        }
    }, [nextFrame, delay, play]);

    return <div className={classes.Player}>
        <div className={classes.Toolbar}>
            <button onClick={pauseResume}>{play ? 'Stop' : 'Play'}</button>
            <button onClick={nextFrame} disabled={play}>Next</button>
            <button onClick={restart}>Reset</button>
        </div>
        <Grid width={width} height={height} generation={frame} initialData={initialData} />
    </div>;
}

export default Player;
