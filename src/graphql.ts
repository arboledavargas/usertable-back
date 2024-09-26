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

export type CreateUserFormFieldPayload = {
  __typename?: 'CreateUserFormFieldPayload';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
  userFormField?: Maybe<UserFormField>;
};

export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
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
  createOwner: OwnerPayload;
  createUserFormField: CreateUserFormFieldPayload;
  deleteOwner: OwnerPayload;
  deleteUser: DeleteUserPayload;
  updateOwner: OwnerPayload;
};


export type MutationCreateOwnerArgs = {
  input: OwnerInput;
};


export type MutationCreateUserFormFieldArgs = {
  input: UserFormFieldInput;
};


export type MutationDeleteOwnerArgs = {
  id: Scalars['String']['input'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['String']['input'];
};


export type MutationUpdateOwnerArgs = {
  id: Scalars['String']['input'];
  input: OwnerInput;
};

export type Owner = {
  __typename?: 'Owner';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type OwnerInput = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type OwnerPayload = {
  __typename?: 'OwnerPayload';
  message?: Maybe<Scalars['String']['output']>;
  owner?: Maybe<Owner>;
  success: Scalars['Boolean']['output'];
};

export type Query = {
  __typename?: 'Query';
  organizationFormFields: Array<UserFormField>;
  owner?: Maybe<Owner>;
  owners: Array<Owner>;
  searchUsers: Array<User>;
  users: Array<User>;
};


export type QueryOrganizationFormFieldsArgs = {
  organizationId: Scalars['String']['input'];
};


export type QueryOwnerArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchUsersArgs = {
  searchText: Scalars['String']['input'];
};


export type QueryUsersArgs = {
  filter: UserFiltersInput;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String']['output'];
  properties: Array<UserFormFieldValue>;
};

export type UserFiltersInput = {
  filters: Array<Filter>;
};

export type UserFormField = {
  __typename?: 'UserFormField';
  fieldName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  type: FieldType;
};

export type UserFormFieldInput = {
  fieldName: Scalars['String']['input'];
  type: FieldType;
};

export type UserFormFieldValue = {
  __typename?: 'UserFormFieldValue';
  id: Scalars['String']['output'];
  userFormFieldId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  value: Scalars['String']['output'];
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
  CreateUserFormFieldPayload: ResolverTypeWrapper<CreateUserFormFieldPayload>;
  DeleteUserPayload: ResolverTypeWrapper<DeleteUserPayload>;
  FieldType: FieldType;
  Filter: Filter;
  Mutation: ResolverTypeWrapper<{}>;
  Owner: ResolverTypeWrapper<Owner>;
  OwnerInput: OwnerInput;
  OwnerPayload: ResolverTypeWrapper<OwnerPayload>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
  UserFiltersInput: UserFiltersInput;
  UserFormField: ResolverTypeWrapper<UserFormField>;
  UserFormFieldInput: UserFormFieldInput;
  UserFormFieldValue: ResolverTypeWrapper<UserFormFieldValue>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  CreateUserFormFieldPayload: CreateUserFormFieldPayload;
  DeleteUserPayload: DeleteUserPayload;
  Filter: Filter;
  Mutation: {};
  Owner: Owner;
  OwnerInput: OwnerInput;
  OwnerPayload: OwnerPayload;
  Query: {};
  String: Scalars['String']['output'];
  User: User;
  UserFiltersInput: UserFiltersInput;
  UserFormField: UserFormField;
  UserFormFieldInput: UserFormFieldInput;
  UserFormFieldValue: UserFormFieldValue;
}>;

export type CreateUserFormFieldPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserFormFieldPayload'] = ResolversParentTypes['CreateUserFormFieldPayload']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  userFormField?: Resolver<Maybe<ResolversTypes['UserFormField']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type DeleteUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['DeleteUserPayload'] = ResolversParentTypes['DeleteUserPayload']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createOwner?: Resolver<ResolversTypes['OwnerPayload'], ParentType, ContextType, RequireFields<MutationCreateOwnerArgs, 'input'>>;
  createUserFormField?: Resolver<ResolversTypes['CreateUserFormFieldPayload'], ParentType, ContextType, RequireFields<MutationCreateUserFormFieldArgs, 'input'>>;
  deleteOwner?: Resolver<ResolversTypes['OwnerPayload'], ParentType, ContextType, RequireFields<MutationDeleteOwnerArgs, 'id'>>;
  deleteUser?: Resolver<ResolversTypes['DeleteUserPayload'], ParentType, ContextType, RequireFields<MutationDeleteUserArgs, 'userId'>>;
  updateOwner?: Resolver<ResolversTypes['OwnerPayload'], ParentType, ContextType, RequireFields<MutationUpdateOwnerArgs, 'id' | 'input'>>;
}>;

export type OwnerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Owner'] = ResolversParentTypes['Owner']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type OwnerPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['OwnerPayload'] = ResolversParentTypes['OwnerPayload']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  organizationFormFields?: Resolver<Array<ResolversTypes['UserFormField']>, ParentType, ContextType, RequireFields<QueryOrganizationFormFieldsArgs, 'organizationId'>>;
  owner?: Resolver<Maybe<ResolversTypes['Owner']>, ParentType, ContextType, RequireFields<QueryOwnerArgs, 'id'>>;
  owners?: Resolver<Array<ResolversTypes['Owner']>, ParentType, ContextType>;
  searchUsers?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QuerySearchUsersArgs, 'searchText'>>;
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUsersArgs, 'filter'>>;
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  properties?: Resolver<Array<ResolversTypes['UserFormFieldValue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFormFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserFormField'] = ResolversParentTypes['UserFormField']> = ResolversObject<{
  fieldName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['FieldType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserFormFieldValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserFormFieldValue'] = ResolversParentTypes['UserFormFieldValue']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userFormFieldId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  CreateUserFormFieldPayload?: CreateUserFormFieldPayloadResolvers<ContextType>;
  DeleteUserPayload?: DeleteUserPayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Owner?: OwnerResolvers<ContextType>;
  OwnerPayload?: OwnerPayloadResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserFormField?: UserFormFieldResolvers<ContextType>;
  UserFormFieldValue?: UserFormFieldValueResolvers<ContextType>;
}>;

