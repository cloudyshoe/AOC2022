const daynoText = 'Day No. ';
const daynoNum = 5;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

// x = (n-1)/4
// n = (x * 4) + 1

const exampleArr = example.split("\n");
const exampleResultOne = parseAndMove(exampleArr);
console.log(exampleResultOne);
const inputArr = input.split("\n");
const resultOne = parseAndMove(inputArr);
document.getElementById('answer1').textContent = resultOne;
const exampleResultTwo = parseAndMove(exampleArr, true);
console.log(exampleResultTwo);
const resultTwo = parseAndMove(inputArr, true);
document.getElementById('answer2').textContent = resultTwo;

function createCrates(arr) {
    const num = Math.ceil(arr[0].length / 4);
    const temp = [];
    for (let i = 0; i < num; i++) {
        temp
            .push(new Array());
    }    
    return temp;
}

function parseAndMove(arr, retainOrder=false) {
    const letter = /\w/g;
    const crates = createCrates(arr);
    const crateList = arr.filter(e => e.includes('['));
    crateList.forEach(e => {
        while ((match = letter.exec(e)) != null) crates[(match.index-1)/4].push(match[0]);
    });
    const moves = arr.filter(e => e.includes('move'));
    moves.forEach(e => {
        let [count, from, to] = e
                                .replaceAll("move ", "")
                                .replaceAll(" from ", ",")
                                .replaceAll(" to ", ",")
                                .split(",");
        if (!retainOrder) {
            for (let j = 0; j < count; j++) {
                crates[to-1]
                    .splice(0, 0, ...(crates[from-1] .splice(0, 1)));
            } 
        } else {
            crates[to-1]
                .splice(0, 0, ...(crates[from-1] .splice(0, count)));
        }
    })
    return crates
        .map(e => e .splice(0, 1)) .toString() .replaceAll(",", "");
}

function parseAndMoveOld(arr, retainOrder=false) {
    const crates = createCrates(arr);

    for (let i = 0; i < arr.length; i++) {
        const letter = /[A-Z]/;
        if (arr[i].includes('[')) {
            Array .from(arr[i])
                .forEach((e, i) => {
                if (letter.test(e)) {
                    let num = (i-1)/4;
                    crates[num].push(e);
                }
            });
        } else if (arr[i].includes('move')) {
            let [count, from, to] = arr[i]
                                    .replaceAll("move ", "")
                                    .replaceAll(" from ", ",")
                                    .replaceAll(" to ", ",")
                                    .split(",");
            if (!retainOrder) {
                for (let j = 0; j < count; j++) {
                    crates[to-1]
                        .splice(0, 0, ...(crates[from-1] .splice(0, 1)));
                } 
            } else {
                crates[to-1]
                    .splice(0, 0, ...(crates[from-1] .splice(0, count)));
                }
            }
         else {
            continue;
        }
    }
    return crates
        .map(e => e .splice(0, 1)) .toString() .replaceAll(",", "");
}
    