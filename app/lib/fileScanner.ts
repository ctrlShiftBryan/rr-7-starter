// app/lib/fileScanner.ts
import fs from 'node:fs';
import path from 'node:path';

export interface FileNode {
  name: string;
  tokens: number;
  type: "file" | "folder";
  checked: boolean;
  expanded?: boolean;
  children?: FileNode[];
  isPending?: boolean;
}

export interface FileData {
  root: FileNode;
}

// Helper function to calculate "tokens" (using file size as proxy)
function calculateTokens(filePath: string): number {
  try {
    const stats = fs.statSync(filePath);
    // Use file size as a proxy for token count
    // For real token counting, you would need a parser
    return Math.floor(stats.size / 4); // Rough estimate: 4 bytes per token
  } catch (error) {
    console.error(`Error calculating tokens for ${filePath}:`, error);
    return 0;
  }
}

export function scanDirectory(
  directoryPath: string,
  excludePatterns: RegExp[] = [],
  isPendingPatterns: RegExp[] = [/node_modules/, /\.git/, /build/]
): FileNode {
  const baseName = path.basename(directoryPath);

  // Check if directory should be marked as pending
  const isPending = isPendingPatterns.some(pattern => pattern.test(directoryPath));

  if (excludePatterns.some(pattern => pattern.test(directoryPath))) {
    return {
      name: baseName,
      tokens: 0,
      type: "folder",
      checked: true,
      expanded: false,
      children: [],
      isPending
    };
  }

  let totalTokens = 0;
  const children: FileNode[] = [];

  try {
    const entries = fs.readdirSync(directoryPath, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(directoryPath, entry.name);

      // Skip excluded directories/files based on the exclude pattern
      if (excludePatterns.some(pattern => pattern.test(entryPath))) {
        continue;
      }

      const entryIsPending = isPendingPatterns.some(pattern => pattern.test(entryPath));

      if (entry.isDirectory()) {
        // If the directory itself matches a pending pattern, mark it and don't recurse
        if (entryIsPending) {
          children.push({
            name: entry.name,
            tokens: 0, // Pending folders don't contribute tokens directly
            type: "folder",
            checked: true,
            expanded: false,
            children: [],
            isPending: true
          });
        } else {
          const subDir = scanDirectory(entryPath, excludePatterns, isPendingPatterns);
          children.push(subDir);
          totalTokens += subDir.tokens;
        }
      } else {
        const fileTokens = calculateTokens(entryPath);
        children.push({
          name: entry.name,
          tokens: fileTokens,
          type: "file",
          checked: true,
          isPending: false // Files are not marked pending individually here
        });
        totalTokens += fileTokens;
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${directoryPath}:`, error);
  }

  // Sort children: folders first, then files, alphabetically
  children.sort((a, b) => {
    if (a.type === 'folder' && b.type === 'file') return -1;
    if (a.type === 'file' && b.type === 'folder') return 1;
    return a.name.localeCompare(b.name);
  });

  return {
    name: baseName,
    tokens: totalTokens,
    type: "folder",
    checked: true,
    expanded: true, // Root node starts expanded
    children,
    isPending
  };
}

export function createFileData(rootDir: string, excludePatterns: RegExp[] = []): FileData {
  const rootNode = scanDirectory(rootDir, excludePatterns);
  return { root: rootNode };
}