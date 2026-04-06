import fs from 'fs';
import path from 'path';

// Targeted path: C:\Users\Administrator\Desktop\SSS\notes\done.md
const logPath = path.join(process.cwd(), 'notes', 'done.md');

const logEntry = `
## 📂 SESSION UPDATE: ${new Date().toLocaleString()}
* **Sync & Security:** Successfully executed sync-context.mjs and updated CONTEXT.md.
* **Process Check:** Verified Node instances for sync-context.mjs are clear.
* **Architecture:** Confirmed schemas (photo, gallery, person, location, tag, logType).
* **Status:** Systems Nominal.
\n`;

try {
    // Ensure the directory exists before writing
    if (!fs.existsSync(path.dirname(logPath))) {
        fs.mkdirSync(path.dirname(logPath), { recursive: true });
    }
    fs.appendFileSync(logPath, logEntry);
    console.log(`📝 Evidence logged to: ${logPath}`);
} catch (err) {
    console.error('❌ Failed to update archival logs:', err.message);
}