// spotifyArtist.ts
export const spotifyArtist = {
  name: 'spotifyArtist',
  type: 'document',
  title: 'Spotify Artist',
  fields: [
    { name: 'name', type: 'string' },
    { name: 'spotifyUrl', type: 'url' },
    { name: 'image', type: 'image' }
  ]
}

// spotifyPlaylist.ts (Enhanced)
export const spotifyPlaylist = {
  name: 'spotifyPlaylist',
  type: 'document',
  title: 'Spotify Playlist',
  fields: [
    { name: 'title', type: 'string' },
    { name: 'coverArt', type: 'image', options: { hotspot: true } },
    {
      name: 'tracks',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'songTitle', type: 'string' },
          { name: 'artist', type: 'reference', to: [{ type: 'spotifyArtist' }] }, // Relational link to Artist
          { name: 'duration', type: 'string' }
        ]
      }]
    }
  ]
}