const { readFile } = require("../utils");

function isReportSafe(report) {
  // equal values will be left out by the diff = 0 condition
  let order = report[1] > report[0] ? 1 : -1;

  let i = 0;

  while (i < report.length - 1) {
    const diff = report[i + 1] - report[i];
    if (diff * order <= 0 || Math.abs(diff) > 3) {
      return false;
    }
    i++;
  }

  return true;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  const reports = lines.map((line) => line.split(" ").map(Number));

  const safeReports = reports.filter(isReportSafe);

  console.log(safeReports.length);
}

module.exports = {
  solvePuzzle,
};
