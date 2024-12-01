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

  const rightListAppearanceMap = rightList.reduce((acc, locationId) => {
    if (!acc[locationId]) {
      acc[locationId] = 0;
    }

    acc[locationId] += 1;

    return acc;
  }, {});

  const similarityScores = leftList.map((leftLocationId) => {
    const appearsOnRightList = rightListAppearanceMap[leftLocationId] || 0;
    return leftLocationId * appearsOnRightList;
  });

  const similarityScore = arraySum(similarityScores);

  console.log(similarityScore);
}

module.exports = {
  solvePuzzle,
};
