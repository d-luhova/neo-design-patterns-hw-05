import * as fs from "fs";
import * as path from "path";
import { DirectoryReport } from "./DirectoryReport";

export class DirectoryAnalyzer {
  analyze(dirPath: string): DirectoryReport {
    let files = 0;
    let directories = 0;
    let totalSize = 0;
    let extensions: Record<string, number> = {};

    const walk = (currentPath: string) => {
      const entries = fs.readdirSync(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory()) {
          directories++;
          walk(fullPath);
        } else if (entry.isFile()) {
          files++;

          const stats = fs.statSync(fullPath);
          totalSize += stats.size;

          const ext = path.extname(entry.name).toLowerCase();
          extensions[ext] = (extensions[ext] || 0) + 1;
        }
      }
    };

    walk(dirPath);

    return {
      files,
      directories,
      totalSize,
      extensions,
    };
  }
}
