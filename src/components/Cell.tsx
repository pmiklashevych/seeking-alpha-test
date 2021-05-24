import classes from './Cell.module.css';

type CellProps = {
    alive: number
};

const Cell = ({alive}: CellProps) => {
    const cls = [classes.Cell];

    if (alive) {
        cls.push(classes.CellAlive);
    } else {
        cls.push(classes.CellDead);
    }

    return <div className={cls.join(' ')}></div>;
}

export default Cell;
