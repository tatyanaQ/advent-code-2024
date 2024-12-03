const { readFile, arrayMultiplication, arraySum } = require("../utils");

function solvePuzzle(inputFileName) {
  const memories = readFile({ fileName: inputFileName, trimmed: true });
  const memory = memories.join("");

  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm;

  const multiplied = [...memory.matchAll(mulRegex)].map(
    ([, op1, op2]) => +op1 * +op2
  );

  const result = arraySum(multiplied);

  console.log(result);
}

module.exports = {
  solvePuzzle,
};
