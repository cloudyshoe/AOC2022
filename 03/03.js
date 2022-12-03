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
const exampleResultOne = exampleArr.map(e => [e.slice(0, e.length/2), e.slice(e.length/2, e.length)]).map(e => findRepeat(e)).map(e => priority.indexOf(e)).reduce((a,b) => a + b);
console.log(exampleResultOne);

const inputArr = input.split("\n");
const resultOne = inputArr.map(e => [e.slice(0, e.length/2), e.slice(e.length/2, e.length)]).map(e => findRepeat(e)).map(e => priority.indexOf(e)).reduce((a,b) => a +b);
document.getElementById('answer1').textContent = resultOne;

 function findRepeat(arr) {
	 let testArr = arr.shift();
	 for (let i = 0; i < testArr.length; i++) {
		if (arr.every(e => e.includes(testArr[i]))) {
			return testArr[i];
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
	let retArr = [];
	while (arr.length > 0) {
		let tempArr = [];
		for (let i = 0; i < 3; i++) {
			tempArr.push(arr.shift());
		}
		retArr.push(tempArr);
	}
	return retArr;
}