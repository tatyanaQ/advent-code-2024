const { readFile, arraySum } = require("../utils");

function countXmas(lines) {
  const xmas = "XMAS";
  const xmasBackwards = "SAMX";

  const xmasRegex = new RegExp(`(${xmas})`, "g");
  const xmasBackwardsRegex = new RegExp(`(${xmasBackwards})`, "g");

  const countByLines = lines.map(
    (line) =>
      [...(line.matchAll(xmasRegex) || [])].length +
      [...(line.matchAll(xmasBackwardsRegex) || [])].length
  );
  return arraySum(countByLines);
}

function formDiagonals13(lines) {
  const maxX = lines[0].length - 1;
  const maxY = lines.length - 1;

  let x = 0;
  let y = 0;

  const diagonals = [];

  const diagonal = [];

  do {
    let dx = x;
    let dy = y;

    do {
      const element = lines[dy][dx];
      diagonal.push(element);

      dx--;
      dy++;
    } while (dx >= 0 && dy <= maxY);

    diagonals.push(diagonal.join(""));
    diagonal.length = 0;

    if (x !== maxX) {
      x++;
    } else {
      y++;
    }
  } while (x !== maxX || y !== maxY + 1);

  return diagonals;
}

function formDiagonals24(lines) {
  const maxX = lines[0].length - 1;
  const maxY = lines.length - 1;

  let x = maxX;
  let y = 0;

  const diagonals = [];

  const diagonal = [];

  do {
    let dx = x;
    let dy = y;

    do {
      const element = lines[dy][dx];
      diagonal.push(element);

      dx++;
      dy++;
    } while (dx <= maxX && dy <= maxY);

    diagonals.push(diagonal.join(""));
    diagonal.length = 0;

    if (x !== 0) {
      x--;
    } else {
      y++;
    }
  } while (x !== 0 || y !== maxY + 1);

  return diagonals;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });
  const horizontal = countXmas(lines);

  const verticalLines = lines[0]
    .split("")
    .map((_, index) => lines.map((line) => line[index]).join(""));
  const vertical = countXmas(verticalLines);

  const diagonalLines13 = formDiagonals13(lines);
  const diagonal13 = countXmas(diagonalLines13);

  const diagonalLines24 = formDiagonals24(lines);
  const diagonal24 = countXmas(diagonalLines24);

  const result = horizontal + vertical + diagonal13 + diagonal24;

  console.log(result);
}

module.exports = {
  solvePuzzle,
};
