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
let test = parseNew(exampleArr);

function createCrates(arr) {
    const num = Math.ceil(arr[0].length / 4);
    const temp = [];
    for (let i = 0; i < num; i++) {
        temp
            .push(new Array());
    }    
    return temp;
}

function parseNew(arr, retainOrder=false) {
    const crate = arr.filter(e => e.includes('['));
    const moves = arr.filter(e => e.includes('move'));
    return {moves, crate}
}

function parseAndMove(arr, retainOrder=false) {
    let crates = createCrates(arr);

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
                        .splice(0, 0, (crates[from-1] .splice(0, 1)));
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
    