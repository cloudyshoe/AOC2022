const daynoText = 'Day No. ';
const daynoNum = 13;
const dayno = daynoText + daynoNum;
//document.getElementById('dayno').textContent = dayno;

const example = `498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`;

const input = await Deno.readTextFile("input.txt");

function getInput(arr) {
  let paths = {};
  arr
  .split("\n")
  .map(line => line
                .split(" ")
                .filter(elements => elements !== "->"))
  .forEach(line => {
    for (let i = 1; i < line.length; i++) {
      const [x,y] = line[i-1].split(",").map(Number);
      const [nx,ny] = line[i].split(",").map(Number);
      const xSame = x == nx;
      const ySame = y == ny;
      if (xSame) {
        const ys = Array(Math.abs(ny-y)+1).fill().map((e, i) => Math.min(ny,y) + i);
        ys.forEach(y => paths[`${x},${y}`] = {blocked: "rock"});
      } else {
        const xs = Array(Math.abs(nx-x)+1).fill().map((e, i) => Math.min(nx,x) + i);
        xs.forEach(x => paths[`${x},${y}`] = {blocked: "rock"});
      } 
    }
  });
  return paths;
}

function dropSand(paths, max) {
  let [x,y] = [500, 0];
  let blocked = 0;
  while(true) {
  // check down
    if (y >= max) return 0;
    if (!paths[`${x},${y+1}`] || paths[`${x},${y+1}`].blocked === false) {
      paths[`${x},${y+1}`] ??= {blocked: false};
      y += 1;
      blocked = 0;
      continue;
    } else {
      blocked += 1;
    }
  // check down-left
    if (!paths[`${x-1},${y+1}`] || paths[`${x-1},${y+1}`].blocked === false) {
      paths[`${x-1},${y+1}`] ??= {blocked: false};
      x -= 1;
      y += 1;
      blocked = 0;
      continue;
    } else {
      blocked += 1;
    }
  // check down-right  
    if (!paths[`${x+1},${y+1}`] || paths[`${x+1},${y+1}`].blocked === false) {
      paths[`${x+1},${y+1}`] ??= {blocked: false};
      x += 1;
      y += 1;
      blocked = 0;
      continue;
    } else {
      blocked += 1;
    }
    if (blocked === 3) {
      paths[`${x},${y}`] = {blocked: "sand"};
      return 1;
    }
    
  }
}

function dropSandTwo(paths, max) {
  let [x,y] = [500, 0];
  let blocked = 0;
  while(true) {
  // check down
    if (y == max-1) {
      paths[`${x},${y}`] = {blocked: "sand"};
      return 1;
    }
    if (!paths[`${x},${y+1}`] || paths[`${x},${y+1}`].blocked === false) {
      paths[`${x},${y+1}`] ??= {blocked: false};
      y += 1;
      blocked = 0;
      continue;
    } else {
      blocked += 1;
    }
  // check down-left
    if (!paths[`${x-1},${y+1}`] || paths[`${x-1},${y+1}`].blocked === false) {
      paths[`${x-1},${y+1}`] ??= {blocked: false};
      x -= 1;
      y += 1;
      blocked = 0;
      continue;
    } else {
      blocked += 1;
    }
  // check down-right  
    if (!paths[`${x+1},${y+1}`] || paths[`${x+1},${y+1}`].blocked === false) {
      paths[`${x+1},${y+1}`] ??= {blocked: false};
      x += 1;
      y += 1;
      blocked = 0;
      continue;
    } else {
      blocked += 1;
    }

    if (blocked === 3 && x === 500 && y === 0) {
      return 0;
    }

    if (blocked === 3) {
      paths[`${x},${y}`] = {blocked: "sand"};
      return 1;
    }
    
    
  }
}

function partOne(arr) {
  const paths = getInput(arr); 
  const max = Object.keys(paths).map(e => e.split("\n")).map(e => Number(e[0].split(",")[1])).reduce((a,b) => a > b ? a : b, 0);
  let sand = 0;
  while (true) {
    const abyss = dropSand(paths, max);
    if (abyss === 1) {
      sand += 1;
      continue;
    } else {
      return sand;
    }
  }
}

function partTwo(arr) {
  const paths = getInput(arr); 
  const max = Object.keys(paths).map(e => e.split("\n")).map(e => Number(e[0].split(",")[1])).reduce((a,b) => a > b ? a : b, 0) + 2;
  let sand = 0;
  while (true) {
    const abyss = dropSandTwo(paths, max);
    if (abyss === 1) {
      sand += 1;
      continue;
    } else {
      return sand+1;
    }
  }
}

console.log(partOne(example));
console.log(partOne(input));
console.log(partTwo(example));
console.log(partTwo(input));