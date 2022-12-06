const daynoText = 'Day No. ';
const daynoNum = 6;
const dayno = daynoText + daynoNum;
document.getElementById('dayno').textContent = dayno;

const example = [`mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
`bvwbjplbgvbhsrlpgdmjqwftvncz`,
`nppdvjthqldpwncqszvftbrmjlhg`,
`nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg`,
`zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw`]
console.log(example.map(e => findStart(e)));
const resultOne = findStart(input);
document.getElementById('answer1').textContent = resultOne;
console.log(example.map(e => findStart(e, 14)));
const resultTwo = findStart(input, 14);
document.getElementById('answer2').textContent = resultTwo;

function findStart(str, len=4) {
    let strArr = Array.from(str);
    for (let i = 0; i < strArr.length; i++) {
        let candidate = new Set(strArr.slice(i, i+len));
        if (candidate.size == len) return i+len;
    }
}