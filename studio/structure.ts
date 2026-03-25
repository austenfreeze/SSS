import { S } from 'sanity/structure'

export const myStructure = (S: any) =>
  S.list()
    .title('The Archive')
    .items([
      S.documentTypeListItem('photo').title('All Photos'),
      S.documentTypeListItem('gallery').title('Collections'),
      S.divider(),
      S.documentTypeListItem('person').title('People'),
      S.documentTypeListItem('location').title('Locations'),
      S.documentTypeListItem('tag').title('Tags'),
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          !['photo', 'gallery', 'person', 'location', 'tag'].includes(listItem.getId())
      ),
    ])