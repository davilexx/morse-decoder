const MORSE_TABLE = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
};

function decode(expr) {
  const split = (arr, number, newArr) => {
    let i = 0;
    while (i < arr.length) {
      newArr.push(arr.slice(i, i + number));
      i += number;
    }
  };

  let splitByTen = [];
  split(expr, 10, splitByTen);

  splitByTen = splitByTen.map((e) => {
    if (e === "**********") {
      return " ";
    }
    return e;
  });

  let splitByTwo = [];
  splitByTen.forEach((e) => {
    let newArr = [];
    split(e, 2, newArr);
    splitByTwo.push(newArr);
  });

  let filtered = [];
  splitByTwo.forEach((e) => {
    filtered.push(e.filter((num) => num !== "00"));
  });

  let replaced = [];
  filtered.forEach((e) => {
    let decoded = "";
    e.forEach((num) => {
      if (num === "10") {
        decoded += num.replace("10", ".");
      } else {
        decoded += num.replace("11", "-");
      }
    });
    replaced.push(decoded);
  });

  let decodedFromMorse = [];
  replaced.forEach((e) => {
    if (MORSE_TABLE.hasOwnProperty(e)) {
      decodedFromMorse.push(MORSE_TABLE[e]);
    } else {
      decodedFromMorse.push(" ");
    }
  });

  return decodedFromMorse.join("");
}

module.exports = {
  decode,
};
