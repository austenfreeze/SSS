import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { auth, currentUser } from "@clerk/nextjs/server";

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2026-03-11',
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN, 
});

export async function POST(req: Request) {
  const { userId } = await auth();
  const user = await currentUser();

  // LOCK: Only allow your specific email or an admin metadata role
  const isAdmin = user?.publicMetadata?.role === "admin" || user?.emailAddresses[0].emailAddress === "YOUR_EMAIL@GMAIL.COM";

  if (!userId || !isAdmin) {
    return new NextResponse("Unauthorized Engine Access", { status: 401 });
  }

  try {
    const { id, isPublic } = await req.json();
    await writeClient.patch(id).set({ "context.isPublic": isPublic }).commit();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Action Failed" }, { status: 500 });
  }
}