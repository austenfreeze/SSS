import { groq } from "next-sanity";

/**
 * Shared fragment to ensure consistency across queries.
 * We fetch the _id for all referenced entities to use as React keys.
 */
const PHOTO_FIELDS = groq`
  _id,
  "slug": slug.current,
  image { asset->{ _id, metadata { lqip, palette, dimensions, exif } } },
  context { caption, narrative, intent, isPublic, isSensitive },
  associations {
    dateConfig { precision, yearOnly, date },
    location->{ _id, name, city },
    people[]->{ _id, name, "slug": slug.current },
    tags[]->{ _id, title, "slug": slug.current }
  }
`;

/**
 * Public Archive Query
 * Optimized for card display with explicit _id fetching for people and tags.
 */
// src/sanity/queries.ts

export const PUBLIC_PHOTOS_QUERY = groq`
  *[_type == "photo" && context.isPublic == true && context.isSensitive != true] 
  | order(associations.dateConfig.date desc, associations.dateConfig.yearOnly desc) {
    _id,
    image,
    "slug": slug.current,
    context {
      intent,
      isPublic,
      isSensitive
    },
    associations {
      dateConfig {
        precision,
        yearOnly,
        date
      },
      location->{ _id, name, city },
      // The filter [0...20] is optional, but adding it ensures we 
      // aren't fetching a massive array if there's a data loop
      "people": people[]->{ _id, name } | order(name asc), 
      "tags": tags[]->{ _id, title }
    }
  }
`;

/**
 * Individual Photo Query
 * Deep-dive fetch using the shared PHOTO_FIELDS fragment.
 */
export const INDIVIDUAL_PHOTO_QUERY = groq`
  *[_type == "photo" && slug.current == $slug][0] {
    ${PHOTO_FIELDS}
  }
`;