import { groq } from "next-sanity";

/**
 * Shared fragment for Photo consistency.
 */
const PHOTO_FIELDS = groq`
  _id,
  "slug": slug.current,
  image { asset->{ _id, metadata { lqip, palette, dimensions, exif } } },
  context { caption, narrative, intent, isPublic, isSensitive },
  "associations": {
    "dateConfig": years[0]->{ title, "yearOnly": year }, 
    "location": locations[0]->{ _id, name, city },
    "people": people[]->{ _id, name, "slug": slug.current },
    "tags": tags[]->{ _id, title, "slug": slug.current }
  }
`;

// 1. ADMIN QUERY
export const adminQuery = groq`*[_type == "adminProfile"][0]{
  userHandle, systemRole, bio, socialLinks,
  "identity": identity->{ name, image, roles, bio, connections }
}`;
export const ADMIN_QUERY = adminQuery;

// 2. PUBLIC PHOTOS QUERY
export const publicPhotosQuery = groq`
  *[_type == "photo" && context.isPublic == true && context.isSensitive != true] 
  | order(_createdAt desc) { ${PHOTO_FIELDS} }
`;
export const PUBLIC_PHOTOS_QUERY = publicPhotosQuery;

// 3. PERSON BY SLUG QUERY
export const personBySlugQuery = groq`*[_type == "person" && slug.current == $slug][0]{
  _id, name, "slug": slug.current, image, roles, bio, connections,
  "associatedPhotos": *[_type == "photo" && references(^._id) && context.isPublic == true]{ ${PHOTO_FIELDS} }
}`;
export const PERSON_BY_SLUG_QUERY = personBySlugQuery;

// 4. INDIVIDUAL PHOTO QUERY
export const individualPhotoQuery = groq`
  *[_type == "photo" && slug.current == $slug][0] { ${PHOTO_FIELDS} }
`;
export const INDIVIDUAL_PHOTO_QUERY = individualPhotoQuery;