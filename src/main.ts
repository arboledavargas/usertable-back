import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import 'dotenv/config';
import express from 'express';
import { auth, AuthResult } from 'express-oauth2-jwt-bearer';
import { createYoga } from 'graphql-yoga';
import { join } from "node:path";
import { resolvers } from "./resolvers";
import { Request } from "express";

interface RequestWithAuth extends Request {
  auth: AuthResult
}

declare module "graphql-yoga" {
  interface YogaInitialContext {
    req: RequestWithAuth
  }
}

const schema = loadSchemaSync(join(process.cwd(), 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const yoga = createYoga({
  schema: addResolversToSchema({ schema, resolvers }),
  context:(context) => {
    const sub = context.req.auth.payload.sub
    
    if(!sub) throw new Error('Unauthorized, sub claim not present in jwt');

    return { ...context, userId: sub }
  },
  cors: {
    origin: 'https://studio.apollographql.com',
    credentials: true,
    methods: ['POST'],
  },
});

const port = 3000;

const jwtCheck = auth({
  audience: 'http://localhost:3000',
  issuerBaseURL: 'https://dev-dcr1tflkwnijlpv7.us.auth0.com/',
  tokenSigningAlg: 'RS256',
});

const app = express();

app.use(jwtCheck);

app.use(yoga.graphqlEndpoint, yoga);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/graphql`);
});