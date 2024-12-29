import { Resolvers } from "./graphql.ts";
import {
  customerService,
  organizationService,
  ownerService,
} from "./common/di.ts";
import { YogaInitialContext } from "graphql-yoga";

export interface GraphQlContext extends YogaInitialContext {
  userId: string;
}

export const resolvers: Resolvers<GraphQlContext> = {
  Query: {
    user: async (_, __, { userId }) => {
      return await ownerService.getOwnerById(userId);
    },
    getCustomerFormFields: async (_, __, { userId }) => {
      return await customerService.getCustomerFormFields(userId);
    },
    filterCustomers: async (_, params, { userId }) => {
      return await customerService.filterCustomers(params, userId);
    },
    getCustomerById: async (_, { id }) => {
      return await customerService.getCustomerById(id);
    },
  },
  Mutation: {
    createCustomerFormField: async (_, { input }, { userId }) => {
      return await customerService.createCustomerFormField(input, userId);
    },
    createOrganization: async (_, { input }, context) => {
      return await organizationService.createOrganization(input, {
        email: input.userMail,
        name: input.userName,
        authId: context.userId,
      });
    },
    createCustomer: async (_, { input }, { userId }) => {
      return await customerService.createCustomer(input, userId);
    },
    updateCustomer: async (_, { input, id }) => {
      return await customerService.updateCustomer(id, input);
    },
    deleteCustomers: async (_, { userIds }) => {
      return await customerService.deleteCustomers(userIds);
    },
  },
};
