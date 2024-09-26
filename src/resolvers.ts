import { Resolvers } from "./graphql.ts";
import { userService, ownerService } from "/src/common/di.ts";

export var resolvers:Resolvers = {
    Query: {
        owners: async () => {
            return await ownerService.getAllOwners();
        },
        owner: async (_, { id }) => {
            return await ownerService.getOwnerById(id);
        },
    },
    Mutation: {
        createUserFormField: async (_, args, __, ___) => {
            return await userService.createUserFormField(args.input)
        },
        createOwner: async (_, { input }) => {
            return await ownerService.createOwner(input);
        },
        updateOwner: async (_, { id, input }) => {
            return await ownerService.updateOwner(id, input);
        },
        deleteOwner: async (_, { id }) => {
            return await ownerService.deleteOwner(id);
        },
    }
}