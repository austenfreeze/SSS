
# 📂 Sanity Model Context Protocol (MCP) Reference

**Project Context:** SSS-MONOREPO _(Archival Tabloid-Noir)_  
**Status:** Configured for Cursor/VS Code

---

## 🛠 Core Capabilities

The Sanity MCP bridges your AI assistant (Cursor) and your Content Lake.  
It enables the AI to perform **Read**, **Write**, and **Architect** tasks using natural language.

---

## 🧩 Top-Tier Tool Definitions

| Tool Name              | Best Use Case                                                                                           |
|------------------------|--------------------------------------------------------------------------------------------------------|
| `get_schema`           | Use first for AI to understand your "Evidence Room" and "Directory" structures.                        |
| `query_documents`      | Executes GROQ queries. Perfect for testing frontend data fetching.                                     |
| `patch_document_json`  | Directly update content (e.g., "Fix the typo in the last 5 logs").                                     |
| `create_version`       | For "Scheduled Releases" or "Bundles" of archival content.                                             |
| `semantic_search`      | Retrieve documents based on "vibe" or meaning (not just keywords).                                     |
| `migration_guide`      | Essential for importing old data into the "SSS" schema.                                                |

---

## 🖋 Nuanced Usage Examples (Developer Focus)

### 1. Schema Architecture & Evolution

- Instead of writing TypeScript types manually, ask:
  > "Look at `get_schema` and tell me if my photo document can support a 'redacted' state using a boolean. If so, write the Sanity Studio code for it."
- Inheritance:
  > "Based on the existing person document, create a new witness document type that inherits the same fields but adds a 'reliability' slider."

### 2. Advanced GROQ Debugging

- Query writing:
  > "Run a GROQ query to find all photo documents in the 'Evidence Room' that have a high-contrast aspect ratio but are missing a photoCaption."
- Data joins:
  > "Give me a query that joins person documents with their linked location and formats the output for a Next.js 15 Server Component."

### 3. Content Seeding & "Tabloid" Generation

- Noir-style drafts:
  > "Create 5 draft logType documents. Make them sound like 1940s police reports about a missing briefcase. Tag them with 'Confidential'."
- Markdown to schema:
  > "Take this raw text file of 'clues' and use `create_documents_from_markdown` to turn each paragraph into a new evidence entry."

### 4. Image Intelligence

- Transform images:
  > "Find the image in the gallery titled 'The Docks' and use `transform_image` to crop it to a square and apply a grayscale filter if available."

### 5. Project Management & DevOps

- Dataset operations:
  > "List all datasets for this project. If we don't have a 'staging' dataset, create one and add http://localhost:3000 to the CORS origins."
- Performance checks:
  > "Check for any `sanity_rules` regarding performance when fetching large arrays of references."

---

## ⚠️ Operational Notes

- **Permissions:** If a command fails with "Unauthorized," the AI cannot perform that action. Check your User Role in the Sanity Manage dashboard.
- **Drafts vs. Published:** Most creation tools (like `create_documents_from_json`) target the `drafts.` prefix. You must explicitly call `publish_documents` to make them live.
- **Monorepo Tip:** When asking Cursor to "Fix the schema," specify that it should look in the `/studio` directory to prevent confusion with your frontend types.

---
