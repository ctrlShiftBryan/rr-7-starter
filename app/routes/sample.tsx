import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Checkbox } from '~/components/ui/checkbox';

// Define the structure for file/folder nodes
interface FileNode {
  name: string;
  tokens: number;
  type: "file" | "folder";
  checked: boolean;
  expanded?: boolean; // Optional for files
  children?: FileNode[]; // Optional for files
  isPending?: boolean; // Optional
}

// Type for the root data structure
interface FileData {
  root: FileNode;
}

// Sample file structure data (matches your mockup)
const initialFileData: FileData = {
  root: {
    name: "file-scope",
    tokens: 119909,
    type: "folder",
    expanded: true,
    checked: true,
    children: [
      { name: "dockerfile", tokens: 10, type: "file", checked: true },
      {
        name: "github",
        tokens: 1067,
        type: "folder",
        expanded: false,
        checked: true,
        children: [
          {
            name: "workflows",
            tokens: 1067,
            type: "folder",
            expanded: false,
            checked: true,
            children: [
              { name: "ci.yml", tokens: 1067, type: "file", checked: true }
            ]
          }
        ]
      },
      { name: "gitignore", tokens: 20, type: "file", checked: true },
      { name: "react-router", tokens: 0, type: "file", checked: true },
      { name: "repoignore", tokens: 24, type: "file", checked: true },
      { name: "roomcodes", tokens: 76, type: "file", checked: true },
      { name: "tool-versions", tokens: 9, type: "file", checked: true },
      { name: "Dockerfile", tokens: 337, type: "file", checked: true },
      { name: "Dockerfile.dev", tokens: 162, type: "file", checked: true },
      { name: "README.md", tokens: 1179, type: "file", checked: true },
      {
        name: "app",
        tokens: 11107,
        type: "folder",
        expanded: false,
        checked: true,
        children: [
          { name: "app.css", tokens: 1572, type: "file", checked: true },
          {
            name: "components",
            tokens: 540,
            type: "folder",
            expanded: false,
            checked: true,
            children: [
              {
                name: "ui",
                tokens: 540,
                type: "folder",
                expanded: false,
                checked: true,
                children: [
                  { name: "button.tsx", tokens: 540, type: "file", checked: true }
                ]
              }
            ]
          },
          { name: "lib", tokens: 45, type: "file", checked: true },
          { name: "utils.ts", tokens: 45, type: "file", checked: true },
          { name: "root.tsx", tokens: 408, type: "file", checked: true },
          {
            name: "routes",
            tokens: 105,
            type: "folder",
            expanded: false,
            checked: true,
            children: [
              { name: "_index.tsx", tokens: 105, type: "file", checked: true }
            ]
          },
          { name: "routes.ts", tokens: 65, type: "file", checked: true },
          {
            name: "welcome",
            tokens: 8073,
            type: "folder",
            expanded: false,
            checked: true,
            children: [
              { name: "logo-dark.svg", tokens: 3196, type: "file", checked: true },
              { name: "logo-light.svg", tokens: 3211, type: "file", checked: true },
              { name: "welcome.tsx", tokens: 1666, type: "file", checked: true }
            ]
          }
        ]
      },
      {
        name: "build",
        tokens: 0,
        type: "folder",
        expanded: false,
        checked: true,
        children: []
      },
      { name: "bun.lock", tokens: 83752, type: "file", checked: true },
      { name: "components.json", tokens: 136, type: "file", checked: true },
      { name: "docker-compose.yml", tokens: 141, type: "file", checked: true },
      { name: "eslint.config.js", tokens: 274, type: "file", checked: true },
      { name: "implementation-plan.md", tokens: 3616, type: "file", checked: true },
      { name: "memory-bank", tokens: 1440, type: "file", isPending: true, checked: true },
      { name: "node_modules", tokens: 0, type: "file", isPending: true, checked: true },
      { name: "package.json", tokens: 591, type: "file", checked: true },
      { name: "prettier.config.js", tokens: 85, type: "file", checked: true },
      { name: "public", tokens: 14558, type: "file", isPending: true, checked: true },
      { name: "react-router-config.js", tokens: 48, type: "file", checked: true },
      {
        name: "src",
        tokens: 0,
        type: "folder",
        expanded: false,
        checked: true,
        children: [
          { name: "tsconfig.json", tokens: 183, type: "file", checked: true },
          { name: "vite.config.ts", tokens: 137, type: "file", checked: true }
        ]
      }
    ]
  }
};

export default function SampleRoute() {
  const [searchText, setSearchText] = useState("");
  const [fileData, setFileData] = useState<FileData>(initialFileData);
  
  // Toggle checkbox state
  const toggleCheckbox = (path: string[]) => {
    const newFileData = { ...fileData };
    let current: FileNode | undefined = newFileData.root;
    
    // Skip root node if path doesn't include it
    if (current && path.length > 0 && path[0] === current.name) {
      for (let i = 1; i < path.length; i++) {
        const childName = path[i];
        // Ensure current exists and has children before finding index
        const childIndex: number | undefined = current?.children?.findIndex(child => child.name === childName);

        // Check for valid index
        if (childIndex !== undefined && childIndex !== -1 && current?.children) {
          current = current.children[childIndex];
        } else {
          console.error("Path not found or invalid structure for checkbox toggle:", path);
          return; // Path segment not found or current is not a folder
        }
      }

      // Check if current is still valid before toggling
      if (current) {
        current.checked = !current.checked;
        setFileData(newFileData);
      }
    }
  };

  // Toggle folder expansion
  const toggleFolder = (path: string[]) => {
    const newFileData = { ...fileData };
    let current: FileNode | undefined = newFileData.root;
    
    // Skip root node if path doesn't include it
    if (current && path.length > 0 && path[0] === current.name) {
      for (let i = 1; i < path.length; i++) {
        const childName = path[i];
        // Ensure current exists and has children before finding index
        const childIndex: number | undefined = current?.children?.findIndex(child => child.name === childName);

        // Check for valid index
        if (childIndex !== undefined && childIndex !== -1 && current?.children) {
           current = current.children[childIndex];
        } else {
           console.error("Path not found or invalid structure for folder toggle:", path);
           return; // Path segment not found or current is not a folder
        }
      }

      // Check if current is still valid and is a folder before toggling
      if (current && current.type === 'folder') {
        current.expanded = !current.expanded;
        setFileData(newFileData);
      }
    }
  };

  // Recursive function to render file tree
  const renderFileTree = (node: FileNode, path: string[] = [], level = 0): React.ReactNode => {
    const currentPath = [...path, node.name];
    
    return (
      <div key={currentPath.join('/')} style={{ marginLeft: `${level * 16}px` }}>
        <div 
          className={`flex items-center py-1 ${node.isPending ? 'text-blue-500' : ''}`}
        >
          <Checkbox className="mr-2" checked={node.checked} onCheckedChange={() => toggleCheckbox(currentPath)} id={currentPath.join('/')} />

          {node.type === 'folder' && (
            <span
              className="mr-1 cursor-pointer"
              onClick={() => toggleFolder(currentPath)}
            >
              {node.expanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </span>
          )}

          <label
            htmlFor={currentPath.join('/')}
            className={`mr-1 cursor-pointer ${!node.checked ? 'line-through opacity-50' : ''}`}
          >
            {node.name}
          </label>
          <span className={`text-xs text-gray-500 ${!node.checked ? 'line-through opacity-50' : ''}`}>({node.tokens} tokens)</span>
        </div>

        {node.type === 'folder' && node.expanded && node.children && (
          <div>
            {node.children.map((child: FileNode) => renderFileTree(child, currentPath, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const handleVibe = () => {
    // Handle the VIBE button click
    console.log("VIBE clicked with text:", searchText);
    // You could add API calls or other functionality here
  };

  return (
    <div className="bg-gray-800 p-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Search bar and VIBE button */}
        <div className="flex mb-4 space-x-2">
          <Input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="foo"
            className="flex-grow bg-white text-black"
          />
          <Button
            onClick={handleVibe}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold"
          >
            VIBE
          </Button>
        </div>

        {/* File tree */}
        <div className="bg-gray-800 p-4 rounded-md text-white font-mono text-sm">
          {renderFileTree(fileData.root)}
        </div>
      </div>
    </div>
  );
};
