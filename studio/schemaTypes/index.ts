// schemas/index.ts
import photo from './photo'
import person from './person'
import tag from './tag'
import location from './location'
import gallery from './gallery'
import photoCaption from './photoCaption'

export const schemaTypes = [
  photo,
  person,
  tag,
  location,
  gallery,
photoCaption,
  // Add more as we build them: document, video, snippet, etc.
]