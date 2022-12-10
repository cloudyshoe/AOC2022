const daynoText = 'Day No. ';
const daynoNum = 10;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

/* addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
noop takes one cycle to complete. It has no other effect. */

const exampleArr = example.split("\n");
console.log(partOne(exampleArr));

const inputArr = input.split("\n");
document.getElementById('answer1').textContent = partOne(inputArr);

console.log(partTwo(exampleArr));

document.getElementById('answer2').textContent = partTwo(inputArr)

function partOne(arr) {
    let state = {
        cycles: 1,
        x: 1,
        opCycles: 0,
        opCyclesRemaining: 0,
        output: undefined
    }
    const output = [];

    for (let i =0; i < arr.length; i++) {
        if (/addx\s-*\d+/.test(arr[i])) {
            let op = arr[i].split(" ");
            let v = Number(op[1]);
            state = runCPU(state, 2, v);
        } else if (/noop/.test(arr[i])) {
            state = runCPU(state, 1);
        }        

        if (state.output != undefined) {
            output.push(state.output);
            state.output = undefined;    
        }
    }
    return output.reduce((acc, val) => acc + val, 0);
    
}

function runCPU(state, cycles, v=0) {
    state.opCyclesRemaining += cycles;
    while (state.opCyclesRemaining > 0) {
        state.cycles += 1;
        state.opCyclesRemaining -= 1;
        if (state.opCyclesRemaining == 0) state.x += v;
        if (((state.cycles-20) % 40 == 0) && state.cycles >= 20) state.output = state.x * state.cycles;
    }
    return state;
}

function partTwo(arr) {
    let state = {
        cycles: 0,
        x: 1,
        opCyclesRemaining: 0,
        output: ""
    }
    const output = [];

    for (let i =0; i < arr.length; i++) {
        if (/addx\s-*\d+/.test(arr[i])) {
            let op = arr[i].split(" ");
            let v = Number(op[1]);
            state = runGPU(state, 2, v);
        } else if (/noop/.test(arr[i])) {
            state = runGPU(state, 1);
        }        
    }
    
    for (let j = 0; j < state.output.length / 6; j++) {
        let start = j * 40;
        let end = start + 40
        output.push(state.output.slice(start,end));
    }
    return output.join("\r\n");
    
}

function runGPU(state, cycles, v=0) {
    state.opCyclesRemaining += cycles;
    while (state.opCyclesRemaining > 0) {
        state.output += (state.x-1 == state.cycles % 40 || state.x == state.cycles % 40 || state.x+1 == state.cycles % 40) ? "*" : " ";
        state.cycles += 1;
        state.opCyclesRemaining -= 1;
        if (state.opCyclesRemaining == 0) state.x += v;
    }
    return state;
}