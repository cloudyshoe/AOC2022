const daynoText = 'Day No. ';
const daynoNum = 1;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `1000
2000
3000

4000

5000
6000

7000
8000
9000

10000` 

function sumArray(arr) {
	return arr
		.split("\n\n")
		.map(e => e.split("\n").map(Number))
		.map(e => e.reduce((acc, cur) => acc + cur))
		.reduce((acc, cur) => acc > cur ? acc : cur);

}
function topThree(arr) {
	return arr
		.split("\n\n")
		.map(e => e.split("\n").map(Number))
		.map(e => e.reduce((acc, cur) => acc + cur))
		.reduce((acc, cur) => acc.some(e => e < cur) ? [...acc.sort((a, b) => a - b).slice(1), cur] : acc , [0,0,0])
		.reduce((acc, cur) => acc + cur);
}

const exampleResultOne = sumArray(example);
const resultOne = sumArray(input);
console.log(exampleResultOne);
document.getElementById('answer1').textContent = resultOne;

const exampleResultTwo = topThree(example);
const resultTwo = topThree(input);
console.log(exampleResultTwo);
document.getElementById('answer2').textContent = resultTwo;

/* Original Solution
const testFood = example.split("\n\n").map(e => e.split("\n")).map(e => e.reduce((a, b) => a + Number(b), 0));
const testResults = [];
sumArray(testFood, testResults, 1);

console.log(testResults[0]);

const food = input.split("\n\n").map(e => e.split("\n")).map(e => e.reduce((a, b) => a + Number(b), 0));
const results = [];
sumArray(food, results, 3);

function sumArray(inputArray, outputArray, n) {
	for (let i = 0; i < n; i++) {
		let foodResult = inputArray.reduce((a, b) => a < b ? b : a, 0);
		outputArray.push((outputArray[i-1] ?? 0) + foodResult);
		inputArray.splice(inputArray.findIndex(e => e == foodResult), 1);
	}
}

document.getElementById('answer1').textContent = results[0];
document.getElementById('answer2').textContent = results[2];
*/