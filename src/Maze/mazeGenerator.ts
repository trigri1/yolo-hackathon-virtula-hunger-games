export enum Cell {
  Empty,
  Rock,
  Treasure,
  Enemy,
  Character_1,
  Character_2,
  Character_3,
}

export class MazeBuilder {
  private readonly width: number;
  private readonly height: number;
  private readonly cols: number;
  private readonly rows: number;
  public readonly maze: Cell[][];

  constructor(width = 10, height = 10) {

    this.width = width;
    this.height = height;

    this.cols = 2 * this.width + 1;
    this.rows = 2 * this.height + 1;

    this.maze = this.initArray(Cell.Empty);

    // place initial walls
    this.maze.forEach((row, r) => {
      row.forEach((_cell, c) => {
        if((r % 2) == 1) {
        } else if(c % 2 == 0) {
          this.maze[r][c] = Cell.Rock;
        }
      });
    });

    // start partitioning
    this.partition(1, this.height - 1, 1, this.width - 1);
    this.placeTreasure();
    this.placeEnemies();
    this.placeCharacters();
  }

  placeCharacters() {
    let fr: number, fc: number;
    [fr, fc] = this.getFreeLocation();
    this.maze[fr][fc] = Cell.Character_1;

    [fr, fc] = this.getFreeLocation();
    this.maze[fr][fc] = Cell.Character_2;

    [fr, fc] = this.getFreeLocation();
    this.maze[fr][fc] = Cell.Character_3;
  }

  placeEnemies() {
    const enemies = this.rand(3, 20);
    let fr: number, fc: number;
    for (let i = 0; i < enemies; i++) {
      [fr, fc] = this.getFreeLocation();
      this.maze[fr][fc] = Cell.Enemy;
    }
  }

  placeTreasure() {
  
    let fr: number, fc: number;
    [fr, fc] = this.getFreeLocation();
    this.maze[fr][fc] = Cell.Treasure;
  }

  getFreeLocation(): [number, number] {
    let ok = false;
    let fr=0, fc=0;

    while(!ok) {
      fr = this.rand(1, this.cols - 1)
      fc = this.rand(1, this.rows - 1)

      if(this.maze[fr][fc] === Cell.Empty) {
        ok = true;
      }
    }
    return [fr, fc];
  }

  initArray(value: Cell): Cell[][] {
    return new Array(this.rows).fill([]).map(() => new Array(this.cols).fill(value));
  }

  rand(min: number, max: number) {
    return min + Math.floor(Math.random() * (1 + max - min));
  }

  posToSpace(x: number) {
    return 2 * (x - 1) + 1;
  }

  posToWall(x: number) {
    return 2 * x;
  }

  inBounds(r: number, c: number) {
    return !((this.maze[r] === undefined) || (this.maze[r][c] === undefined));
  }

  shuffle(array: boolean[]) {
    // sauce: https://stackoverflow.com/a/12646864
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  partition(r1: number, r2: number, c1: number, c2: number): void {
    // create partition walls
    // ref: https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_division_method

    let horiz, vert, x, y, start, end;

    if ((r2 < r1) || (c2 < c1)) {
      return;
    }

    if (r1 == r2) {
      horiz = r1;
    } else {
      x = r1 + 1;
      y = r2 - 1;
      start = Math.round(x + (y - x) / 4);
      end = Math.round(x + 3 * (y - x) / 4);
      horiz = this.rand(start, end);
    }

    if (c1 == c2) {
      vert = c1;
    } else {
      x = c1 + 1;
      y = c2 - 1;
      start = Math.round(x + (y - x) / 3);
      end = Math.round(x + 2 * (y - x) / 3);
      vert = this.rand(start, end);
    }

    for (let i = this.posToWall(r1) - 1; i <= this.posToWall(r2) + 1; i++) {
      for (let j = this.posToWall(c1) - 1; j <= this.posToWall(c2) + 1; j++) {
        if ((i == this.posToWall(horiz)) || (j == this.posToWall(vert))) {
          this.maze[i][j] = Cell.Rock;
        }
      }
    }

    let gaps = this.shuffle([true, true, true, false]);

    // create gaps in partition walls

    if (gaps[0]) {
      let gapPosition = this.rand(c1, vert);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = Cell.Empty;
    }

    if (gaps[1]) {
      let gapPosition = this.rand(vert + 1, c2 + 1);
      this.maze[this.posToWall(horiz)][this.posToSpace(gapPosition)] = Cell.Empty;
    }

    if (gaps[2]) {
      let gapPosition = this.rand(r1, horiz);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = Cell.Empty;
    }

    if (gaps[3]) {
      let gapPosition = this.rand(horiz + 1, r2 + 1);
      this.maze[this.posToSpace(gapPosition)][this.posToWall(vert)] = Cell.Empty;
    }

    // recursively partition newly created chambers

    this.partition(r1, horiz - 1, c1, vert - 1);
    this.partition(horiz + 1, r2, c1, vert - 1);
    this.partition(r1, horiz - 1, vert + 1, c2);
    this.partition(horiz + 1, r2, vert + 1, c2);

  }
}
