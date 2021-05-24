export const countAliveNeighbours = (data: number[][]): number[][] => {
    const
        height             = data.length,
        width              = data[0].length,
        aliveNeighbours    = generateData(width, height, 0),
        // 1 1 1
        // 1 0 1 // offset from the middle position
        // 1 1 1
        offsetPairsToCheck = [
            [-1, -1],
            [0, -1],
            [1, -1],
            [-1, 0],
            [1, 0],
            [-1, 1],
            [0, 1],
            [1, 1]
        ];

    for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
            const value = data[i][j];

            // If the cell is alive, increase its neighbours counter of alive neighbours
            if (value) {
                offsetPairsToCheck.forEach(([xOffset, yOffset]) => {
                    const
                        x = j + xOffset,
                        y = i + yOffset;

                    if (aliveNeighbours[y]?.[x] != null) {
                        aliveNeighbours[y][x]++;
                    }
                });
            }
        }
    }

    return aliveNeighbours;
}

export const transformData = (data: number[][]): number[][] => {
    const
        aliveNeighboursData = countAliveNeighbours(data),
        grid                = [];

    for (let i = 0; i < data.length; i++) {
        const row = [];

        for (let j = 0; j < data[i].length; j++) {
            const
                alive           = data[i][j],
                aliveNeighbours = aliveNeighboursData[i][j];

            // 0 - a dead cell
            // 1 - a live cell
            if (alive) {
                // Any live cell with fewer than two live neighbours dies (underpopulation).
                // Any live cell with more than three live neighbours dies (overcrowding).
                if (aliveNeighbours < 2 || aliveNeighbours > 3) {
                    row.push(0);
                }
                // Any live cell with two or three live neighbours lives on to the next generation.
                else {
                    row.push(1);
                }
            }
            else {
                // Any dead cell with exactly three live neighbours becomes a live cell (reproduction).
                if (aliveNeighbours === 3) {
                    row.push(1);
                }
                else {
                    row.push(0);
                }
            }
        }

        grid.push(row);
    }

    return grid;
}

export const generateData = (width: number, height: number, initValue?: number): number[][] => {
    const grid = [];

    for (let i = 0; i < height; i++) {
        const row = [];

        for (let j = 0; j < width; j++) {
            row.push(initValue ?? Math.round(Math.random()));
        }

        if (row.length) {
            grid.push(row);
        }
    }

    return grid;
}
