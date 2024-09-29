import { Resolvers } from "./graphql";
import { userService, ownerService, organizationService } from "./common/di";
import { YogaInitialContext } from "graphql-yoga";
import { AuthResult } from "express-oauth2-jwt-bearer";

export interface GraphQlContext extends YogaInitialContext {
    userId: string
}

export var resolvers:Resolvers<GraphQlContext> = {
    Query: {
        owner: async (_, { id }) => {
            return await ownerService.getOwnerById(id);
        },
    },
    Mutation: {
        createUserFormField: async (_, args, __, ___) => {
            return await userService.createUserFormField(args.input)
        },
        createOrganization: async (_, { input }, context) => {

            return await organizationService.createOrganization(
                input, 
                { 
                    email: input.userMail, 
                    name: input.userName, 
                    authId: context.userId 
                });
        }
    }
}