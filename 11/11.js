const daynoText = 'Day No. ';
const daynoNum = 11;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`;

const input = `Monkey 0:
Starting items: 97, 81, 57, 57, 91, 61
Operation: new = old * 7
Test: divisible by 11
  If true: throw to monkey 5
  If false: throw to monkey 6

Monkey 1:
Starting items: 88, 62, 68, 90
Operation: new = old * 17
Test: divisible by 19
  If true: throw to monkey 4
  If false: throw to monkey 2

Monkey 2:
Starting items: 74, 87
Operation: new = old + 2
Test: divisible by 5
  If true: throw to monkey 7
  If false: throw to monkey 4

Monkey 3:
Starting items: 53, 81, 60, 87, 90, 99, 75
Operation: new = old + 1
Test: divisible by 2
  If true: throw to monkey 2
  If false: throw to monkey 1

Monkey 4:
Starting items: 57
Operation: new = old + 6
Test: divisible by 13
  If true: throw to monkey 7
  If false: throw to monkey 0

Monkey 5:
Starting items: 54, 84, 91, 55, 59, 72, 75, 70
Operation: new = old * old
Test: divisible by 7
  If true: throw to monkey 6
  If false: throw to monkey 3

Monkey 6:
Starting items: 95, 79, 79, 68, 78
Operation: new = old + 3
Test: divisible by 3
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 7:
Starting items: 61, 97, 67
Operation: new = old + 4
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 5`;

const exampleArr = example.split("\n\n").map(e => e.split("\n"));
const inputArr = input.split("\n\n").map(e => e.split("\n"));


function monkeyBusiness(arr) {

    function operations([x, op, y]) {
        let a = /\d+/.test(x) ? Number(x) : undefined;
        let b = /\d+/.test(y) ? Number(y) : undefined;
        return (op == '*') ? (old) => (a ?? old) * (b ?? old)  : (old) => (a ?? old) + (b ?? old);

    }

    function tests(divisor, ifTrue, ifFalse) {
        return (item) => item % divisor == 0 ? monkeys[ifTrue].items.push(item) : monkeys[ifFalse].items.push(item);
    }

    function createMonkeyList(arr) {
        return arr.map(monkey => (
                {
                    num: Number(monkey[0].match(/\d+/)[0]),
                    items: monkey[1].match(/\d.*/)[0].split(",").map(Number),
                    operation: operations(monkey[2].match(/new\s=\s(.*)/)[1].split(" ")),
                    test: tests(Number(monkey[3].match(/\d+/)[0]), Number(monkey[4].match(/\d+/)[0]), Number(monkey[5].match(/\d+/)[0])),
                    inspections: 0
                }
            )
        )
    }
    const monkeys = createMonkeyList(arr); 
    
    for (let round = 0; round < 20; round++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                item = monkey.operation(item);
                item = Math.floor(item / 3);
                monkey.test(item);
                monkey.inspections++;
            });
            monkey.items = [];
        })
    }
    return monkeys.map(monkey => monkey.inspections).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b);
}

function monkeyerBusiness(arr) {

    function operations([x, op, y]) {
        let a = /\d+/.test(x) ? Number(x) : undefined;
        let b = /\d+/.test(y) ? Number(y) : undefined;
        return (op == '*') ? (old, divisor) => ((a ?? old) * (b ?? old)) % divisor : (old, divisor) => ((a ?? old) + (b ?? old)) % divisor;

    }

    function createMonkeyList(arr) {
        return arr.map(monkey => (
                {
                    num: Number(monkey[0].match(/\d+/)[0]),
                    items: monkey[1].match(/\d.*/)[0].split(",").map(e => {
                        let modList = new Map();
                        mods.forEach(mod => modList.set(mod, Number(e) % mod));
                        return modList;
                    }),
                    operation: operations(monkey[2].match(/new\s=\s(.*)/)[1].split(" ")),
                    ifTrue: Number(monkey[4].match(/\d+/)[0]),
                    ifFalse: Number(monkey[5].match(/\d+/)[0]),
                    divisor: Number(monkey[3].match(/\d+/)[0]),
                    inspections: 0
                }
            )
        )
    }
    
    const mods = new Set();
    for (let mod of arr.map(monkey => monkey.filter(line => line.startsWith('Test'))).map(mod => Number(mod[0].match(/\d+/)[0]))) {
        mods.add(mod);
    }
    const monkeys = createMonkeyList(arr); 
    
    for (let round = 0; round < 10000; round++) {
        monkeys.forEach(monkey => {
            monkey.items.forEach(item => {
                item.forEach((val, key) => {
                    item.set(key, monkey.operation(val, key));
                })
                item.get(monkey.divisor) == 0 ? monkeys[monkey.ifTrue].items.push(item) : monkeys[monkey.ifFalse].items.push(item);
                monkey.inspections++;
            });
            monkey.items = [];
        })
    }
    return monkeys.map(monkey => monkey.inspections).sort((a, b) => b - a).slice(0, 2).reduce((a, b) => a * b);
}

console.log(monkeyBusiness(exampleArr));
let resultOne = monkeyBusiness(inputArr);
console.log(resultOne);
console.log(monkeyerBusiness(exampleArr));
let resultTwo = monkeyerBusiness(inputArr);
console.log(resultTwo);
document.getElementById('answer1').textContent = resultOne;
document.getElementById('answer2').textContent = resultTwo;