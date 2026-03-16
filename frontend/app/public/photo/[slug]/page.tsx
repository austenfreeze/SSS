// app/public/photo/[slug]/page.tsx
import { client } from "@/src/sanity/client";
import { INDIVIDUAL_PHOTO_QUERY } from "@/src/sanity/queries";
import PhotoView from "@/components/PhotoView";
import { notFound } from "next/navigation";

export default async function IndividualPhotoPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  // 1. Explicitly await the params object
  const resolvedParams = await params;
  
  // 2. Extract the string value
  const slug = resolvedParams.slug;

  // 3. Ensure the key in the second argument matches '$slug' in your query
  const photo = await client.fetch(INDIVIDUAL_PHOTO_QUERY, { 
    slug: slug // The key MUST be 'slug' to map to '$slug'
  });

  if (!photo) {
    return notFound();
  }

  return <PhotoView photo={photo} />;
}