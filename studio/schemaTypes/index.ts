// 1. Admin & Infrastructure (Core Logic)
import adminProfile from './Admin/adminProfile'
import siteManifesto from './Admin/siteManifesto'
import devManifesto from './Admin/devManifesto'
import logType from './Admin/logType'

// 2. Editorial Suite (The Narrative Layer)
import article from './Editorial/article'
import post from './Editorial/post'
import stream from './Editorial/stream'
import share from './Editorial/share'

// 3. Social Media Hubs - Spotify
import spotifyProfile from './Social Media/Spotify/spotifyProfile'
import spotifyPlaylist from './Social Media/Spotify/spotifyPlaylist'
import spotifyArtist from './Social Media/Spotify/spotifyArtist'
import spotifyAlbum from './Social Media/Spotify/spotifyAlbum'

// 4. Social Media Hubs - Facebook
import facebookProfile from './Social Media/Facebook/facebookProfile'
import facebookArchive from './Social Media/Facebook/facebookArchive'

// 5. Social Media Hubs - Instagram
import instagramProfile from './Social Media/Instagram/instagramProfile'
import instagramArchive from './Social Media/Instagram/instagramArchive'

// 6. Social Media Hubs - YouTube
import youtubeProfile from './Social Media/YouTube/youtubeProfile'
import youtubeVideo from './Social Media/YouTube/youtubeVideo'
import youtubePlaylist from './Social Media/YouTube/youtubePlaylist'

// 7. Social Media Hubs - Twitter/X
import twitterProfile from './Social Media/Twitter/twitterProfile'
import twitterArchive from './Social Media/Twitter/twitterArchive'

// 8. Social Media Hubs - TikTok
import tiktokProfile from './Social Media/TikTok/tiktokProfile'
import tiktokArchive from './Social Media/TikTok/tiktokArchive'

// 9. Core Entities (The Network Nodes)
import person from './Entities/person'
import location from './system/location'
import year from './system/year'
import tag from './system/tag'

// 10. Media & Content
import photo from './Media/photo'
import gallery from './Media/gallery'

// 11. Objects (Reusable "of" types)
import { socialLink } from './objects/socialLink'
import { musicLink } from './objects/musicLink'
import { facebookPost } from './objects/facebookPost'
import photoCaption from './objects/photoCaption'
import portableText from './objects/portableText'

export const schemaTypes = [
  // --- Admin ---
  adminProfile,
  siteManifesto,
  devManifesto,
  logType,

  // --- Editorial ---
  article,
  post,
  stream,
  share,

  // --- Spotify ---
  spotifyProfile,
  spotifyPlaylist,
  spotifyArtist,
  spotifyAlbum,

  // --- Facebook ---
  facebookProfile,
  facebookArchive,

  // --- Instagram ---
  instagramProfile,
  instagramArchive,

  // --- YouTube ---
  youtubeProfile,
  youtubeVideo,
  youtubePlaylist,

  // --- Twitter/X ---
  twitterProfile,
  twitterArchive,

  // --- TikTok ---
  tiktokProfile,
  tiktokArchive,

  // --- Entities & System ---
  person,
  location,
  year,
  tag,

  // --- Media ---
  photo,
  gallery,

  // --- Objects ---
  socialLink,
  musicLink,
  facebookPost,
  photoCaption,
  portableText,
]
