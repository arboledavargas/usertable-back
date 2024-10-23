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

export enum FieldType {
  Text = 'TEXT',
  Number = 'NUMBER',
  Date = 'DATE',
  Boolean = 'BOOLEAN'
}

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum PaginationDirection {
  Forward = 'Forward',
  Backward = 'Backward'
}

export type CustomerOrder = {
  field: Scalars['String']['input'];
  direction: OrderDirection;
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CustomerFormField = {
  __typename?: 'CustomerFormField';
  id: Scalars['String']['output'];
  fieldName: Scalars['String']['output'];
  type: FieldType;
};

export type CustomerProperty = {
  __typename?: 'CustomerProperty';
  name: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  id: Scalars['String']['output'];
  properties: Array<CustomerProperty>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  email: Scalars['String']['output'];
  organization: Organization;
};

export type CustomerEdge = {
  __typename?: 'CustomerEdge';
  node: Customer;
  cursor: Scalars['String']['output'];
};

export type CustomerConnection = {
  __typename?: 'CustomerConnection';
  edges: Array<CustomerEdge>;
};

export type FormFieldValueInput = {
  customerFormFieldId: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CustomerInput = {
  properties: Array<FormFieldValueInput>;
};

export type Filter = {
  fieldName: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type CustomerFormFieldInput = {
  fieldName: Scalars['String']['input'];
  type: FieldType;
};

export type OrganizationInput = {
  name: Scalars['String']['input'];
  userMail: Scalars['String']['input'];
  userName: Scalars['String']['input'];
};

export type CreateCustomerFormFieldPayload = {
  __typename?: 'CreateCustomerFormFieldPayload';
  customerFormField?: Maybe<CustomerFormField>;
  success: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type CreateOrganizationPayload = {
  __typename?: 'CreateOrganizationPayload';
  organization?: Maybe<Organization>;
  success: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type DeleteCustomerPayload = {
  __typename?: 'DeleteCustomerPayload';
  success: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type CreateCustomerPayload = {
  __typename?: 'CreateCustomerPayload';
  customer?: Maybe<Customer>;
  success: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  filterCustomers: CustomerConnection;
  getCustomerById: Customer;
  searchCustomers: Array<Customer>;
  getCustomerFormFields: Array<CustomerFormField>;
  user?: Maybe<User>;
};


export type QueryFilterCustomersArgs = {
  filters: Array<Filter>;
  take?: InputMaybe<Scalars['Int']['input']>;
  cursor?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<PaginationDirection>;
  orderBy?: InputMaybe<CustomerOrder>;
};


export type QueryGetCustomerByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchCustomersArgs = {
  searchText: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCustomerFormField: CreateCustomerFormFieldPayload;
  deleteCustomer: DeleteCustomerPayload;
  createOrganization: CreateOrganizationPayload;
  createCustomer: CreateCustomerPayload;
};


export type MutationCreateCustomerFormFieldArgs = {
  input: CustomerFormFieldInput;
};


export type MutationDeleteCustomerArgs = {
  userId: Scalars['String']['input'];
};


export type MutationCreateOrganizationArgs = {
  input: OrganizationInput;
};


export type MutationCreateCustomerArgs = {
  input: CustomerInput;
};



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
export type ResolversTypes = {
  FieldType: FieldType;
  OrderDirection: OrderDirection;
  PaginationDirection: PaginationDirection;
  CustomerOrder: CustomerOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Organization: ResolverTypeWrapper<Organization>;
  CustomerFormField: ResolverTypeWrapper<CustomerFormField>;
  CustomerProperty: ResolverTypeWrapper<CustomerProperty>;
  Customer: ResolverTypeWrapper<Customer>;
  User: ResolverTypeWrapper<User>;
  CustomerEdge: ResolverTypeWrapper<CustomerEdge>;
  CustomerConnection: ResolverTypeWrapper<CustomerConnection>;
  FormFieldValueInput: FormFieldValueInput;
  CustomerInput: CustomerInput;
  Filter: Filter;
  CustomerFormFieldInput: CustomerFormFieldInput;
  OrganizationInput: OrganizationInput;
  CreateCustomerFormFieldPayload: ResolverTypeWrapper<CreateCustomerFormFieldPayload>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateOrganizationPayload: ResolverTypeWrapper<CreateOrganizationPayload>;
  DeleteCustomerPayload: ResolverTypeWrapper<DeleteCustomerPayload>;
  CreateCustomerPayload: ResolverTypeWrapper<CreateCustomerPayload>;
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  CustomerOrder: CustomerOrder;
  String: Scalars['String']['output'];
  Organization: Organization;
  CustomerFormField: CustomerFormField;
  CustomerProperty: CustomerProperty;
  Customer: Customer;
  User: User;
  CustomerEdge: CustomerEdge;
  CustomerConnection: CustomerConnection;
  FormFieldValueInput: FormFieldValueInput;
  CustomerInput: CustomerInput;
  Filter: Filter;
  CustomerFormFieldInput: CustomerFormFieldInput;
  OrganizationInput: OrganizationInput;
  CreateCustomerFormFieldPayload: CreateCustomerFormFieldPayload;
  Boolean: Scalars['Boolean']['output'];
  CreateOrganizationPayload: CreateOrganizationPayload;
  DeleteCustomerPayload: DeleteCustomerPayload;
  CreateCustomerPayload: CreateCustomerPayload;
  Query: {};
  Int: Scalars['Int']['output'];
  Mutation: {};
};

export type OrganizationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Organization'] = ResolversParentTypes['Organization']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerFormFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerFormField'] = ResolversParentTypes['CustomerFormField']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fieldName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FieldType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerPropertyResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerProperty'] = ResolversParentTypes['CustomerProperty']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['CustomerProperty']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  organization?: Resolver<ResolversTypes['Organization'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerEdgeResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerEdge'] = ResolversParentTypes['CustomerEdge']> = {
  node?: Resolver<ResolversTypes['Customer'], ParentType, ContextType>;
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerConnection'] = ResolversParentTypes['CustomerConnection']> = {
  edges?: Resolver<Array<ResolversTypes['CustomerEdge']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCustomerFormFieldPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCustomerFormFieldPayload'] = ResolversParentTypes['CreateCustomerFormFieldPayload']> = {
  customerFormField?: Resolver<Maybe<ResolversTypes['CustomerFormField']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateOrganizationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateOrganizationPayload'] = ResolversParentTypes['CreateOrganizationPayload']> = {
  organization?: Resolver<Maybe<ResolversTypes['Organization']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteCustomerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteCustomerPayload'] = ResolversParentTypes['DeleteCustomerPayload']> = {
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateCustomerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateCustomerPayload'] = ResolversParentTypes['CreateCustomerPayload']> = {
  customer?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  filterCustomers?: Resolver<ResolversTypes['CustomerConnection'], ParentType, ContextType, RequireFields<QueryFilterCustomersArgs, 'filters'>>;
  getCustomerById?: Resolver<ResolversTypes['Customer'], ParentType, ContextType, RequireFields<QueryGetCustomerByIdArgs, 'id'>>;
  searchCustomers?: Resolver<Array<ResolversTypes['Customer']>, ParentType, ContextType, RequireFields<QuerySearchCustomersArgs, 'searchText'>>;
  getCustomerFormFields?: Resolver<Array<ResolversTypes['CustomerFormField']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createCustomerFormField?: Resolver<ResolversTypes['CreateCustomerFormFieldPayload'], ParentType, ContextType, RequireFields<MutationCreateCustomerFormFieldArgs, 'input'>>;
  deleteCustomer?: Resolver<ResolversTypes['DeleteCustomerPayload'], ParentType, ContextType, RequireFields<MutationDeleteCustomerArgs, 'userId'>>;
  createOrganization?: Resolver<ResolversTypes['CreateOrganizationPayload'], ParentType, ContextType, RequireFields<MutationCreateOrganizationArgs, 'input'>>;
  createCustomer?: Resolver<ResolversTypes['CreateCustomerPayload'], ParentType, ContextType, RequireFields<MutationCreateCustomerArgs, 'input'>>;
};

export type Resolvers<ContextType = any> = {
  Organization?: OrganizationResolvers<ContextType>;
  CustomerFormField?: CustomerFormFieldResolvers<ContextType>;
  CustomerProperty?: CustomerPropertyResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  CustomerEdge?: CustomerEdgeResolvers<ContextType>;
  CustomerConnection?: CustomerConnectionResolvers<ContextType>;
  CreateCustomerFormFieldPayload?: CreateCustomerFormFieldPayloadResolvers<ContextType>;
  CreateOrganizationPayload?: CreateOrganizationPayloadResolvers<ContextType>;
  DeleteCustomerPayload?: DeleteCustomerPayloadResolvers<ContextType>;
  CreateCustomerPayload?: CreateCustomerPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
};

