const { readFile, arraySum } = require("../utils");

function formLists(lines) {
  const locationRegex = /(\d+)\s+(\d+)/;

  return lines.reduce(
    ({ leftList, rightList }, line) => {
      const [, leftLocationId, rightLocationId] = line.match(locationRegex);
      return {
        leftList: leftList.concat(+leftLocationId),
        rightList: rightList.concat(+rightLocationId),
      };
    },
    { leftList: [], rightList: [] }
  );
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });
  const { leftList, rightList } = formLists(lines);

  leftList.sort((a, b) => a - b);
  rightList.sort((a, b) => a - b);

  const distances = leftList.map((leftLocationId, index) => {
    const rightLocationId = rightList[index];
    return Math.abs(leftLocationId - rightLocationId);
  });

  const totalDistance = arraySum(distances);

  console.log(totalDistance);
}

module.exports = {
  solvePuzzle,
};
