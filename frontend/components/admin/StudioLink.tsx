'use client'

import { ReactNode } from 'react'

const STUDIO_URL = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || '/studio'

type DocumentType = 
  | 'adminProfile'
  | 'person'
  | 'gallery'
  | 'photo'
  | 'article'
  | 'post'
  | 'stream'
  | 'share'
  | 'spotifyProfile'
  | 'spotifyPlaylist'
  | 'spotifyArtist'
  | 'spotifyAlbum'
  | 'spotifyEcosystem'
  | 'facebookProfile'
  | 'facebookArchive'
  | 'instagramProfile'
  | 'instagramArchive'
  | 'youtubeProfile'
  | 'youtubeVideo'
  | 'youtubePlaylist'
  | 'twitterProfile'
  | 'twitterArchive'
  | 'tiktokProfile'
  | 'tiktokArchive'

// Map document types to their structure paths
const STRUCTURE_PATHS: Record<DocumentType, string> = {
  adminProfile: 'admin;adminTeam',
  person: 'entities;person',
  gallery: 'media;gallery',
  photo: 'media;photo',
  article: 'editorial;article',
  post: 'editorial;post',
  stream: 'editorial;stream',
  share: 'editorial;share',
  spotifyProfile: 'socialPortals;spotify;spotifyProfile',
  spotifyPlaylist: 'socialPortals;spotify;spotifyPlaylist',
  spotifyArtist: 'socialPortals;spotify;spotifyArtist',
  spotifyAlbum: 'socialPortals;spotify;spotifyAlbum',
  spotifyEcosystem: 'socialPortals;spotify;spotifyEcosystem',
  facebookProfile: 'socialPortals;facebook;facebookProfile',
  facebookArchive: 'socialPortals;facebook;facebookArchive',
  instagramProfile: 'socialPortals;instagram;instagramProfile',
  instagramArchive: 'socialPortals;instagram;instagramArchive',
  youtubeProfile: 'socialPortals;youtube;youtubeProfile',
  youtubeVideo: 'socialPortals;youtube;youtubeVideo',
  youtubePlaylist: 'socialPortals;youtube;youtubePlaylist',
  twitterProfile: 'socialPortals;twitter;twitterProfile',
  twitterArchive: 'socialPortals;twitter;twitterArchive',
  tiktokProfile: 'socialPortals;tiktok;tiktokProfile',
  tiktokArchive: 'socialPortals;tiktok;tiktokArchive',
}

interface StudioLinkProps {
  documentType: DocumentType
  documentId?: string
  children?: ReactNode
  className?: string
  showIcon?: boolean
}

/**
 * Generate a deep link to a Sanity Studio document
 */
export function getStudioUrl(documentType: DocumentType, documentId?: string): string {
  const basePath = STRUCTURE_PATHS[documentType] || documentType
  
  if (documentId) {
    return `${STUDIO_URL}/structure/${basePath};${documentId}`
  }
  
  return `${STUDIO_URL}/structure/${basePath}`
}

/**
 * Component that renders a link to Sanity Studio
 */
export function StudioLink({ 
  documentType, 
  documentId, 
  children, 
  className = '',
  showIcon = true 
}: StudioLinkProps) {
  const url = getStudioUrl(documentType, documentId)
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors ${className}`}
    >
      {children || 'Edit in Studio'}
      {showIcon && (
        <svg 
          className="w-3.5 h-3.5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
          />
        </svg>
      )}
    </a>
  )
}

/**
 * Button variant for Studio links
 */
export function StudioLinkButton({ 
  documentType, 
  documentId, 
  children,
  className = ''
}: StudioLinkProps) {
  const url = getStudioUrl(documentType, documentId)
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center gap-2 px-4 py-2 
        border border-neutral-700 rounded 
        text-sm text-neutral-300 
        hover:bg-neutral-800 hover:text-white 
        transition-colors
        ${className}
      `}
    >
      <svg 
        className="w-4 h-4" 
        viewBox="0 0 24 24" 
        fill="currentColor"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
      {children || 'Edit in Sanity Studio'}
    </a>
  )
}

/**
 * Badge that links to Studio - for inline use
 */
export function StudioBadge({ 
  documentType, 
  documentId,
  label
}: StudioLinkProps & { label?: string }) {
  const url = getStudioUrl(documentType, documentId)
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="
        inline-flex items-center gap-1 px-2 py-0.5 
        bg-neutral-800 border border-neutral-700 rounded-full 
        text-xs text-neutral-400 
        hover:bg-neutral-700 hover:text-white 
        transition-colors
      "
    >
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
      {label || 'Sanity'}
    </a>
  )
}
