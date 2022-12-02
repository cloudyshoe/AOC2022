const daynoText = 'Day No. ';
const daynoNum = 2;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `A Y
B X
C Z`;

/* a,x = rock
 * b,y = paper
 * c,z = scissors */

const rules = new Map();
rules.set('X', {name: 'Rock', ties: 'A', beats: 'C', points: 1});
rules.set('Y', {name: 'Paper', ties: 'B', beats: 'A', points: 2});
rules.set('Z', {name: 'Scissors', ties: 'C', beats: 'B', points: 3});

let roundScores = example.split("\n").map(e => scoreRound(e));
let totalScore = roundScores.reduce((a, b) => a + b);
console.log(totalScore);

roundScores = input.split("\n").map(e => scoreRound(e));
totalScore = roundScores.reduce((a, b) => a + b);

document.getElementById('answer1').textContent = totalScore;

function scoreRound(round) {
	let score = 0;
	let choices = round.split(" ");
	let you = choices[1];
	let opp = choices[0];
	score += rules.get(you).points;
	if (rules.get(you).beats == opp) { score += 6; }
	if (rules.get(you).ties == opp) { score += 3; }
	return score;
}

const newRules = new Map();
newRules.set('A', {name: 'Rock', equals: 'A', beats: 'C', loses: 'B', points: 1});
newRules.set('B', {name: 'Paper', equals: 'B', beats: 'A', loses: 'C', points: 2});
newRules.set('C', {name: 'Scissors', equals: 'C', beats: 'B', loses: 'A', points: 3});
newRules.set('X', {strategy: 'beats', points: 0});
newRules.set('Y', {strategy: 'equals', points: 3});
newRules.set('Z', {strategy: 'loses', points: 6});

roundScores = example.split("\n").map(e => revisedScoreRound(e));
totalScore = roundScores.reduce((a, b) => a + b);
console.log(totalScore);

roundScores = input.split("\n").map(e => revisedScoreRound(e));
totalScore = roundScores.reduce((a, b) => a + b);

function revisedScoreRound(round) {
	let score = 0;
	let choices = round.split(" ");
	let opp = choices[0];
	let outcome = newRules.get(choices[1]);
	let strategy = outcome.strategy;
	score += outcome.points;
	score += newRules.get(newRules.get(opp)[strategy]).points;
	return score;
}

document.getElementById('answer2').textContent = totalScore;
