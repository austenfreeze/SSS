// app/public/photo/[slug]/page.tsx
import { client } from "@/src/sanity/client";
import { INDIVIDUAL_PHOTO_QUERY } from "@/src/sanity/queries"; // Use the query we refined earlier
import PhotoView from "@/components/PhotoView";
import { notFound } from "next/navigation";

// app/public/photo/[slug]/page.tsx

export default async function IndividualPhotoPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 1. You MUST await the params promise first
  const resolvedParams = await params;
  const slugValue = resolvedParams.slug;

  // 2. The key in this object MUST match the '$slug' in your GROQ string
  const photo = await client.fetch(INDIVIDUAL_PHOTO_QUERY, { 
    slug: slugValue  // This key 'slug' maps to '$slug'
  });

  if (!photo) notFound();

  return <PhotoView photo={photo} />;
}