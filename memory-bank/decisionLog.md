# Decision Log

This file records architectural and implementation decisions using a list format.
2025-03-30 07:32:00 - Initial creation of Memory Bank for the React Router 7 starter project

## Decision: Add file system scanner and API client to demonstrate server data loading

* Will implement a server-side file scanner to create a nested file tree structure
* Will add a sample API client for external data fetching
* Both will be used in the index route loader

## Rationale

* React Router 7's loader functionality is a key feature that should be demonstrated
* File system scanning provides a practical and visual example of server-side capabilities
* Including an API client demonstrates how to handle external data sources
* Combining both data sources in one loader shows how to orchestrate multiple data fetching operations

## Implementation Details

* File scanner will use Node.js fs module to recursively scan directories
* Will exclude node_modules, build directories, and git files to keep the tree manageable
* API client will fetch from JSONPlaceholder API as a simple example
* Index route will display both data sources in a clean, user-friendly UI
* Will include comprehensive tests for all new functionality