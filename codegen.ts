import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schema.graphql',
  generates: {
    './src/graphql.ts': {
      config: {
        useIndexSignature: true,
        contextTypes: './main#GraphQlContext',
      },
      plugins: ['typescript', 'typescript-resolvers'],
    },
  },
};

export default config;