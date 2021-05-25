# Seeking Alpha (React + TypeScript)

This is a small project built with React and TypeScript. The project solves the [problem](#the-problem) described below.
Here is a short description of the files:

- `src/components/Cell.tsx` is a represental component which shows dead or alive cells
- `src/component/Grid.tsx` is a stateful component which manages status ("dead" or "alive") of the cells per "tick"
- `src/component/Player.tsx` is a stateful component which decides when the grid should tick
- `App.tsx` is a component which shows a player with 50x50 grid with random initial state
- `src/util/helper.ts` is a helper which holds functions to generate/transform cell's statuses ("dead" or "alive")
  according to business requirements
- `src/util/helper.test.ts` is a set of tests to cover data generation and data transformation

## Getting started

- Clone the repo
- Run `npm i`
- Run `npm run start` to start the project on [http://localhost:3000](http://localhost:3000) (dev mode)
- Run `npm run test` to make sure the tests pass

## The Problem

You should start with a two-dimensional grid of 50x50 square cells and each of these cells are either alive or dead.
You can build a grid as a `<div>` or `<td>` with white background showing dead cells (we use 0 for example)
and living cells using `<div>` or `<td>` with black background (we use 1).

The initial configuration of living cells in this grid is arbitrary and should be random for every page refresh.

Here’s a smaller 5x5 example:

```
0 0 0 0 0
0 0 0 0 0
0 1 1 1 0
0 0 0 0 0
0 0 0 0 0
```

This grid is subject to changes on what is called a tick. When a grid "ticks",
these are the rules to determine the next state of the grid:


- Any live cell with fewer than two live neighbours dies (underpopulation).

- Any live cell with two or three live neighbours lives on to the next generation.

- Any live cell with more than three live neighbours dies (overcrowding).

- Any dead cell with exactly three live neighbours becomes a live cell (reproduction).

Try to look at the first state of this grid and apply the rules above.
The result will be the second grid, as shown below:

```
0 0 0 0 0
0 0 0 0 0
0 1 1 1 0
0 0 0 0 0
0 0 0 0 0
```
ticks to
```
0 0 0 0 0
0 0 1 0 0
0 0 1 0 0
0 0 1 0 0
0 0 0 0 0
```

That's all!

P.S. There are images of some grids ticking every ~0.4s (white is dead and black alive)
