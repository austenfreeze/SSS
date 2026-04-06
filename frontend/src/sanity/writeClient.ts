import { createClient } from 'next-sanity'

/**
 * Authenticated Sanity client for write operations.
 * This client uses a server-side token and should NEVER be exposed to the client.
 * Only use in API routes and server components.
 */
export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2026-04-06',
  token: process.env.SANITY_API_WRITE_TOKEN,
  useCdn: false,
})

/**
 * Generate a unique ID for new documents
 */
export function generateId(prefix: string = 'doc'): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Sanity mutation helpers
 */
export const mutations = {
  /**
   * Create a new document
   */
  async create<T extends Record<string, any>>(
    type: string,
    data: T,
    customId?: string
  ) {
    const id = customId || generateId(type)
    const doc = {
      _id: id,
      _type: type,
      ...data,
    }
    return writeClient.create(doc)
  },

  /**
   * Update an existing document by ID
   */
  async update(id: string, data: Record<string, any>) {
    return writeClient.patch(id).set(data).commit()
  },

  /**
   * Delete a document by ID
   */
  async delete(id: string) {
    return writeClient.delete(id)
  },

  /**
   * Create or replace a document (upsert)
   */
  async createOrReplace<T extends Record<string, any>>(
    id: string,
    type: string,
    data: T
  ) {
    const doc = {
      _id: id,
      _type: type,
      ...data,
    }
    return writeClient.createOrReplace(doc)
  },

  /**
   * Append item to an array field
   */
  async appendToArray(
    docId: string,
    fieldName: string,
    item: Record<string, any>
  ) {
    return writeClient
      .patch(docId)
      .setIfMissing({ [fieldName]: [] })
      .append(fieldName, [item])
      .commit()
  },

  /**
   * Remove item from an array field by _key
   */
  async removeFromArray(docId: string, fieldName: string, itemKey: string) {
    return writeClient
      .patch(docId)
      .unset([`${fieldName}[_key=="${itemKey}"]`])
      .commit()
  },

  /**
   * Reorder array items
   */
  async reorderArray(
    docId: string,
    fieldName: string,
    items: Array<{ _key: string; [key: string]: any }>
  ) {
    return writeClient.patch(docId).set({ [fieldName]: items }).commit()
  },
}

export default writeClient
