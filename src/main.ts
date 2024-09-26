import { join } from "jsr:@std/path";
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader'
import { loadSchemaSync } from '@graphql-tools/load'
import { resolvers } from "/src/resolvers.ts";
import { addResolversToSchema } from '@graphql-tools/schema'
import { createYoga } from 'graphql-yoga'

const schema = loadSchemaSync(join(Deno.cwd(),'schema.graphql'), { loaders: [new GraphQLFileLoader()] });

const yoga = createYoga({
  schema: addResolversToSchema({schema, resolvers}),
  cors: {
    origin: 'https://studio.apollographql.com',
    credentials: true,
    methods: ['POST'],
  }
})

const port = 3000;

const onListen = () => {
  const url = `localhost:${port}/graphql`;
  console.log(`Server is running on: ${url}`);
};

Deno.serve({ port, onListen }, yoga);