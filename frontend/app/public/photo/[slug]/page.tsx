import { client } from "@/src/sanity/client";
import { INDIVIDUAL_PHOTO_QUERY } from "@/src/sanity/queries";
import PhotoView from "@/components/PhotoView";
import { notFound } from "next/navigation";

// Define the type for the page props to match Next.js 15+ standards
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function IndividualPhotoPage({ params }: PageProps) {
  // 1. Await the params before accessing the slug string
  const { slug } = await params;

  // 2. Fetch the photo using the explicit slug key
  // This maps the 'slug' variable to '$slug' in your GROQ query
  const photo = await client.fetch(INDIVIDUAL_PHOTO_QUERY, { 
    slug: slug 
  });

  // 3. Trigger 404 if the slug doesn't exist in Sanity
  if (!photo) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <PhotoView photo={photo} />
    </div>
  );
}