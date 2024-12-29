import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import express from "express";
import { auth, AuthResult } from "express-oauth2-jwt-bearer";
import { join } from "node:path";
import { resolvers } from "./resolvers.ts";
import helmet from "helmet";
import cors from "cors";
import body from "body-parser";

interface RequestWithAuth extends express.Request {
  auth: AuthResult;
}

const schema = loadSchemaSync(join(Deno.cwd(), "schema.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const server = new ApolloServer({
  schema: addResolversToSchema({ schema, resolvers }),
});

const port = 4000;

const jwtCheck = auth({
  audience: "http://localhost:3000",
  issuerBaseURL: "https://dev-dcr1tflkwnijlpv7.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

const app = express();

// Configure helmet with relaxed CORS settings
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: false,
  }),
);

// Configure CORS with all necessary options
app.use(
  cors({
    origin: [
      "https://studio.apollographql.com",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
    methods: ["POST", "GET", "OPTIONS", "HEAD"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "apollo-require-preflight",
      "x-apollo-operation-name",
      "x-apollo-operation-id",
    ],
  }),
);

// Middleware to add JWT auth to the context
app.use(jwtCheck);

await server.start();

// Apply Apollo middleware with context for authentication
app.use(
  "/graphql",
  body.json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      const authReq = req as RequestWithAuth;
      const sub = await authReq.auth?.payload?.sub;

      if (!sub) throw new Error("Unauthorized, sub claim not present in jwt");

      return { userId: sub };
    },
  }),
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/graphql`);
});
