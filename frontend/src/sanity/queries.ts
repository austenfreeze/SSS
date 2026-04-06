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
    "dateConfig": years[0]->{ title }, // Mapping reference to 'year' schema
    "location": locations[0]->{ _id, name, city },
    "people": people[]->{ _id, name, "slug": slug.current },
    "tags": tags[]->{ _id, title, "slug": slug.current }
  }
`;

export const ADMIN_QUERY = groq`*[_type == "adminProfile"][0]{
  userHandle,
  systemRole,
  bio,
  socialLinks,
  "identity": idenity->{
    name,
    image,
    roles,
    bio,
    connections
  }
}`;

export const PUBLIC_PHOTOS_QUERY = groq`
  *[_type == "photo" && context.isPublic == true && context.isSensitive != true] 
  | order(_createdAt desc) {
    ${PHOTO_FIELDS}
  }
`;

export const PERSON_BY_SLUG_QUERY = groq`*[_type == "person" && slug.current == $slug][0]{
  _id,
  name,
  "slug": slug.current,
  image,
  roles,
  bio,
  connections,
  "associatedPhotos": *[_type == "photo" && references(^._id) && context.isPublic == true]{
    ${PHOTO_FIELDS}
  }
}`;

export const INDIVIDUAL_PHOTO_QUERY = groq`
  *[_type == "photo" && slug.current == $slug][0] {
    ${PHOTO_FIELDS}
  }
`;