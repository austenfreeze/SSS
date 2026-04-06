import { S } from 'sanity/structure'
import { 
  EditIcon, 
  BookIcon, 
  ComposeIcon, 
  SearchIcon,
  ActivityIcon, // For Stream
  ShareIcon,    // For Share
  DocumentIcon, // For Article
  UsersIcon,
  TiersIcon
} from '@sanity/icons'

export const myStructure = (S: any) =>
  S.list()
    .title('STENxSTUDIO')
    .items([
      // --- ADMIN SECTION ---
      S.listItem()
        .title('Admin')
        .child(
          S.list()
            .title('Studio Admin')
            .items([
              S.listItem()
                .title('Admin Profile')
                .child(S.document().schemaType('adminProfile').documentId('adminProfile')),
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
              // High-Production Features
              S.documentTypeListItem('article')
                .title('Articles')
                .icon(DocumentIcon),
              S.divider(),
              S.documentTypeListItem('post')
                .title('Posts')
                .icon(BookIcon),
              S.divider(),
              // High-Velocity / Low-Friction
              S.documentTypeListItem('stream')
                .title('Streams')
                .icon(ActivityIcon),
              S.divider(),
              S.documentTypeListItem('share')
                .title('Shares')
                .icon(ShareIcon),
              S.divider(),
            ])
        ),
      S.divider(),

      // --- MUSIC PORTAL ---
      S.listItem()
        .title('Music Portal')

        .child(
          S.list()
            .title('Audio Archives')
            .items([
              S.documentTypeListItem('spotifyProfile').title('Profiles'),
              S.divider(),
              S.documentTypeListItem('spotifyArtist').title('Artists'),
              S.documentTypeListItem('spotifyAlbum').title('Albums'),
              S.documentTypeListItem('spotifyPlaylist').title('Playlists'),
            ])
        ),
      S.divider(),

      // --- MEDIA & ASSETS ---
      S.listItem()
        .title('Media')
        .child(
          S.list()
            .title('Classification')
            .items([
              S.documentTypeListItem('photo').title('Photos'),
              S.documentTypeListItem('gallery').title('Media Galleries'),
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
            'photo', 
            'gallery', 
            'person', 
            'tag', 
            'logType', 
            'media.tag', 
            'location', 
            'siteManifesto', 
            'devManifesto', 
            'adminProfile',
            'article', // Added to filter
            'post',
            'stream',  // Added to filter
            'share',   // Added to filter
            'spotifyProfile',
            'spotifyArtist',
            'spotifyAlbum',
            'spotifyPlaylist',
            'sanity.assist.context'
          ].includes(listItem.getId())
      ),
    ])