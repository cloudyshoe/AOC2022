const daynoText = 'Day No. ';
const daynoNum = 13;
const dayno = daynoText + daynoNum;
//document.getElementById('dayno').textContent = dayno;

const example = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`;

const input = await Deno.readTextFile("input.txt");

const exampleArr = example;
const inputArr = input;

function getInput(arr) {
  return arr.split("\n\n")
    .map((group) => {
      const [left, right] = group.split("\n").map(JSON.parse);
    return {
      left,
      right
    }
  }) 
}

function getInput2(arr) {
  return arr.replace(/\n\n/g, "\n")
    .split("\n")
    .map(JSON.parse);
} 

function checkOrder(left, right, result) {
  const leftIsNumber = typeof left === "number";
  const rightIsNumber = typeof right === "number";
  if (leftIsNumber && rightIsNumber) {
    if (left < right) {
      result.rightOrder = true;
      return;
    }
    if (left > right) {
      result.rightOrder = false; 
      return;
    }
  } else if(!leftIsNumber && !rightIsNumber) {
    let index = 0;
    while (true) {
      if (index > left.length-1 && index <= right.length-1) {
        // left ran out of items
        result.rightOrder = true;
        return;
      } else if (index <= left.length-1 && index > right.length-1) {
        // right ran out of items
        result.rightOrder = false;
        return;
      } else if (index > left.length -1 && index > right.length -1) {
        // no decision, both lists ran out of items
        return;
      } 

      // compare the two elements
      checkOrder(left[index], right[index], result);
      // if we have set the variable rightOrder, stop
      if (typeof result.rightOrder !== "undefined") {
        return;
      }

      index++
    }
  } else {
    if (leftIsNumber) {
      checkOrder([left], right, result);
    } else {
      checkOrder(left, [right], result);
    }
  }
}

function partOne(arr) {
  const groups = getInput(arr);

const res =  groups.map(({left, right}, index) => {
    let result = {};
    checkOrder(left, right, result);
    return result.rightOrder ? index + 1 : 0;
  }).reduce((a, b) => a+b, 0);
  return res;
}

function partTwo(arr) {
  const lines = getInput2(arr).concat([[[2]], [[6]]]);
  const strings = lines
    .sort((a, b) => {
      const result = {};
      checkOrder(a, b, result);
      return result.rightOrder ? -1 : 1;
    }).map(x => JSON.stringify(x));
  
    const position2 = strings.indexOf('[[2]]') + 1;
    const position6 = strings.indexOf('[[6]]') + 1;
    
  return position2 * position6;
}

console.log(partOne(exampleArr));
console.log(partOne(inputArr));
console.log(partTwo(exampleArr));
console.log(partTwo(inputArr));