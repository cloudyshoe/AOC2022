const daynoText = 'Day No. ';
const daynoNum = 7;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k` 

const exampleArr = example.split("\n");
const inputArr = input.split("\n");
const exampleResultOne = parseAndSolve(exampleArr);
console.log(exampleResultOne);
const resultOne = parseAndSolve(inputArr);
document.getElementById('answer1').textContent = resultOne;
const exampleResultTwo = parseAndSolve(exampleArr, 30000000, 70000000, 2);
console.log(exampleResultTwo);
const resultTwo = parseAndSolve(inputArr, 30000000, 70000000, 2);
document.getElementById('answer2').textContent = resultTwo;

function parseAndSolve(arr, targetSize=100000, totalSpace=0, part=1) {
    const path = [];
    const dirSize = new Map();
    const cdin = /\$\scd\s[^.]+/;
    const cdout = /\$\scd\s\.\./;
    const file = /[0-9]+/;
    arr.forEach(e => {
        if (cdin.test(e)) {
            const dir = e.split(" ")[2];
            const newDir = (path[path.length-1] ?? "") + dir + "/";
            path.push(newDir.replace("//", "/"));
        } else if (cdout.test(e)) {
            path.pop();
        } else if (file.test(e)) {
            const [bytes, ] = e.split(" ");
            for (dir of path) {
                dirSize.set(dir, (dirSize.get(dir) ?? 0) + Number(bytes));
            }
        }
    });
    let result = 0;
    if (part == 1) {
        for (value of dirSize.values()) {
            if (value <= targetSize) {
                result += value;
            }
        }
    }

    if (part == 2) {
        const freeSpace = totalSpace - dirSize.get('/');
        const needSpace = targetSize - freeSpace;
        result = Array.from(dirSize).flat().filter(e => Number.isInteger(e) && e >= needSpace).reduce((acc, val) => Math.min(acc, val));
    }
    return result;
}