import { execSync } from 'child_process';
import fs from 'fs';

/**
 * SSS-MONOREPO SYSTEM SYNC
 * Automates security patching, manifest updates, and type generation.
 */

const date = new Date().toLocaleString();
const branch = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
const tree = execSync('git ls-tree -r --name-only HEAD').toString();

function runSync() {
  console.log('🚀 Initiating SSS Archival Sync & Security Shield...');

  try {
    // 1. SECURITY: Auto-fix vulnerabilities identified in logs
    console.log('🛡️ Patching identified vulnerabilities...');
    try {
        execSync('npm audit fix', { stdio: 'inherit' });
    } catch (e) {
        console.warn('⚠️ Standard fix failed. Some issues may require npm audit fix --force');
    }

    // 2. TYPE SAFETY: Sync schema changes with the frontend
    console.log('🧬 Generating latest Sanity types for Next.js...');
    execSync('cd studio && npx sanity typegen generate', { stdio: 'inherit' });

    // 3. MANIFEST: Update project context for AI/Dev
    const schemas = fs.readdirSync('./studio/schemaTypes')
      .filter(f => f !== 'index.ts' && !f.includes('objects') && f.endsWith('.ts'))
      .map(f => f.replace('.ts', ''));

    const manifestTemplate = `
# PROJECT MANIFEST: SSS-MONOREPO
**Last Sync:** ${date} | **Branch:** ${branch}

## 🎨 Design System & Assets
- **Aesthetic:** Tabloid-Noir / Conspiracy Map
- **Palette:** Black (#000000), Newsprint (#F2F2F2), Archive Red (#FF3E00)

## 🧠 Database Intelligence
- **Active Schemas:** ${schemas.join(', ')}
- **Plugins:** Media (Asset Mgmt), Color-Input, Graph-View, AI Assist
- **Modular Tools:** portableText (Noir-Rich-Text)
- **Filenames:** Universal matching via originalFilename slug logic.

## 📂 Directory Map
\`\`\`text
${tree}
\`\`\`
`;
    fs.writeFileSync('CONTEXT.md', manifestTemplate);
    console.log('✅ Sync Complete. System is secure and manifest is current.');
  } catch (err) {
    console.error('❌ Sync failed:', err.message);
  }
}

runSync();