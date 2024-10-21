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

export type CreateCustomerPayload = {
  __typename?: 'CreateCustomerPayload';
  customer?: Maybe<Customer>;
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
  properties: Array<CustomerProperty>;
};

export type CustomerConnection = {
  __typename?: 'CustomerConnection';
  edges: Array<CustomerEdge>;
};

export type CustomerEdge = {
  __typename?: 'CustomerEdge';
  cursor: Scalars['String']['output'];
  node: Customer;
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

export type CustomerInput = {
  properties: Array<FormFieldValueInput>;
};

export type CustomerOrder = {
  direction: OrderDirection;
  field: Scalars['String']['input'];
};

export type CustomerProperty = {
  __typename?: 'CustomerProperty';
  name: Scalars['String']['output'];
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
  fieldName: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type FormFieldValueInput = {
  customerFormFieldId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCustomer: CreateCustomerPayload;
  createCustomerFormField: CreateCustomerFormFieldPayload;
  createOrganization: CreateOrganizationPayload;
  deleteCustomer: DeleteCustomerPayload;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
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

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

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

export enum PaginationDirection {
  Backward = 'Backward',
  Forward = 'Forward'
}

export type Query = {
  __typename?: 'Query';
  filterCustomers: CustomerConnection;
  getCustomerById: Customer;
  getCustomerFormFields: Array<CustomerFormField>;
  searchCustomers: Array<Customer>;
  user?: Maybe<User>;
};


export type QueryFilterCustomersArgs = {
  cursor?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<PaginationDirection>;
  filters: Array<Filter>;
  orderBy?: InputMaybe<CustomerOrder>;
  take?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetCustomerByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchCustomersArgs = {
  searchText: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  organization: Organization;
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
  CreateCustomerPayload: ResolverTypeWrapper<CreateCustomerPayload>;
  CreateOrganizationPayload: ResolverTypeWrapper<CreateOrganizationPayload>;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerConnection: ResolverTypeWrapper<CustomerConnection>;
  CustomerEdge: ResolverTypeWrapper<CustomerEdge>;
  CustomerFormField: ResolverTypeWrapper<CustomerFormField>;
  CustomerFormFieldInput: CustomerFormFieldInput;
  CustomerInput: CustomerInput;
  CustomerOrder: CustomerOrder;
  CustomerProperty: ResolverTypeWrapper<CustomerProperty>;
  DeleteCustomerPayload: ResolverTypeWrapper<DeleteCustomerPayload>;
  FieldType: FieldType;
  Filter: Filter;
  FormFieldValueInput: FormFieldValueInput;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OrderDirection: OrderDirection;
  Organization: ResolverTypeWrapper<Organization>;
  OrganizationInput: OrganizationInput;
  PaginationDirection: PaginationDirection;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateCustomerFormFieldPayload: CreateCustomerFormFieldPayload;
  CreateCustomerPayload: CreateCustomerPayload;
  CreateOrganizationPayload: CreateOrganizationPayload;
  Customer: Customer;
  CustomerConnection: CustomerConnection;
  CustomerEdge: CustomerEdge;
  CustomerFormField: CustomerFormField;
  CustomerFormFieldInput: CustomerFormFieldInput;
  CustomerInput: CustomerInput;
  CustomerOrder: CustomerOrder;
  CustomerProperty: CustomerProperty;
  DeleteCustomerPayload: DeleteCustomerPayload;
  Filter: Filter;
  FormFieldValueInput: FormFieldValueInput;
  Int: Scalars['Int']['output'];
  Mutation: {};
  Organization: Organization;
  OrganizationInput: OrganizationInput;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
}>;

export type CreateCustomerFormFieldPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCustomerFormFieldPayload'] = ResolversParentTypes['CreateCustomerFormFieldPayload']> = ResolversObject<{
  customerFormField?: Resolver<Maybe<ResolversTypes['CustomerFormField']>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CreateCustomerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCustomerPayload'] = ResolversParentTypes['CreateCustomerPayload']> = ResolversObject<{
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
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
  properties?: Resolver<Array<ResolversTypes['CustomerProperty']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerConnection'] = ResolversParentTypes['CustomerConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['CustomerEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerEdge'] = ResolversParentTypes['CustomerEdge']> = ResolversObject<{
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerFormFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerFormField'] = ResolversParentTypes['CustomerFormField']> = ResolversObject<{
  fieldName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FieldType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CustomerPropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerProperty'] = ResolversParentTypes['CustomerProperty']> = ResolversObject<{
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteCustomerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCustomerPayload'] = ResolversParentTypes['DeleteCustomerPayload']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCustomer?: Resolver<ResolversTypes['CreateCustomerPayload'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'input'>>;
  createCustomerFormField?: Resolver<ResolversTypes['CreateCustomerFormFieldPayload'], ParentType, ContextType, RequireFields<MutationCreateCustomerFormFieldArgs, 'input'>>;
  createOrganization?: Resolver<ResolversTypes['CreateOrganizationPayload'], ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'input'>>;
  deleteCustomer?: Resolver<ResolversTypes['DeleteCustomerPayload'], ParentType, ContextType, RequireFields<MutationDeleteCustomerArgs, 'userId'>>;
}>;

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  filterCustomers?: Resolver<ResolversTypes['CustomerConnection'], ParentType, ContextType, RequireFields<QueryFilterCustomersArgs, 'filters'>>;
  getCustomerById?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<QueryGetCustomerByIdArgs, 'id'>>;
  getCustomerFormFields?: Resolver<Array<ResolversTypes['CustomerFormField']>, ParentType, ContextType>;
  searchCustomers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QuerySearchCustomersArgs, 'searchText'>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CreateCustomerFormFieldPayload?: CreateCustomerFormFieldPayloadResolvers<ContextType>;
  CreateCustomerPayload?: CreateCustomerPayloadResolvers<ContextType>;
  CreateOrganizationPayload?: CreateOrganizationPayloadResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerConnection?: CustomerConnectionResolvers<ContextType>;
  CustomerEdge?: CustomerEdgeResolvers<ContextType>;
  CustomerFormField?: CustomerFormFieldResolvers<ContextType>;
  CustomerProperty?: CustomerPropertyResolvers<ContextType>;
  DeleteCustomerPayload?: DeleteCustomerPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Organization?: OrganizationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

