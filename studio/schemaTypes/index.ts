// 1. Admin & Infrastructure (Singletons / Core Logic)
import adminProfile from './Admin/adminProfile'
import siteManifesto from './Admin/siteManifesto'
import devManifesto from './Admin/devManifesto'
import logType from './Admin/logType'

// 2. Editorial Suite (The Narrative Layer)
import article from './Editorial/article' // High-production Features
import post from './Editorial/post'       // Standard Discourse
import stream from './Editorial/stream'   // Raw Pulse / Micro-logs
import share from './Editorial/share'     // External Signals & Curation

// 3. Social Media Hubs (Unified Platform Documents)
import spotifyProfile from './Social Media/Spotify/spotifyProfile'
import facebookProfile from './Social Media/Facebook/facebookProfile'

// 4. Social Media Forensic Data (Archives & Records)
import facebookArchive from './Social Media/Facebook/facebookArchive'
import spotifyPlaylist from './Social Media/Spotify/spotifyPlaylist'
import spotifyArtist from './Social Media/Spotify/spotifyArtist'
import spotifyAlbum from './Social Media/Spotify/spotifyAlbum'

// 5. Core Entities (The Network Nodes)
import person from './Entities/person'
import location from './system/location'
import year from './system/year'
import tag from './system/tag'

// 6. Media & Content
import photo from './Media/photo'
import gallery from './Media/gallery'

// 7. Objects (Reusable "of" types)
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

  // --- Social Hubs ---
  spotifyProfile,
  facebookProfile,

  // --- Forensic Data ---
  facebookArchive,
  spotifyPlaylist,
  spotifyArtist,
  spotifyAlbum,

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