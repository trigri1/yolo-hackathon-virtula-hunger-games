import Cell from './Cell';

type Coordinate = {
    x: number;
    y: number;
}

const SIZE = 10;

const WIDTH = SIZE;
const HEIGHT = SIZE;
const COLS = 2 * WIDTH + 1;
const ROWS = 2 * HEIGHT + 1; 


const generateMaze = (): Cell[][] => {
    const maze = initMaze(Cell.Empty);

    console.log('maze after init: ', maze);

    // place initial walls
    maze.forEach((row, r) => {
        row.forEach((cell, c) => {
          switch(r)
          {
            case 0:
            case ROWS - 1:
              maze[r][c] = Cell.Obstacle;
              break;
  
            default:
              if((r % 2) == 1) {
                if((c == 0) || (c == COLS - 1)) {
                  maze[r][c] = Cell.Obstacle;
                }
              } else if(c % 2 == 0) {
                maze[r][c] = Cell.Obstacle;
              }
  
          }
        });
      });

      console.log('maze after init walls: ', maze);

      // start partitioning
    //   maze_partitioned = partition(1, HEIGHT - 1, 1, WIDTH - 1, maze);

    return maze;

};

const initMaze = (value: number): Cell[][] => {
    return new Array(ROWS).fill(value).map(() => new Array(COLS).fill(value));
};

// const partition = (r1: number, r2: number, c1: number, c2: number, maze: Cell[][]): Cell[][] => {
//     // create partition walls
//     // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

//     let horiz:number, vert:number, x:number, y:number, start:number, end:number;

//     if((r2 < r1) || (c2 < c1)) {
//       return false;
//     }

//     if(r1 == r2) {
//       horiz = r1;
//     } else {
//       x = r1+1;
//       y = r2-1;
//       start = Math.round(x + (y-x) / 4);
//       end = Math.round(x + 3*(y-x) / 4);
//       horiz = rand(start, end);
//     }

//     if(c1 == c2) {
//       vert = c1;
//     } else {
//       x = c1 + 1;
//       y = c2 - 1;
//       start = Math.round(x + (y - x) / 3);
//       end = Math.round(x + 2 * (y - x) / 3);
//       vert = rand(start, end);
//     }

//     for(let i = posToWall(r1)-1; i <= posToWall(r2)+1; i++) {
//       for(let j = posToWall(c1)-1; j <= posToWall(c2)+1; j++) {
//         if((i == posToWall(horiz)) || (j == posToWall(vert))) {
//           maze[i][j] = ["wall"];
//         }
//       }
//     }

//     let gaps = this.shuffle([true, true, true, false]);

//     // create gaps in partition walls

//     if(gaps[0]) {
//       let gapPosition = this.rand(c1, vert);
//       this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
//     }

//     if(gaps[1]) {
//       let gapPosition = this.rand(vert+1, c2+1);
//       this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = [];
//     }

//     if(gaps[2]) {
//       let gapPosition = this.rand(r1, horiz);
//       this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = [];
//     }

//     if(gaps[3]) {
//       let gapPosition = this.rand(horiz+1, r2+1);
//       this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = [];
//     }

//     // recursively partition newly created chambers

//     this.partition(r1, horiz-1, c1, vert-1);
//     this.partition(horiz+1, r2, c1, vert-1);
//     this.partition(r1, horiz-1, vert+1, c2);
//     this.partition(horiz+1, r2, vert+1, c2);

//   }

  const posToWall = (x: number) => {
    return 2 * x;
  }

  const rand = (min: number, max: number) => {
    return min + Math.floor(Math.random() * (1 + max - min));
  }

// const initMaze = (): number[][] => {
//     var x: number[][] = new Array(SIZE);

//     for (let i = 0; i < x.length; i++) {
//         x[i] = initMazeRow();
//     }

//     return x;
// };



export { generateMaze };