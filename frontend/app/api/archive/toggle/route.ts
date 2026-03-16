import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

// We create a dedicated Write Client with the token
const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-03-11',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, // Critical for production
});

export async function POST(req: Request) {
  try {
    const { id, isPublic } = await req.json();

    // Patch the document in Sanity
    await writeClient
      .patch(id)
      .set({ "context.isPublic": isPublic })
      .commit();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Archive Toggle Error:", error);
    return NextResponse.json({ error: "Failed to update archive" }, { status: 500 });
  }
}