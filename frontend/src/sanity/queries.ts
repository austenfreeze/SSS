import { groq } from "next-sanity";

// Deep-dive fetch for PhotoView (Technical EXIF + Palette)
export const INDIVIDUAL_PHOTO_QUERY = groq`*[_type == "photo" && slug.current == $slug][0] {
  ...,
  "slug": slug.current,
  "metadata": image.asset->metadata {
    exif,
    palette,
    dimensions,
    lqip
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

// Filtered for the Public Archive
export const PUBLIC_PHOTOS_QUERY = groq`*[_type == "photo" && context.isPublic == true && context.isSensitive != true] | order(associations.capturedDate desc) {
  _id,
  image,
  "slug": slug.current,
  context {
    narrative,
    caption,
    intent
  },
  associations {
    capturedDate,
    location->{ name, city },
    people[]->{ name }
  }
}`;

// The "Engine Control" fetch - includes everything
export const ADMIN_ALL_PHOTOS_QUERY = groq`*[_type == "photo"] | order(associations.capturedDate desc) {
    _id,
    _type,
    image,
    "slug": slug.current,
    context {
      caption,
      narrative,
      intent,
      isPublic,
      isSensitive
    },
    associations {
      capturedDate,
      location->{ name, city },
      people[]->{ name }
    }
  }`;