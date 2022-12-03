const daynoText = 'Day No. ';
const daynoNum = 3;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMD`

const priority = '.abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWYXZ'
const exampleArr = example.split("\n");
const exampleResultOne = exampleArr.map(e => [e.slice(0, e.length/2), e.slice(e.length/2, e.length)]).map(e => findRepeat(e)).map(e => priority.indexOf(e)).reduce((a,b) => a +b);
console.log(exampleResultOne);

const inputArr = input.split("\n");
const resultOne = inputArr.map(e => [e.slice(0, e.length/2), e.slice(e.length/2, e.length)]).map(e => findRepeat(e)).map(e => priority.indexOf(e)).reduce((a,b) => a +b);
document.getElementById('answer1').textContent = resultOne;

 function findRepeat(arr) {
	for (let i = 0; i < arr[1].length; i++) {
		if (arr.every(e => e.includes(arr[1][i]))) {
			return arr[1][i];
		}
	}
}

const exampleElves = groupElves(exampleArr);
const exampleResultTwo = exampleElves.map(e => findRepeat(e)).map(e => priority.indexOf(e)).reduce((a,b) => a + b);
console.log(exampleResultTwo);

const elves = groupElves(inputArr);
const resultTwo = elves.map(e => findRepeat(e)).map(e => priority.indexOf(e)).reduce((a,b) => a + b);
document.getElementById('answer2').textContent = resultTwo;

function groupElves(arr) {
	let tempArr = [];
	let retArr = [];
	for (let i = 0; i < arr.length; i++)	{
		tempArr.push(arr[i]);
		if (i % 3 == 2) {
			retArr.push(tempArr);
			tempArr = [];	
		};
	}
	return retArr;
}