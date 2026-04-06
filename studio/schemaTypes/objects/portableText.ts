import { defineType, defineArrayMember } from 'sanity';
import { 
  ImageIcon, 
  PlayIcon, 
  ImagesIcon, 
  LinkIcon, 
  DocumentVideoIcon 
} from '@sanity/icons';

const portableText = defineType({
  name: 'portableText',
  title: 'Forensic Narrative',
  type: 'array',
  of: [
    // 1. THE TEXT ENGINE (Memos, Headlines, Redactions)
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Standard', value: 'normal' },
        { title: 'Typewriter (Memo)', value: 'blockquote' },
        { title: 'Leaked Headline', value: 'h2' },
        { title: 'Classified Subhead', value: 'h3' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Redacted (Strike)', value: 'strike' },
          { title: 'Underline', value: 'underline' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'External Intel',
            fields: [{ name: 'href', type: 'url', title: 'URL' }],
          },
          {
            name: 'internalReference',
            type: 'object',
            title: 'File Link',
            fields: [
              {
                name: 'reference',
                type: 'reference',
                to: [{ type: 'person' }, { type: 'photo' }, { type: 'location' }],
              },
            ],
          },
        ],
      },
    }),

    // 2. EMBEDDED EVIDENCE (Multimedia Blocks)
    
    // Images & GIFs (Direct)
    defineArrayMember({
      type: 'image',
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [{ name: 'caption', type: 'string', title: 'Caption' }]
    }),

    // Video/Audio Files (Direct Upload)
    defineArrayMember({
      name: 'mediaFile',
      title: 'Local Media File',
      type: 'file',
      icon: DocumentVideoIcon,
      options: { accept: 'video/*,audio/*' },
      fields: [{ name: 'description', type: 'string', title: 'Context' }]
    }),

    // YouTube/Vimeo/External Links
    defineArrayMember({
      name: 'videoEmbed',
      title: 'Video Embed',
      type: 'object',
      icon: PlayIcon,
      fields: [
        { name: 'url', type: 'url', title: 'URL' },
        { name: 'caption', type: 'string', title: 'Caption' }
      ]
    }),

    // Spotify Integration
    defineArrayMember({
      name: 'spotifyEmbed',
      title: 'Spotify Evidence',
      type: 'reference',
      to: [{ type: 'spotifyPlaylist' }, { type: 'spotifyAlbum' }]
    }),

    // Media Galleries
    defineArrayMember({
      name: 'galleryRef',
      title: 'Media Gallery',
      type: 'reference',
      icon: ImagesIcon,
      to: [{ type: 'gallery' }]
    }),
  ],
});

export default portableText;