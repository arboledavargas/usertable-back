import type { CodegenConfig } from '@graphql-codegen/cli';
import { generate } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'schema.graphql',
  generates: {
    './src/graphql.ts': {
      config: {
        useIndexSignature: true,
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

const output = await generate(config, true)