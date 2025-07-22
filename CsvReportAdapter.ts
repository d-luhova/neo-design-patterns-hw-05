import { ReportAdapter } from "./ReportAdapter";
import { DirectoryReport } from "./DirectoryReport";

export class CsvReportAdapter implements ReportAdapter {
  export(report: DirectoryReport): string {
    let csv = `Metric,Value
Total Files,${report.files}
Total Directories,${report.directories}
Total Size (bytes),${report.totalSize}

Extension,Count
`;

    for (const [ext, count] of Object.entries(report.extensions)) {
      csv += `${ext},${count}\n`;
    }

    return csv.trim();
  }
}