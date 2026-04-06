
# PROJECT MANIFEST: SSS-MONOREPO
**Last Sync:** 3/25/2026, 6:13:48 PM | **Branch:** main

## 🎨 Design System & Assets
- **Aesthetic:** Tabloid-Noir / Conspiracy Map
- **Palette:** Black (#000000), Newsprint (#F2F2F2), Archive Red (#FF3E00)

## 🧠 Database Intelligence
- **Active Schemas:** gallery, location, logType, person, photo, photoCaption, tag
- **Plugins:** Media (Asset Mgmt), Color-Input, Graph-View, AI Assist
- **Modular Tools:** portableText (Noir-Rich-Text)
- **Filenames:** Universal matching via originalFilename slug logic.

## 📂 Directory Map
```text
.gitignore
CONTEXT.md
frontend/.gitignore
frontend/README.md
frontend/app/(admin)/dashboard/layout.tsx
frontend/app/(admin)/dashboard/page.tsx
frontend/app/(admin)/layout.tsx
frontend/app/api/archive/toggle/route.ts
frontend/app/favicon.ico
frontend/app/globals.css
frontend/app/layout.tsx
frontend/app/page.tsx
frontend/app/public/file.svg
frontend/app/public/globe.svg
frontend/app/public/layout.tsx
frontend/app/public/next.svg
frontend/app/public/page.tsx
frontend/app/public/person/[slug]/page.tsx
frontend/app/public/photo/[slug]/page.tsx
frontend/app/public/vercel.svg
frontend/app/public/window.svg
frontend/app/sign-in/[[...sign-in]]/page.tsx
frontend/app/sign-up/[[...sign-up]]/page.tsx
frontend/components/ArchivalHeader.tsx
frontend/components/MediaCard.tsx
frontend/components/PhotoView.tsx
frontend/components/TabloidFrame.tsx
frontend/components/ToggleButton.tsx
frontend/eslint.config.mjs
frontend/next.config.ts
frontend/package.json
frontend/postcss.config.mjs
frontend/proxy.ts
frontend/src/sanity/client.ts
frontend/src/sanity/image.ts
frontend/src/sanity/queries.ts
frontend/src/sanity/sanity.types.ts
frontend/tsconfig.json
npm
package-lock.json
package.json
studio/.gitignore
studio/components/DashboardTool.tsx
studio/eslint.config.mjs
studio/output.txt
studio/package.json
studio/sanity-typegen.json
studio/sanity.cli.ts
studio/sanity.config.ts
studio/schema.json
studio/schemaTypes/gallery.ts
studio/schemaTypes/index.ts
studio/schemaTypes/location.ts
studio/schemaTypes/logType.ts
studio/schemaTypes/person.ts
studio/schemaTypes/photo.ts
studio/schemaTypes/photoCaption.ts
studio/schemaTypes/tag.ts
studio/static/.gitkeep
studio/structure.ts
studio/tsconfig.json
sync-context.mjs

```
