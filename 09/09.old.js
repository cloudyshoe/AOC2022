const daynoText = 'Day No. ';
const daynoNum = 9;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2 `;

const exampleTwo = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`;

const directions = {
    U: ['y',  1],
    D: ['y', -1],
    R: ['x', 1],
    L: ['x', -1]
}

const nonsenseDirections = {
    U: [1,  1],
    D: [1, -1],
    R: [0, 1],
    L: [0, -1]
}
const exampleArr = example.split("\n");
const exampleArrTwo = exampleTwo.split("\n");
const inputArr = input.split("\n");
const exampleResultOne = trackLocation(exampleArr);
console.log(exampleResultOne);
const resultOne = trackLocation(inputArr);
document.getElementById('answer1').textContent = resultOne;

const exampleResultTwo = trackLocations(exampleArrTwo);
console.log(exampleResultTwo);

const resultTwo = trackLocations(inputArr);
document.getElementById('answer2').textContent = resultTwo;

function parseInstructions(arr) {
    return arr.map(e => {
        const [dir, amt] = e.split(" ");
        const [axis, step] = directions[dir];
        return [axis, step, Number(amt)];
    });
    // ['x', 1, 4]
}

function nonsenseParseInstructions(arr) {
    return arr.map(e => {
        const [dir, amt] = e.split(" ");
        const [axis, step] = nonsenseDirections[dir];
        return [axis, step, Number(amt)];
    });
    // ['x', 1, 4]
}

function move(head, tail, instruction) {
    const [axis, step, count] = instruction;
    const visited = [];
    for (let i = 0; i < count; i++) {
        head[axis] += step; 
        const diffX = head.x - tail.x;
        const diffY = head.y - tail.y;
        const diffDim = Math.abs(diffX) + Math.abs(diffY);
        const diag = (Math.abs(diffX) == 1) && (Math.abs(diffY) == 1);

        if (diffDim == 2) {
            if (!diag) {
                diffX != 0 ? tail.x += diffX/Math.abs(diffX) : tail.y += diffY/Math.abs(diffY);
                visited.push(String(tail.x + "," + tail.y));
            }
        } else if (diffDim == 3) {
            tail.x += diffX/Math.abs(diffX)
            tail.y += diffY/Math.abs(diffY)
            visited.push(String(tail.x + "," + tail.y));
        } 
    }
    return [head, tail, visited];
}

function trackLocation(arr) {
    const parsedArr = parseInstructions(arr);
    let head = {x: 0, y: 0};
    let tail = {x: 0, y: 0};
    const visited = new Set();
    visited.add(tail.x + "," + tail.y);

    for (let i = 0; i < parsedArr.length; i++) {
        const instruction = parsedArr[i];
        let history = [];
        [head, tail, history] = move(head, tail, instruction);
        for (val of history) visited.add(val); 
    }
    return visited.size;
}

function trackLocations(arr) {
    const parsedArr = nonsenseParseInstructions(arr);
    let snake = [];
    for (k = 0; k < 10; k++) {
        snake.push([0, 0]);
    }
    const visited = new Set();
    visited.add(snake[9].x + "," + snake[9].y);

    for (let i = 0; i < parsedArr.length; i++) {
        const instruction = parsedArr[i];
        let history = [];
        [snake, history] = moves(snake, instruction);
        for (val of history) visited.add(val); 
    }
    return visited.size -1;
}

function moves(snake, instruction) {
    const [axis, step, count] = instruction;
    const visited = [];
    for (let i = 0; i < count; i++) {
        snake[0][axis] += step; 
        for (let j = 0; j < snake.length - 1; j++) {
            [snake[j], snake[j+1]] = nonsense(snake[j], snake[j+1]);
        }
        visited.push(snake[9][0] + "," + snake[9][1]);
    }
    return [snake, visited];
}

function nonsense(head, tail) {
    const diffX = head[0] - tail[0];
    const diffY = head[1] - tail[1];
    const diffDim = Math.abs(diffX) + Math.abs(diffY);
    const diag = (Math.abs(diffX) == 1) && (Math.abs(diffY) == 1);
    if (diffDim == 2) {
        if (!diag) {
            diffX != 0 ? tail[0] += diffX/Math.abs(diffX) : tail[1] += diffY/Math.abs(diffY);
        }
    } else if (diffDim >= 3) {
        tail[0] += diffX/Math.abs(diffX)
        tail[1] += diffY/Math.abs(diffY)
    } 
    return [head, tail]
}