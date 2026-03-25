
# PROJECT MANIFEST: SSS-MONOREPO
**Last Sync:** 3/25/2026, 5:38:48 PM | **Branch:** main

## 🎨 Design System & Assets
- **Aesthetic:** Tabloid-Noir / Conspiracy Map
- **Palette:** Black (#000000), Newsprint (#F2F2F2), Archive Red (#FF3E00)
- **Assets:** Ripped paper vectors, tabloid frames, and conspiracy map overlays available in /static.

## 🧠 Database Intelligence (Sanity)
- **Active Schemas:** gallery, location, logType, person, photo, photoCaption, tag
- **AI Assist:** Enabled on Photo Narrative/Caption fields.
- **Filenames:** Universal matching enforced via slug logic (Source: originalFilename).

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

## 📝 Recent Activity
- Progress Update (ca5af7c)
- feat: align archival photo deep-dive and fix clerk deprecated props (780e79f)
- fix: remove deprecated clerk prop to satisfy build logs (35769b4)
- Build: Finalize hybrid path architecture and resolve Clerk/Sanity imports (995ade8)
- refactor: merge studio into unified monorepo (c36abd4)
