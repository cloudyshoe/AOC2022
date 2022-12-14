const daynoText = 'Day No. ';
const daynoNum = 12;
const dayno = daynoText + daynoNum;
//document.getElementById('dayno').textContent = dayno;

const example = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`;

const input = await Deno.readTextFile("input.txt");

const exampleArr = example.split("\n").map(line => line.split(""));
const inputArr = input.split("\n").map(line => line.split(""));

const elevation = {
'S': 0,
'a': 0,
'b': 1,
'c': 2,
'd': 3,
'e': 4,
'f': 5,
'g': 6,
'h': 7,
'i': 8,
'j': 9,
'k': 10,
'l': 11,
'm': 12,
'n': 13,
'o': 14,
'p': 15,
'q': 16,
'r': 17,
's': 18,
't': 19,
'u': 20,
'v': 21,
'w': 22,
'x': 23,
'y': 24,
'z': 25,
'E': 25
}

let start = [];
let end = [];

function findStartEnd(arr) {
  let start = 0;
  let end = 0;
  for (let line = 0; line < arr.length; line++) {
      for (let char = 0; char < arr[line].length; char++) {
          if (arr[line][char] == 'S') {
              start = line + "," + char;
          } else if (arr[line][char] == 'E') {
              end = line + "," + char;
          }
      }
  }
  return [start, end]
}

function findAllStartEnd(arr) {
  let start = [];
  let end = 0;
  for (let line = 0; line < arr.length; line++) {
      for (let char = 0; char < arr[line].length; char++) {
          if (arr[line][char] == 'S' || arr[line][char] == 'a') {
              start.push(line + "," + char);
          } else if (arr[line][char] == 'E') {
              end = line + "," + char;
          }
      }
  }
  return [start, end]
}

function buildGraph(arr) {
    let graph = new Object(null);
    arr.forEach((line, y, lineArray) => line.forEach((char, x, charArray) => {
    graph[y + "," + x] = [];
    const height = elevation[char];
    const left = x - 1 >= 0                 ?   elevation[charArray[x-1]] <= height + 1    ? [y + "," + (x-1)] : false : false;
    const right = x + 1 < charArray.length  ?   elevation[charArray[x+1]] <= height + 1    ? [y + "," + (x+1)] : false : false;
    const up = y - 1 >= 0                   ?   elevation[lineArray[y-1][x]] <= height + 1 ? [(y-1) + "," + x] : false : false;
    const down = y + 1 < lineArray.length   ?   elevation[lineArray[y+1][x]] <= height + 1 ? [(y+1) + "," + x] : false : false;
    if (left) graph[y + "," + x].push(left);
    if (right) graph[y + "," + x].push(right);
    if (up) graph[y + "," + x].push(up);
    if (down) graph[y + "," + x].push(down);
    }));
    return graph;
}

// from Eloquent Javascript by Marijn Haverbeke    
function findRoute(graph, from, to) {
  let work = [{at: from, route: []}];
  for (let i = 0; i < work.length; i++) {
    let {at, route} = work[i];
    for (let place of graph[at]) {
      if (place == to) return route.concat(place).length;
      if (!work.some(w => w.at == place)) {
        work.push({at: place, route: route.concat(place)});
      }
    }
  }
}

function partOne(arr) {
  const [start, end] = findStartEnd(arr);
  const elevationGraph = buildGraph(arr);
  return findRoute(elevationGraph, start, end); 
}

function partTwo(arr) {
  let [start, end] = findAllStartEnd(arr);
  const elevationGraph = buildGraph(arr);
  let best = Infinity;
  for (let point of start) {
    let steps = findRoute(elevationGraph, point, end, best);
    if (steps < best) best = steps;
  }
  return best;
}

console.log(partOne(exampleArr));
console.log(partOne(inputArr));
console.log(partTwo(exampleArr));
console.log(partTwo(inputArr));