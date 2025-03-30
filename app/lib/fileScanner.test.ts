import { describe, it, expect } from "bun:test";
import fs from "node:fs";
import path from "node:path";
import { scanDirectory, createFileData } from "./fileScanner";

describe("fileScanner", () => {
  it("should scan a directory and return a file tree", () => {
    // Create a temporary directory for testing
    const tmpDir = fs.mkdtempSync(path.join(process.cwd(), "tmp_test_dir_"));
    
    // Create test files and a subdirectory
    fs.writeFileSync(path.join(tmpDir, "file1.txt"), "Hello, world!");
    fs.mkdirSync(path.join(tmpDir, "subdir"));
    fs.writeFileSync(path.join(tmpDir, "subdir", "file2.txt"), "Another file");

    // Scan the temporary directory without any exclude patterns
    const result = scanDirectory(tmpDir, []);

    // Expect the result to have the test files and subdirectory
    const names = result.children?.map(child => child.name).sort();
    expect(names).toEqual(["file1.txt", "subdir"].sort());

    // Clean up: remove files and directories
    fs.unlinkSync(path.join(tmpDir, "file1.txt"));
    fs.unlinkSync(path.join(tmpDir, "subdir", "file2.txt"));
    fs.rmdirSync(path.join(tmpDir, "subdir"));
    fs.rmdirSync(tmpDir);
  });

  it("should create file data with root type 'folder'", () => {
    // Create another temporary directory for testing
    const tmpDir = fs.mkdtempSync(path.join(process.cwd(), "tmp_test_dir_"));
    
    // Create a test file
    fs.writeFileSync(path.join(tmpDir, "file.txt"), "Content");

    // Create file data and assert the root node is of folder type
    const data = createFileData(tmpDir, []);
    expect(data.root.type).toBe("folder");

    // Clean up
    fs.unlinkSync(path.join(tmpDir, "file.txt"));
    fs.rmdirSync(tmpDir);
  });
});