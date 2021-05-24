import classes from './Cell.module.css';

type CellProps = {
    status: number
};

const Cell = ({ status }: CellProps) => {
    const cls = [classes.Cell];

    if (status) {
        cls.push(classes.CellAlive);
    }
    else {
        cls.push(classes.CellDead);
    }

    return <div className={cls.join(' ')}></div>;
}

export default Cell;
