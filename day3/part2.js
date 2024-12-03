const { readFile, arrayMultiplication, arraySum } = require("../utils");

function solvePuzzle(inputFileName) {
  const memories = readFile({ fileName: inputFileName, trimmed: true });
  const memory = memories.join("");

  const [firstEnabled, ...checkForEnablement] = memory.split("don't()");

  const enabledAfterDisabled = checkForEnablement
    .map((betweenDonts) => {
      const [, ...enabled] = betweenDonts.split("do()");
      return enabled.join("");
    })
    .join("");

  const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm;

  const multiplied = [
    ...`${firstEnabled}${enabledAfterDisabled}`.matchAll(mulRegex),
  ].map(([, op1, op2]) => +op1 * +op2);

  const result = arraySum(multiplied);

  console.log(result);
}

module.exports = {
  solvePuzzle,
};
