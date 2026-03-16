// structure.ts
export const myStructure = (S: any) =>
  S.list()
    .title('The Archive')
    .items([
      // 1. The Visual Archive
      S.listItem()
        .title('Media Vault')
        .child(
          S.list()
            .title('Media')
            .items([
              S.documentTypeListItem('photo').title('All Photos'),
              S.documentTypeListItem('gallery').title('Galleries & Collections'),
            ])
        ),

      S.divider(),

      // 2. The Relationship Graph
      S.listItem()
        .title('Context & Entities')
        .child(
          S.list()
            .title('Who, Where, What')
            .items([
              S.documentTypeListItem('person').title('People/Contacts'),
              S.documentTypeListItem('location').title('Locations'),
              S.documentTypeListItem('tag').title('Taxonomy (Tags)'),
            ])
        ),

      S.divider(),

      // 3. System & Metadata

      // Automatically add any new schemas we haven't categorized yet
      ...S.documentTypeListItems().filter(
        (listItem: any) =>
          !['photo', 'gallery', 'person', 'location', 'tag',].includes(
            listItem.getId()
          )
      ),
    ])