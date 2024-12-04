const { readFile, arraySum } = require("../utils");

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  let counter = 0;

  for (let y = 1; y < lines.length - 1; y++) {
    for (let x = 1; x < lines[0].length - 1; x++) {
      const element = lines[y][x];
      if (element !== "A") {
        continue;
      }

      const l24 = `${lines[y - 1][x - 1]}${lines[y + 1][x + 1]}`;
      const l13 = `${lines[y - 1][x + 1]}${lines[y + 1][x - 1]}`;

      if ((l24 === "SM" || l24 === "MS") && (l13 === "SM" || l13 === "MS")) {
        counter++;
      }
    }
  }

  console.log(counter);
}

module.exports = {
  solvePuzzle,
};
