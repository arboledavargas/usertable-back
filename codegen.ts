import { codegen } from "@graphql-codegen/core";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import { join } from "@std/path";
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

const schema = loadSchemaSync(join(Deno.cwd(), 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const outputFile = "./src/graphql.ts";

const output = await codegen({
  documents: [],
  config: {},
  // used by a plugin internally, although the 'typescript' plugin currently
  // returns the string output, rather than writing to a file
  filename: outputFile,
  schema: schema,//parse(printSchema(schema)),
  plugins: [
    // Each plugin should be an object
    {
      typescript: {}, // Here you can pass configuration to the plugin
    },
    {
      typescriptResolvers: {},
    },
  ],
  pluginMap: {
    typescript: typescriptPlugin,
    typescriptResolvers: typescriptResolversPlugin,
  },
});

await Deno.writeFile(outputFile, new TextEncoder().encode(output));
console.log("Outputs generated!");
