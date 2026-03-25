import { execSync } from 'child_process';
import fs from 'fs';

const date = new Date().toLocaleString();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const tree = execSync('git ls-tree -r --name-only HEAD').toString();

// Extract Schema names for AI context
const schemas = fs.readdirSync('./studio/schemaTypes')
  .filter(f => f !== 'index.ts')
  .map(f => f.replace('.ts', ''));

const manifestTemplate = `
# PROJECT MANIFEST: SSS-MONOREPO
**Last Sync:** ${date} | **Branch:** ${branch}

## 🎨 Design System & Assets
- **Aesthetic:** Tabloid-Noir / Conspiracy Map
- **Palette:** Black (#000000), Newsprint (#F2F2F2), Archive Red (#FF3E00)
- **Assets:** Ripped paper vectors, tabloid frames, and conspiracy map overlays available in /static.

## 🧠 Database Intelligence (Sanity)
- **Active Schemas:** ${schemas.join(', ')}
- **AI Assist:** Enabled on Photo Narrative/Caption fields.
- **Filenames:** Universal matching enforced via slug logic (Source: originalFilename).

## 📂 Directory Map
\`\`\`text
${tree}
\`\`\`

## 📝 Recent Activity
${execSync('git log -5 --pretty=format:"- %s (%h)"').toString()}
`;

fs.writeFileSync('CONTEXT.md', manifestTemplate);
console.log('✅ Master Manifest updated.');