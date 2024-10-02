import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type CreateCustomerFormFieldPayload = {
  __typename?: 'CreateCustomerFormFieldPayload';
  customerFormField?: Maybe<CustomerFormField>;
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  message?: Maybe<Scalars['String']['output']>;
  organization?: Maybe<Organization>;
  success: Scalars['Boolean']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['String']['output'];
  properties: Array<CustomerFormFieldValue>;
};

export type CustomerFiltersInput = {
  filters: Array<Filter>;
};

export type CustomerFormField = {
  __typename?: 'CustomerFormField';
  fieldName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  type: FieldType;
};

export type CustomerFormFieldInput = {
  fieldName: Scalars['String']['input'];
  type: FieldType;
};

export type CustomerFormFieldValue = {
  __typename?: 'CustomerFormFieldValue';
  customerFormFieldId: Scalars['String']['output'];
  customerId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type DeleteCustomerPayload = {
  __typename?: 'DeleteCustomerPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export enum FieldType {
  Boolean = 'BOOLEAN',
  Date = 'DATE',
  Number = 'NUMBER',
  Text = 'TEXT'
}

export type Filter = {
  fieldId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCustomerFormField: CreateCustomerFormFieldPayload;
  createOrganization?: Maybe<CreateOrganizationPayload>;
  deleteCustomer: DeleteCustomerPayload;
};


export type MutationCreateCustomerFormFieldArgs = {
  input: CustomerFormFieldInput;
};


export type MutationCreateOrganizationArgs = {
  input: OrganizationInput;
};


export type MutationDeleteCustomerArgs = {
  userId: Scalars['String']['input'];
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type OrganizationInput = {
  name: Scalars['String']['input'];
  userMail: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type Owner = {
  __typename?: 'Owner';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
};

export type Query = {
  __typename?: 'Query';
  filterCustomers: Array<Customer>;
  getOrganizationCustomerFormFields: Array<CustomerFormField>;
  owner?: Maybe<Owner>;
  searchCustomers: Array<Customer>;
};


export type QueryFilterCustomersArgs = {
  filter: CustomerFiltersInput;
};


export type QueryGetOrganizationCustomerFormFieldsArgs = {
  organizationId: Scalars['String']['input'];
};


export type QuerySearchCustomersArgs = {
  searchText: Scalars['String']['input'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateCustomerFormFieldPayload: ResolverTypeWrapper<CreateCustomerFormFieldPayload>;
  CreateOrganizationPayload: ResolverTypeWrapper<CreateOrganizationPayload>;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerFiltersInput: CustomerFiltersInput;
  CustomerFormField: ResolverTypeWrapper<CustomerFormField>;
  CustomerFormFieldInput: CustomerFormFieldInput;
  CustomerFormFieldValue: ResolverTypeWrapper<CustomerFormFieldValue>;
  DeleteCustomerPayload: ResolverTypeWrapper<DeleteCustomerPayload>;
  FieldType: FieldType;
  Filter: Filter;
  Mutation: ResolverTypeWrapper<{}>;
  Organization: ResolverTypeWrapper<Organization>;
  OrganizationInput: OrganizationInput;
  Owner: ResolverTypeWrapper<Owner>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateCustomerFormFieldPayload: CreateCustomerFormFieldPayload;
  CreateOrganizationPayload: CreateOrganizationPayload;
  Customer: Customer;
  CustomerFiltersInput: CustomerFiltersInput;
  CustomerFormField: CustomerFormField;
  CustomerFormFieldInput: CustomerFormFieldInput;
  CustomerFormFieldValue: CustomerFormFieldValue;
  DeleteCustomerPayload: DeleteCustomerPayload;
  Filter: Filter;
  Mutation: {};
  Organization: Organization;
  OrganizationInput: OrganizationInput;
  Owner: Owner;
  Query: {};
  String: Scalars['String']['output'];
}>;

export type CreateCustomerFormFieldPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCustomerFormFieldPayload'] = ResolversParentTypes['CreateCustomerFormFieldPayload']> = ResolversObject<{
  customerFormField?: Resolver<Maybe<ResolversTypes['CustomerFormField']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateOrganizationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOrganizationPayload'] = ResolversParentTypes['CreateOrganizationPayload']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['CustomerFormFieldValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerFormFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerFormField'] = ResolversParentTypes['CustomerFormField']> = ResolversObject<{
  fieldName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FieldType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerFormFieldValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerFormFieldValue'] = ResolversParentTypes['CustomerFormFieldValue']> = ResolversObject<{
  customerFormFieldId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteCustomerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCustomerPayload'] = ResolversParentTypes['DeleteCustomerPayload']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCustomerFormField?: Resolver<ResolversTypes['CreateCustomerFormFieldPayload'], ParentType, ContextType, RequireFields<MutationCreateCustomerFormFieldArgs, 'input'>>;
  createOrganization?: Resolver<Maybe<ResolversTypes['CreateOrganizationPayload']>, ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'input'>>;
  deleteCustomer?: Resolver<ResolversTypes['DeleteCustomerPayload'], ParentType, ContextType, RequireFields<MutationDeleteCustomerArgs, 'userId'>>;
}>;

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  filterCustomers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QueryFilterCustomersArgs, 'filter'>>;
  getOrganizationCustomerFormFields?: Resolver<Array<ResolversTypes['CustomerFormField']>, ParentType, ContextType, RequireFields<QueryGetOrganizationCustomerFormFieldsArgs, 'organizationId'>>;
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>;
  searchCustomers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QuerySearchCustomersArgs, 'searchText'>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CreateCustomerFormFieldPayload?: CreateCustomerFormFieldPayloadResolvers<ContextType>;
  CreateOrganizationPayload?: CreateOrganizationPayloadResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerFormField?: CustomerFormFieldResolvers<ContextType>;
  CustomerFormFieldValue?: CustomerFormFieldValueResolvers<ContextType>;
  DeleteCustomerPayload?: DeleteCustomerPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

