// actions/syncFilenameAction.ts
import { useDocumentOperation } from 'sanity'

export function SyncFilenameAction(props: any) {
  const { patch, publish } = useDocumentOperation(props.id, props.type)

  return {
    label: 'Sync & Publish',
    onHandle: async () => {
      // 1. Check if title is empty and image exists
      if (!props.draft?.title && props.draft?.image?.asset?._ref) {
        const client = props.getClient({ apiVersion: '2023-01-01' })
        const asset = await client.fetch(`*[_id == $id][0]`, { id: props.draft.image.asset._ref })
        
        if (asset?.originalFilename) {
          // 2. Patch the title with the filename (removing extension)
          const cleanName = asset.originalFilename.replace(/\.[^/.]+$/, "")
          patch.execute([{ set: { title: cleanName } }])
        }
      }
      publish.execute()
      props.onComplete()
    }
  }
}