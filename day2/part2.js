const { readFile } = require("../utils");

function isReportSafe(report, isOriginalReport) {
  // equal values will be left out by the diff = 0 condition
  let order = report[1] > report[0] ? 1 : -1;

  let i = 0;

  [].slice(0);

  while (i < report.length - 1) {
    const diff = report[i + 1] - report[i];
    if (diff * order <= 0 || Math.abs(diff) > 3) {
      if (isOriginalReport) {
        const safetiesWithTolerance = report.map((level, index) =>
          isReportSafe(
            report.slice(0, index).concat(report.slice(index + 1)),
            false
          )
        );
        return safetiesWithTolerance.some((isSafe) => !!isSafe);
      }
      return false;
    }
    i++;
  }

  return true;
}

function solvePuzzle(inputFileName) {
  const lines = readFile({ fileName: inputFileName, trimmed: true });

  const reports = lines.map((line) => line.split(" ").map(Number));

  const safeReports = reports.filter((report) => isReportSafe(report, true));

  console.log(safeReports.length);
}

module.exports = {
  solvePuzzle,
};
