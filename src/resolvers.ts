import { Resolvers } from "./graphql";
import { customerService, ownerService, organizationService } from "./common/di";
import { YogaInitialContext } from "graphql-yoga";

export interface GraphQlContext extends YogaInitialContext {
    userId: string
}

export var resolvers:Resolvers<GraphQlContext> = {
    Query: {
        owner: async (_, __, { userId }) => {
            return await ownerService.getOwnerById(userId);
        },
    },
    Mutation: {
        createCustomerFormField: async (_, { input }, { userId }) => {
            return await customerService.createCustomerFormField(input, userId)
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