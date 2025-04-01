import { readdir, rmdir } from 'fs/promises';
import { dirname, join } from 'path';
import { createInterface } from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function isDirectoryEmpty(dirPath) {
  try {
    const files = await readdir(dirPath);
    return files.length === 0;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    return false;
  }
}

async function findEmptyDirectories(startPath, emptyDirs = []) {
  try {
    const entries = await readdir(startPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(startPath, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and .git directories
        if (entry.name === 'node_modules' || entry.name === '.git') {
          continue;
        }

        const isEmpty = await isDirectoryEmpty(fullPath);
        if (isEmpty) {
          emptyDirs.push(fullPath);
        } else {
          // Recursively check subdirectories
          await findEmptyDirectories(fullPath, emptyDirs);
        }
      }
    }

    return emptyDirs;
  } catch (error) {
    console.error(`Error processing directory ${startPath}:`, error);
    return emptyDirs;
  }
}

async function deleteDirectories(directories) {
  for (const dir of directories) {
    try {
      await rmdir(dir);
      console.log(`Deleted: ${dir}`);
    } catch (error) {
      console.error(`Error deleting ${dir}:`, error);
    }
  }
}

async function main() {
  console.log('Searching for empty directories...');
  const emptyDirs = await findEmptyDirectories(projectRoot);

  if (emptyDirs.length === 0) {
    console.log('No empty directories found.');
    process.exit(0);
  }

  console.log('\nFound the following empty directories:');
  emptyDirs.forEach((dir) => console.log(dir));

  rl.question('\nDo you want to delete these directories? (yes/no): ', async (answer) => {
    if (answer.toLowerCase() === 'yes') {
      await deleteDirectories(emptyDirs);
      console.log('All empty directories have been deleted.');
    } else {
      console.log('Operation cancelled.');
    }
    rl.close();
  });
}

main().catch((error) => {
  console.error('An error occurred:', error);
  process.exit(1);
});