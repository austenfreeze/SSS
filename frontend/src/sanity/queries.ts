import { groq } from "next-sanity";

/**
 * Deep-dive fetch for PhotoView (Technical EXIF + Palette)
 * Targeted by Slug for individual archival analysis.
 */
export const INDIVIDUAL_PHOTO_QUERY = groq`*[_type == "photo" && slug.current == $slug][0] {
  ...,
  "slug": slug.current,
  "mainImage": image.asset->{
    ...,
    metadata {
      exif,
      palette,
      dimensions,
      lqip
    }
  },
  context {
    narrative,
    caption,
    intent,
    isPublic,
    isSensitive
  },
  associations {
    capturedDate,
    location->{ name, city, gps },
    tags[]->{ title, "slug": slug.current },
    people[]->{ name, "slug": slug.current, image }
  }
}`;

/**
 * Filtered for the Public Archive
 * Optimized for speed: Only basic image data and metadata required for cards.
 */
export const PUBLIC_PHOTOS_QUERY = groq`*[_type == "photo" && context.isPublic == true && context.isSensitive != true] | order(associations.capturedDate desc) {
  _id,
  image,
  "slug": slug.current,
  "lqip": image.asset->metadata.lqip,
  context {
    caption,
    intent
  },
  associations {
    capturedDate,
    location->{ name, city },
    "peopleCount": count(people)
  }
}`;

/**
 * The "Engine Control" fetch - includes administrative flags
 */
export const ADMIN_ALL_PHOTOS_QUERY = groq`*[_type == "photo"] | order(_createdAt desc) {
    _id,
    _type,
    image,
    "slug": slug.current,
    context {
      caption,
      isPublic,
      isSensitive
    },
    associations {
      capturedDate,
      location->{ name, city }
    }
  }`;