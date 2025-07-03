import { type SchemaTypeDefinition } from 'sanity'
import { linkType } from './linkType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [linkType],
}
