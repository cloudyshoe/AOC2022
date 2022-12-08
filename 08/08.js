const daynoText = 'Day No. ';
const daynoNum = 8;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `30373
25512
65332
33549
35390`;

const exampleArr = example.split("\n");
const inputArr = input.split("\n");

const exampleResultOne = countVisible(exampleArr);
console.log(exampleResultOne);

const resultOne = countVisible(inputArr);
document.getElementById('answer1').textContent = resultOne;

const exampleResultTwo = scenicScore(exampleArr);
console.log(exampleResultTwo);

const resultTwo = scenicScore(inputArr);
document.getElementById('answer2').textContent = resultTwo;

function treesArray(arr) {
    return trees = arr.map(e => Array.from(e.split(""))).map(e=> e.map(Number));
}

function countVisible(arr) {
    const treeArr = treesArray(arr);
    return treeArr.reduce((vis, cur, y, outArr) => vis + cur.reduce((vis, cur, x, inArr) => 
    (x == 0 || x == inArr.length -1 || 
        y == 0 || y == outArr.length-1 || 
        inArr.slice(0,x).every(e => e < cur) || inArr.slice(x+1).every(e => e < cur) || 
        outArr.map(e => e[x]).slice(0, y).every(e => e < cur) || outArr.map(e => e[x]).slice(y+1).every(e => e < cur) )
    ? 1 + vis : vis , 0)
    , 0)
}

function scenicScore(arr) {
   const treeArr = treesArray(arr);
   return treeArr.reduce((scene, cur, y, outArr) => Math.max(scene, cur.reduce((scene, cur, x, inArr) => {
    const left = inArr.slice(0, x).reverse();
    const right = inArr.slice(x+1);
    const up = outArr.map(e => e[x]).slice(0, y).reverse();
    const down = outArr.map(e => e[x]).slice(y+1); 
    return Math.max(
        (left.every(e => e < cur) ? left.length : left.findIndex(e => e >= cur) + 1) *
        (right.every(e => e < cur) ? right.length : right.findIndex(e => e >= cur) + 1) *
        (up.every(e => e < cur) ? up.length : up.findIndex(e => e >= cur) + 1) * 
        (down.every(e => e < cur) ? down.length : down.findIndex(e => e >= cur) + 1), 
        scene)}
   , 0)), 0); 
}