// sync-context.mjs
import { execSync } from 'child_process';
import fs from 'fs';

const date = new Date().toLocaleString();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

// 1. Get the Clean Tree (excluding node_modules, etc)
const tree = execSync('git ls-tree -r --name-only HEAD').toString();

const manifestTemplate = `
# PROJECT MANIFEST: SSS-MONOREPO
**Last Sync:** ${date} | **Branch:** ${branch}

## 🎯 Current Intelligence
- **Status:** Active Development
- **Main Goal:** Universal Matching Filenames & Archival Integrity

## 📂 Automatic Directory Map
\`\`\`text
${tree}
\`\`\`

## 📝 Recent Commit History (Last 5)
${execSync('git log -5 --pretty=format:"- %s (%h)"').toString()}
`;

fs.writeFileSync('CONTEXT.md', manifestTemplate);
console.log('✅ CONTEXT.md updated successfully.');