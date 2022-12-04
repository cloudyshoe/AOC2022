const daynoText = 'Day No. ';
const daynoNum = 4;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const exampleArr = example.split("\n");
const exampleResultOne = exampleArr.reduce((sum, curr) => {
        const [startOne, endOne, startTwo, endTwo] = curr.split(",").map(e => e.split('-').map(e => Number(e))).flat();
        const elfOne = Array(endOne - startOne + 1).fill().map((e,i) => i + startOne);
        const elfTwo = Array(endTwo - startTwo + 1).fill().map((e,i) => i + startTwo);
        const whollyContains = (elfOne.every(e => elfTwo.includes(e)) || elfTwo.every(e => elfOne.includes(e))) ? 1 : 0;
        return sum + whollyContains;
    }, 0
);
console.log(exampleResultOne);

const inputArr = input.split("\n");
const resultOne = inputArr.reduce((sum, curr) => {
        const [startOne, endOne, startTwo, endTwo] = curr.split(",").map(e => e.split('-').map(e => Number(e))).flat();
        const elfOne = Array(endOne - startOne + 1).fill().map((e,i) => i + startOne);
        const elfTwo = Array(endTwo - startTwo + 1).fill().map((e,i) => i + startTwo);
        const whollyContains = (elfOne.every(e => elfTwo.includes(e)) || elfTwo.every(e => elfOne.includes(e))) ? 1 : 0;
        return sum + whollyContains;
    }, 0
);
document.getElementById('answer1').textContent = resultOne;

const exampleResultTwo = exampleArr.reduce((sum, curr) => {
        const [startOne, endOne, startTwo, endTwo] = curr.split(",").map(e => e.split('-').map(e => Number(e))).flat();
        const elfOne = Array(endOne - startOne + 1).fill().map((e,i) => i + startOne);
        const elfTwo = Array(endTwo - startTwo + 1).fill().map((e,i) => i + startTwo);
        const fullyOverlaps = (elfOne.some(e => elfTwo.includes(e))) ? 1 : 0;
        return sum + fullyOverlaps;
    }, 0
);
console.log(exampleResultTwo);

const resultTwo = inputArr.reduce((sum, curr) => {
        const [startOne, endOne, startTwo, endTwo] = curr.split(",").map(e => e.split('-').map(e => Number(e))).flat();
        const elfOne = Array(endOne - startOne + 1).fill().map((e,i) => i + startOne);
        const elfTwo = Array(endTwo - startTwo + 1).fill().map((e,i) => i + startTwo);
        const partiallyOverlaps = (elfOne.some(e => elfTwo.includes(e))) ? 1 : 0;
        return sum + partiallyOverlaps;
    }, 0
);
document.getElementById('answer2').textContent = resultTwo;