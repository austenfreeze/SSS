import { 
  EditIcon, 
  BookIcon, 
  ComposeIcon,
  ActivityIcon,
  ShareIcon,
  DocumentIcon,
  UsersIcon,
  CogIcon,
  ImageIcon,
} from '@sanity/icons'
import { 
  SiSpotify, 
  SiFacebook, 
  SiInstagram, 
  SiYoutube, 
  SiTiktok 
} from 'react-icons/si'
import { SiX } from 'react-icons/si'

export const myStructure = (S: any) =>
  S.list()
    .title('STENxSTUDIO')
    .items([
      // --- ADMIN SECTION ---
      S.listItem()
        .title('Admin')
        .icon(CogIcon)
        .child(
          S.list()
            .title('Studio Admin')
            .items([
              // Admin Team (Multi-admin support)
              S.listItem()
                .title('Admin Team')
                .icon(UsersIcon)
                .child(
                  S.documentTypeList('adminProfile')
                    .title('Admin Profiles')
                    .defaultOrdering([{ field: 'role', direction: 'asc' }])
                ),
              S.divider(),
              S.listItem()
                .title('Manifesto')
                .child(
                  S.list()
                    .title('Project Manifesto')
                    .items([
                      S.listItem()
                        .title('Core Site Manifesto')
                        .child(S.document().schemaType('siteManifesto').documentId('siteManifesto')),
                      S.listItem()
                        .title('Developer Infrastructure')
                        .child(S.document().schemaType('devManifesto').documentId('devManifesto')),
                    ])
                ),
              S.divider(),
              S.listItem()
                .title('System Logs')
                .child(S.documentTypeListItem('logType').title('Logs')),
              S.listItem()
                .title('Tags & Taxonomy')
                .child(
                  S.list()
                    .title('Taxonomy')
                    .items([
                      S.documentTypeListItem('tag').title('Public Tags'),
                      S.documentTypeListItem('media.tag').title('Internal Media Tags'),
                      S.documentTypeListItem('location').title('Location Tags'),
                    ])
                ),
            ])
        ),
      S.divider(),

      // --- EDITORIAL SUITE ---
      S.listItem()
        .title('Editorial')
        .icon(EditIcon)
        .child(
          S.list()
            .title('Editorial Suite')
            .items([
              S.listItem()
                .title('The Desk (All Drafts)')
                .icon(ComposeIcon)
                .child(
                  S.documentList()
                    .title('Global Drafts')
                    .filter('_id in path("drafts.**")')
                ),
              S.divider(),
              S.documentTypeListItem('article')
                .title('Articles')
                .icon(DocumentIcon),
              S.divider(),
              S.documentTypeListItem('post')
                .title('Posts')
                .icon(BookIcon),
              S.divider(),
              S.documentTypeListItem('stream')
                .title('Streams')
                .icon(ActivityIcon),
              S.divider(),
              S.documentTypeListItem('share')
                .title('Shares')
                .icon(ShareIcon),
            ])
        ),
      S.divider(),

      // --- SOCIAL PORTALS (All Platforms) ---
      S.listItem()
        .title('Social Portals')
        .child(
          S.list()
            .title('Platform Management')
            .items([
              // Spotify
              S.listItem()
                .title('Spotify')
                .icon(SiSpotify)
                .child(
                  S.list()
                    .title('Spotify Hub')
                    .items([
                      S.documentTypeListItem('spotifyProfile').title('Profiles'),
                      S.divider(),
                      S.documentTypeListItem('spotifyArtist').title('Artists'),
                      S.documentTypeListItem('spotifyAlbum').title('Albums'),
                      S.documentTypeListItem('spotifyPlaylist').title('Playlists'),
                    ])
                ),
              S.divider(),
              // Instagram
              S.listItem()
                .title('Instagram')
                .icon(SiInstagram)
                .child(
                  S.list()
                    .title('Instagram Hub')
                    .items([
                      S.documentTypeListItem('instagramProfile').title('Profiles'),
                      S.divider(),
                      S.documentTypeListItem('instagramArchive').title('Archived Posts'),
                    ])
                ),
              S.divider(),
              // YouTube
              S.listItem()
                .title('YouTube')
                .icon(SiYoutube)
                .child(
                  S.list()
                    .title('YouTube Hub')
                    .items([
                      S.documentTypeListItem('youtubeProfile').title('Channels'),
                      S.divider(),
                      S.documentTypeListItem('youtubeVideo').title('Videos'),
                      S.documentTypeListItem('youtubePlaylist').title('Playlists'),
                    ])
                ),
              S.divider(),
              // Twitter/X
              S.listItem()
                .title('Twitter/X')
                .icon(SiX)
                .child(
                  S.list()
                    .title('Twitter/X Hub')
                    .items([
                      S.documentTypeListItem('twitterProfile').title('Profiles'),
                      S.divider(),
                      S.documentTypeListItem('twitterArchive').title('Archived Tweets'),
                    ])
                ),
              S.divider(),
              // TikTok
              S.listItem()
                .title('TikTok')
                .icon(SiTiktok)
                .child(
                  S.list()
                    .title('TikTok Hub')
                    .items([
                      S.documentTypeListItem('tiktokProfile').title('Profiles'),
                      S.divider(),
                      S.documentTypeListItem('tiktokArchive').title('Archived Videos'),
                    ])
                ),
              S.divider(),
              // Facebook
              S.listItem()
                .title('Facebook')
                .icon(SiFacebook)
                .child(
                  S.list()
                    .title('Facebook Hub')
                    .items([
                      S.documentTypeListItem('facebookProfile').title('Profiles'),
                      S.divider(),
                      S.documentTypeListItem('facebookArchive').title('Archived Posts'),
                    ])
                ),
            ])
        ),
      S.divider(),

      // --- MEDIA & ASSETS ---
      S.listItem()
        .title('Media')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Media Library')
            .items([
              S.documentTypeListItem('gallery').title('Galleries'),
              S.divider(),
              S.documentTypeListItem('photo').title('Photos'),
            ])
        ),
      S.divider(),

      // --- ENTITIES ---
      S.listItem()
        .title('Entities')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('Network')
            .items([
              S.documentTypeListItem('person').title('People'),
            ])
        ),
      S.divider(),

      // Filter out types that are already handled above
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          ![
            // Admin
            'adminProfile',
            'siteManifesto',
            'devManifesto',
            'logType',
            // Editorial
            'article',
            'post',
            'stream',
            'share',
            // Spotify
            'spotifyProfile',
            'spotifyArtist',
            'spotifyAlbum',
            'spotifyPlaylist',
            // Facebook
            'facebookProfile',
            'facebookArchive',
            // Instagram
            'instagramProfile',
            'instagramArchive',
            // YouTube
            'youtubeProfile',
            'youtubeVideo',
            'youtubePlaylist',
            // Twitter
            'twitterProfile',
            'twitterArchive',
            // TikTok
            'tiktokProfile',
            'tiktokArchive',
            // Media
            'photo',
            'gallery',
            // Entities & System
            'person',
            'tag',
            'media.tag',
            'location',
            'year',
            // System
            'sanity.assist.context',
          ].includes(listItem.getId())
      ),
    ])
