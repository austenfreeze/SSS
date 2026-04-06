import { groq } from 'next-sanity'

/**
 * Admin Profile Queries
 */
export const ADMIN_PROFILES_QUERY = groq`
  *[_type == "adminProfile"] | order(role asc, userHandle asc) {
    _id,
    userHandle,
    email,
    role,
    status,
    bio,
    lastLogin,
    createdAt,
    permissions,
    "identity": idenity->{ 
      _id,
      name, 
      "slug": slug.current,
      image 
    },
    "avatar": avatar->{ 
      _id,
      image { asset->{ _id, url, metadata { lqip, dimensions } } }
    },
    "portalsCount": count(portals),
    "managedPlatformsCount": count(managedPlatforms)
  }
`

export const ADMIN_PROFILE_BY_ID_QUERY = groq`
  *[_type == "adminProfile" && _id == $id][0] {
    _id,
    userHandle,
    email,
    role,
    status,
    bio,
    lastLogin,
    createdAt,
    permissions,
    activityLog,
    "identity": idenity->{ 
      _id,
      name, 
      "slug": slug.current,
      image,
      bio,
      roles
    },
    "avatar": avatar->{ 
      _id,
      image { asset->{ _id, url, metadata { lqip, dimensions } } }
    },
    portals[] {
      _key,
      platform,
      url,
      username,
      isVerified,
      isPrimary,
      "profile": profileReference->{ 
        _id,
        _type,
        profileName,
        "channelName": channelName,
        "displayName": displayName,
        url,
        "profilePhoto": profilePhoto->{ 
          image { asset->{ _id, url } }
        }
      }
    },
    managedPlatforms[]->{ 
      _id,
      _type,
      "name": coalesce(profileName, channelName, displayName),
      url
    }
  }
`

export const ADMIN_PROFILE_BY_EMAIL_QUERY = groq`
  *[_type == "adminProfile" && email == $email][0] {
    _id,
    userHandle,
    email,
    role,
    status,
    permissions
  }
`

/**
 * Social Platform Queries
 */
export const ALL_SOCIAL_PROFILES_QUERY = groq`{
  "spotify": *[_type == "spotifyProfile"] { 
    _id, profileName, url,
    "profilePhoto": profilePhoto->{ image { asset->{ url } } },
    "playlistsCount": count(playlists)
  },
  "facebook": *[_type == "facebookProfile"] { 
    _id, profileName, url,
    "postsCount": count(forensicPosts)
  },
  "instagram": *[_type == "instagramProfile"] { 
    _id, profileName, username, url, followersCount, postsCount, isVerified,
    "profilePhoto": profilePhoto->{ image { asset->{ url } } }
  },
  "youtube": *[_type == "youtubeProfile"] { 
    _id, channelName, customUrl, url, subscriberCount, videoCount, isVerified,
    "profilePhoto": profilePhoto->{ image { asset->{ url } } }
  },
  "twitter": *[_type == "twitterProfile"] { 
    _id, displayName, handle, url, followersCount, tweetCount, isVerified, verifiedType,
    "profilePhoto": profilePhoto->{ image { asset->{ url } } }
  },
  "tiktok": *[_type == "tiktokProfile"] { 
    _id, displayName, username, url, followersCount, likesCount, videoCount, isVerified,
    "profilePhoto": profilePhoto->{ image { asset->{ url } } }
  }
}`

export const PLATFORM_PROFILE_BY_ID_QUERY = groq`
  *[_id == $id][0] {
    _id,
    _type,
    ...
  }
`

/**
 * Gallery Queries
 */
export const GALLERIES_QUERY = groq`
  *[_type == "gallery"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    visibility,
    sortOrder,
    "coverPhoto": coverPhoto->{ 
      _id,
      image { asset->{ _id, url, metadata { lqip, dimensions } } }
    },
    "photosCount": count(photos),
    "photos": photos[]->{ 
      _id,
      "slug": slug.current,
      image { asset->{ _id, url, metadata { lqip, dimensions } } }
    }[0...6],
    _createdAt,
    _updatedAt
  }
`

export const GALLERY_BY_ID_QUERY = groq`
  *[_type == "gallery" && _id == $id][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    visibility,
    sortOrder,
    coverPosition,
    "coverPhoto": coverPhoto->{ 
      _id,
      image { asset->{ _id, url, metadata { lqip, dimensions } } }
    },
    photos[]->{ 
      _id,
      title,
      "slug": slug.current,
      image { asset->{ _id, url, metadata { lqip, dimensions, exif } } },
      context { caption, narrative, intent, isPublic, isSensitive },
      _createdAt
    },
    metadata,
    _createdAt,
    _updatedAt
  }
`

/**
 * Media/Photo Queries
 */
export const PHOTOS_FOR_GALLERY_QUERY = groq`
  *[_type == "photo" && !(_id in $excludeIds)] | order(_createdAt desc) [0...50] {
    _id,
    title,
    "slug": slug.current,
    image { asset->{ _id, url, metadata { lqip, dimensions } } },
    context { caption, isPublic },
    _createdAt
  }
`

export const PHOTO_BY_ID_QUERY = groq`
  *[_type == "photo" && _id == $id][0] {
    _id,
    title,
    "slug": slug.current,
    image { asset->{ _id, url, metadata { lqip, dimensions, exif } } },
    context { caption, narrative, intent, isPublic, isSensitive },
    "associations": {
      "years": years[]->{ _id, title, year },
      "location": locations[]->{ _id, name, city },
      "people": people[]->{ _id, name, "slug": slug.current },
      "tags": tags[]->{ _id, title, "slug": slug.current }
    },
    _createdAt,
    _updatedAt
  }
`

/**
 * Stats/Dashboard Queries
 */
export const ADMIN_STATS_QUERY = groq`{
  "admins": count(*[_type == "adminProfile"]),
  "activeAdmins": count(*[_type == "adminProfile" && status == "active"]),
  "photos": count(*[_type == "photo"]),
  "galleries": count(*[_type == "gallery"]),
  "articles": count(*[_type == "article"]),
  "posts": count(*[_type == "post"]),
  "streams": count(*[_type == "stream"]),
  "people": count(*[_type == "person"]),
  "socialProfiles": {
    "spotify": count(*[_type == "spotifyProfile"]),
    "facebook": count(*[_type == "facebookProfile"]),
    "instagram": count(*[_type == "instagramProfile"]),
    "youtube": count(*[_type == "youtubeProfile"]),
    "twitter": count(*[_type == "twitterProfile"]),
    "tiktok": count(*[_type == "tiktokProfile"])
  }
}`
