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

const exampleArr = example.split("\n");
console.log(something(exampleArr, 2));

const inputArr = input.split("\n");
document.getElementById('answer1').textContent = something(inputArr, 2);

const exampleTwoArr = exampleTwo.split("\n");
console.log(something(exampleTwoArr, 10));

document.getElementById('answer2').textContent = something(inputArr, 10);

function something(instructions, knots) {
    let rope = createRope(knots);
    const visited = new Set();
    for(let i = 0; i < instructions.length; i++) {
        [rope, tailCoords] = move(rope, instructions[i]); 
        for (coord of tailCoords) visited.add(coord);
    }
    return visited.size;
}

function createRope(knots) {
    return Array(knots).fill().map(e => ({x: 0, y:0}));
}

function move(rope, instruction) {
    const [direction, count] = instruction.split(" ");
    const [axis, step] = directions[direction];
    const visited = [];
    for (let i = 0; i < count; i++) {
        rope[0][axis] += step;
        for (let knot = 0; knot < rope.length -1; knot++) {
            [rope[knot], rope[knot+1]] = react(rope[knot], rope[knot+1]);
        }
        visited.push(rope[rope.length-1].x + "," + rope[rope.length-1].y);
    }
    return [rope, visited];
}

function react(head, tail) {
    const diffX = head.x - tail.x;
    const diffY = head.y - tail.y;
    const diffDim = Math.abs(diffX) + Math.abs(diffY);
    const diag = (Math.abs(diffX) == 1) && (Math.abs(diffY) == 1);
    if (diffDim == 2) {
        if (!diag) {
            diffX != 0 ? tail.x += diffX/Math.abs(diffX) : tail.y += diffY/Math.abs(diffY);
        }
    } else if (diffDim >= 3) {
        tail.x += diffX/Math.abs(diffX)
        tail.y += diffY/Math.abs(diffY)
    } 
    return [head, tail]
}