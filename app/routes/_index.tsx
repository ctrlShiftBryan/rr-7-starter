import { useLoaderData } from 'react-router';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Checkbox } from '~/components/ui/checkbox';
import { createFileData, type FileData, type FileNode } from '~/lib/fileScanner';
import path from 'node:path';
import { useState } from 'react';

import type { Route } from './+types/_index';

export function meta(_: Route.MetaArgs) {
  return [
    { title: 'React Router App - File Explorer' },
    { name: 'description', content: 'File explorer with server data loading' },
  ];
}

export async function loader() {
  // Get the project root directory
  const rootDir = path.resolve('.');

  // Define patterns for directories whose *contents* should be excluded,
  // but the directory itself should be shown (and marked as pending).
  const excludeContentPatterns = [
    /node_modules\/.+/, // Matches anything inside node_modules
    /\.git\/.+/,        // Matches anything inside .git
    /build\/.+/,        // Matches anything inside build
    /public\/.+/,       // Matches anything inside public
    /memory-bank\/.+/   // Matches anything inside memory-bank
  ];

  // Scan the directory excluding specified patterns
  // isPendingPatterns are handled internally by scanDirectory defaults
  const fileData = createFileData(rootDir, excludeContentPatterns);

  // Loaders should return plain objects or Responses
  return fileData;
}

export default function Home() {
  // Assert the type since useLoaderData might be undefined initially
  const fileData = useLoaderData() as FileData;
  const [searchText, setSearchText] = useState("");
  const [localFileData, setLocalFileData] = useState<FileData>(fileData);

  // Toggle checkbox state recursively
  const toggleCheckboxRecursive = (node: FileNode, targetPath: string[], currentPath: string[]): FileNode => {
    const isMatch = currentPath.join('/') === targetPath.join('/');

    let newChecked = node.checked;
    if (isMatch) {
      newChecked = !node.checked;
    }

    let newChildren = node.children;
    if (node.children) {
      newChildren = node.children.map(child =>
        toggleCheckboxRecursive(child, targetPath, [...currentPath, child.name])
      );
      // If it's the target folder, update children's checked state as well
      if (isMatch && node.type === 'folder') {
        newChildren = newChildren.map(child => ({ ...child, checked: newChecked }));
        // Recursively update grandchildren etc.
        const updateGrandChildren = (n: FileNode): FileNode => ({
          ...n,
          checked: newChecked,
          children: n.children?.map(updateGrandChildren)
        });
        newChildren = newChildren.map(updateGrandChildren);
      }
    }

    return { ...node, checked: newChecked, children: newChildren };
  };

  const toggleCheckbox = (path: string[]) => {
    setLocalFileData(prevData => ({
      root: toggleCheckboxRecursive(prevData.root, path, [prevData.root.name])
    }));
  };

  // Toggle folder expansion
  const toggleFolderRecursive = (node: FileNode, targetPath: string[], currentPath: string[]): FileNode => {
    const isMatch = currentPath.join('/') === targetPath.join('/');

    let newExpanded = node.expanded;
    if (isMatch && node.type === 'folder') {
      newExpanded = !node.expanded;
    }

    let newChildren = node.children;
    if (node.children) {
      newChildren = node.children.map(child =>
        toggleFolderRecursive(child, targetPath, [...currentPath, child.name])
      );
    }

    return { ...node, expanded: newExpanded, children: newChildren };
  };

  const toggleFolder = (path: string[]) => {
    setLocalFileData(prevData => ({
      root: toggleFolderRecursive(prevData.root, path, [prevData.root.name])
    }));
  };

  // Recursive function to render file tree
  const renderFileTree = (node: FileNode, path: string[] = [node.name], level = 0): React.ReactNode => {
    const currentPath = path; // Path already includes current node name

    return (
      <div key={currentPath.join('/')} style={{ marginLeft: `${level * 16}px` }}>
        <div className={`flex items-center py-1 ${node.isPending ? 'text-blue-500 opacity-70' : ''}`}>
          <Checkbox
            className="mr-2"
            checked={node.checked}
            onCheckedChange={() => toggleCheckbox(currentPath)}
            id={currentPath.join('/')}
            disabled={node.isPending} // Disable checkbox for pending items
          />

          {node.type === 'folder' && !node.isPending && ( // Don't show toggle for pending folders
            <span className="mr-1 cursor-pointer" onClick={() => toggleFolder(currentPath)}>
              {node.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}
          {node.type === 'folder' && node.isPending && (
            // Placeholder for pending folders - keep alignment
            <span className="mr-1 w-4 inline-block"></span>
          )}

          <label
            htmlFor={currentPath.join('/')}
            className={`mr-1 cursor-pointer ${!node.checked ? 'line-through opacity-50' : ''} ${node.isPending ? 'italic' : ''}`}
          >
            {node.name}
          </label>
          {!node.isPending && (
            // Don't show tokens for pending folders
            <span className={`text-xs text-gray-500 ${!node.checked ? 'line-through opacity-50' : ''}`}>
              ({node.tokens} tokens)
            </span>
          )}
          {node.isPending && (
            <span className="text-xs text-blue-500 italic">(pending scan)</span>
          )}
        </div>

        {node.type === 'folder' && node.expanded && node.children && !node.isPending && (
          // Don't render children for pending folders
          <div>
            {node.children.map((child: FileNode) => renderFileTree(child, [...currentPath, child.name], level + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleVibe = () => {
    // Handle the VIBE button click
    console.log("VIBE clicked with text:", searchText);
    // TODO: Implement actual VIBE functionality - filter nodes based on search?
  };

  return (
    <div className="bg-gray-900 text-gray-100 p-4 min-h-screen font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Search bar and VIBE button */}
        <div className="flex mb-4 space-x-2 sticky top-4 bg-gray-900 py-2 z-10">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Filter files or add context..."
            className="flex-grow bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:ring-pink-500 focus:border-pink-500"
          />
          <Button onClick={handleVibe} className="bg-pink-600 hover:bg-pink-700 text-white font-bold">
            VIBE
          </Button>
        </div>

        {/* File tree */}
        <div className="bg-gray-800 p-4 rounded-md text-white font-mono text-sm border border-gray-700 shadow-lg mt-4">
          {renderFileTree(localFileData.root)}
        </div>
      </div>
    </div>
  );
}
