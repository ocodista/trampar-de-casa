
/**
 * Client
**/

import * as runtime from './runtime/library';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions

export type PrismaPromise<T> = $Public.PrismaPromise<T>


export type SubscribersPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Subscribers"
  objects: {
    sentRoles: SentRolesPayload<ExtArgs>[]
    subscriberTopics: SubscriberTopicsPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    email: string
    name: string | null
    linkedInUrl: string | null
    gitHub: string | null
    startedWorkingAt: Date | null
    skills: Prisma.JsonValue | null
    englishLevel: EnglishLevel | null
    isConfirmed: boolean
    createdAt: Date
    updatedAt: Date | null
    optOut: boolean
  }, ExtArgs["result"]["subscribers"]>
  composites: {}
}

/**
 * Model Subscribers
 * 
 */
export type Subscribers = runtime.Types.DefaultSelection<SubscribersPayload>
export type RolesPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Roles"
  objects: {
    company: CompaniesPayload<ExtArgs>
    sentRoles: SentRolesPayload<ExtArgs> | null
  }
  scalars: $Extensions.GetResult<{
    id: string
    companyId: string
    title: string
    description: string
    country: string
    language: string
    currency: string | null
    salary: string | null
    skills: Prisma.JsonValue | null
    createdAt: Date
    updatedAt: Date
    sentRolesId: string | null
    ready: boolean
    url: string | null
  }, ExtArgs["result"]["roles"]>
  composites: {}
}

/**
 * Model Roles
 * 
 */
export type Roles = runtime.Types.DefaultSelection<RolesPayload>
export type SentRolesPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "SentRoles"
  objects: {
    role: RolesPayload<ExtArgs> | null
    subscribers: SubscribersPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    sentAt: Date | null
    roleId: string
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["sentRoles"]>
  composites: {}
}

/**
 * Model SentRoles
 * 
 */
export type SentRoles = runtime.Types.DefaultSelection<SentRolesPayload>
export type SubscriberTopicsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "SubscriberTopics"
  objects: {
    subscriber: SubscribersPayload<ExtArgs>
    topic: TopicsPayload<ExtArgs>
  }
  scalars: $Extensions.GetResult<{
    id: number
    subscriberId: string
    topicId: number
  }, ExtArgs["result"]["subscriberTopics"]>
  composites: {}
}

/**
 * Model SubscriberTopics
 * 
 */
export type SubscriberTopics = runtime.Types.DefaultSelection<SubscriberTopicsPayload>
export type TopicsPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Topics"
  objects: {
    subscribers: SubscriberTopicsPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: number
    name: string
  }, ExtArgs["result"]["topics"]>
  composites: {}
}

/**
 * Model Topics
 * 
 */
export type Topics = runtime.Types.DefaultSelection<TopicsPayload>
export type CompaniesPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  name: "Companies"
  objects: {
    roles: RolesPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    name: string
    url: string
    logoUrl: string | null
    countryIcon: string
    createdAt: Date
    updatedAt: Date
  }, ExtArgs["result"]["companies"]>
  composites: {}
}

/**
 * Model Companies
 * 
 */
export type Companies = runtime.Types.DefaultSelection<CompaniesPayload>

/**
 * Enums
 */

export const EnglishLevel: {
  Beginner: 'Beginner',
  Intermediary: 'Intermediary',
  Advanced: 'Advanced',
  Fluent: 'Fluent'
};

export type EnglishLevel = (typeof EnglishLevel)[keyof typeof EnglishLevel]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Subscribers
 * const subscribers = await prisma.subscribers.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Subscribers
   * const subscribers = await prisma.subscribers.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => Promise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.subscribers`: Exposes CRUD operations for the **Subscribers** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Subscribers
    * const subscribers = await prisma.subscribers.findMany()
    * ```
    */
  get subscribers(): Prisma.SubscribersDelegate<ExtArgs>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **Roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.RolesDelegate<ExtArgs>;

  /**
   * `prisma.sentRoles`: Exposes CRUD operations for the **SentRoles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SentRoles
    * const sentRoles = await prisma.sentRoles.findMany()
    * ```
    */
  get sentRoles(): Prisma.SentRolesDelegate<ExtArgs>;

  /**
   * `prisma.subscriberTopics`: Exposes CRUD operations for the **SubscriberTopics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SubscriberTopics
    * const subscriberTopics = await prisma.subscriberTopics.findMany()
    * ```
    */
  get subscriberTopics(): Prisma.SubscriberTopicsDelegate<ExtArgs>;

  /**
   * `prisma.topics`: Exposes CRUD operations for the **Topics** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Topics
    * const topics = await prisma.topics.findMany()
    * ```
    */
  get topics(): Prisma.TopicsDelegate<ExtArgs>;

  /**
   * `prisma.companies`: Exposes CRUD operations for the **Companies** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.companies.findMany()
    * ```
    */
  get companies(): Prisma.CompaniesDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export type Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export type Args<T, F extends $Public.Operation> = $Public.Args<T, F>
  export type Payload<T, F extends $Public.Operation> = $Public.Payload<T, F>
  export type Result<T, A, F extends $Public.Operation> = $Public.Result<T, A, F>
  export type Exact<T, W> = $Public.Exact<T, W>

  /**
   * Prisma Client JS version: 5.0.0
   * Query Engine version: 6b0aef69b7cdfc787f822ecd7cdc76d5f1991584
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Subscribers: 'Subscribers',
    Roles: 'Roles',
    SentRoles: 'SentRoles',
    SubscriberTopics: 'SubscriberTopics',
    Topics: 'Topics',
    Companies: 'Companies'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.Args}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'subscribers' | 'roles' | 'sentRoles' | 'subscriberTopics' | 'topics' | 'companies'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Subscribers: {
        payload: SubscribersPayload<ExtArgs>
        fields: Prisma.SubscribersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscribersFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscribersFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
          }
          findFirst: {
            args: Prisma.SubscribersFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscribersFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
          }
          findMany: {
            args: Prisma.SubscribersFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>[]
          }
          create: {
            args: Prisma.SubscribersCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
          }
          createMany: {
            args: Prisma.SubscribersCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SubscribersDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
          }
          update: {
            args: Prisma.SubscribersUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
          }
          deleteMany: {
            args: Prisma.SubscribersDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SubscribersUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SubscribersUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
          }
          aggregate: {
            args: Prisma.SubscribersAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSubscribers>
          }
          groupBy: {
            args: Prisma.SubscribersGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SubscribersGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscribersCountArgs<ExtArgs>,
            result: $Utils.Optional<SubscribersCountAggregateOutputType> | number
          }
        }
      }
      Roles: {
        payload: RolesPayload<ExtArgs>
        fields: Prisma.RolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RolesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RolesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
          }
          findFirst: {
            args: Prisma.RolesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RolesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
          }
          findMany: {
            args: Prisma.RolesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>[]
          }
          create: {
            args: Prisma.RolesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
          }
          createMany: {
            args: Prisma.RolesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RolesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
          }
          update: {
            args: Prisma.RolesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
          }
          deleteMany: {
            args: Prisma.RolesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RolesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RolesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
          }
          aggregate: {
            args: Prisma.RolesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRoles>
          }
          groupBy: {
            args: Prisma.RolesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.RolesCountArgs<ExtArgs>,
            result: $Utils.Optional<RolesCountAggregateOutputType> | number
          }
        }
      }
      SentRoles: {
        payload: SentRolesPayload<ExtArgs>
        fields: Prisma.SentRolesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SentRolesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SentRolesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
          }
          findFirst: {
            args: Prisma.SentRolesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SentRolesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
          }
          findMany: {
            args: Prisma.SentRolesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>[]
          }
          create: {
            args: Prisma.SentRolesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
          }
          createMany: {
            args: Prisma.SentRolesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SentRolesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
          }
          update: {
            args: Prisma.SentRolesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
          }
          deleteMany: {
            args: Prisma.SentRolesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SentRolesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SentRolesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
          }
          aggregate: {
            args: Prisma.SentRolesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSentRoles>
          }
          groupBy: {
            args: Prisma.SentRolesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SentRolesGroupByOutputType>[]
          }
          count: {
            args: Prisma.SentRolesCountArgs<ExtArgs>,
            result: $Utils.Optional<SentRolesCountAggregateOutputType> | number
          }
        }
      }
      SubscriberTopics: {
        payload: SubscriberTopicsPayload<ExtArgs>
        fields: Prisma.SubscriberTopicsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SubscriberTopicsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SubscriberTopicsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload>
          }
          findFirst: {
            args: Prisma.SubscriberTopicsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SubscriberTopicsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload>
          }
          findMany: {
            args: Prisma.SubscriberTopicsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload>[]
          }
          create: {
            args: Prisma.SubscriberTopicsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload>
          }
          createMany: {
            args: Prisma.SubscriberTopicsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.SubscriberTopicsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload>
          }
          update: {
            args: Prisma.SubscriberTopicsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload>
          }
          deleteMany: {
            args: Prisma.SubscriberTopicsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.SubscriberTopicsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.SubscriberTopicsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscriberTopicsPayload>
          }
          aggregate: {
            args: Prisma.SubscriberTopicsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSubscriberTopics>
          }
          groupBy: {
            args: Prisma.SubscriberTopicsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SubscriberTopicsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SubscriberTopicsCountArgs<ExtArgs>,
            result: $Utils.Optional<SubscriberTopicsCountAggregateOutputType> | number
          }
        }
      }
      Topics: {
        payload: TopicsPayload<ExtArgs>
        fields: Prisma.TopicsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TopicsFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TopicsFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload>
          }
          findFirst: {
            args: Prisma.TopicsFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TopicsFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload>
          }
          findMany: {
            args: Prisma.TopicsFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload>[]
          }
          create: {
            args: Prisma.TopicsCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload>
          }
          createMany: {
            args: Prisma.TopicsCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.TopicsDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload>
          }
          update: {
            args: Prisma.TopicsUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload>
          }
          deleteMany: {
            args: Prisma.TopicsDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.TopicsUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.TopicsUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<TopicsPayload>
          }
          aggregate: {
            args: Prisma.TopicsAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateTopics>
          }
          groupBy: {
            args: Prisma.TopicsGroupByArgs<ExtArgs>,
            result: $Utils.Optional<TopicsGroupByOutputType>[]
          }
          count: {
            args: Prisma.TopicsCountArgs<ExtArgs>,
            result: $Utils.Optional<TopicsCountAggregateOutputType> | number
          }
        }
      }
      Companies: {
        payload: CompaniesPayload<ExtArgs>
        fields: Prisma.CompaniesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CompaniesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CompaniesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
          }
          findFirst: {
            args: Prisma.CompaniesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CompaniesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
          }
          findMany: {
            args: Prisma.CompaniesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>[]
          }
          create: {
            args: Prisma.CompaniesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
          }
          createMany: {
            args: Prisma.CompaniesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.CompaniesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
          }
          update: {
            args: Prisma.CompaniesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
          }
          deleteMany: {
            args: Prisma.CompaniesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.CompaniesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.CompaniesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
          }
          aggregate: {
            args: Prisma.CompaniesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCompanies>
          }
          groupBy: {
            args: Prisma.CompaniesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CompaniesGroupByOutputType>[]
          }
          count: {
            args: Prisma.CompaniesCountArgs<ExtArgs>,
            result: $Utils.Optional<CompaniesCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SubscribersCountOutputType
   */


  export type SubscribersCountOutputType = {
    sentRoles: number
    subscriberTopics: number
  }

  export type SubscribersCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    sentRoles?: boolean | SubscribersCountOutputTypeCountSentRolesArgs
    subscriberTopics?: boolean | SubscribersCountOutputTypeCountSubscriberTopicsArgs
  }

  // Custom InputTypes

  /**
   * SubscribersCountOutputType without action
   */
  export type SubscribersCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscribersCountOutputType
     */
    select?: SubscribersCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * SubscribersCountOutputType without action
   */
  export type SubscribersCountOutputTypeCountSentRolesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SentRolesWhereInput
  }


  /**
   * SubscribersCountOutputType without action
   */
  export type SubscribersCountOutputTypeCountSubscriberTopicsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SubscriberTopicsWhereInput
  }



  /**
   * Count Type SentRolesCountOutputType
   */


  export type SentRolesCountOutputType = {
    subscribers: number
  }

  export type SentRolesCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    subscribers?: boolean | SentRolesCountOutputTypeCountSubscribersArgs
  }

  // Custom InputTypes

  /**
   * SentRolesCountOutputType without action
   */
  export type SentRolesCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRolesCountOutputType
     */
    select?: SentRolesCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * SentRolesCountOutputType without action
   */
  export type SentRolesCountOutputTypeCountSubscribersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SubscribersWhereInput
  }



  /**
   * Count Type TopicsCountOutputType
   */


  export type TopicsCountOutputType = {
    subscribers: number
  }

  export type TopicsCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    subscribers?: boolean | TopicsCountOutputTypeCountSubscribersArgs
  }

  // Custom InputTypes

  /**
   * TopicsCountOutputType without action
   */
  export type TopicsCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TopicsCountOutputType
     */
    select?: TopicsCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * TopicsCountOutputType without action
   */
  export type TopicsCountOutputTypeCountSubscribersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SubscriberTopicsWhereInput
  }



  /**
   * Count Type CompaniesCountOutputType
   */


  export type CompaniesCountOutputType = {
    roles: number
  }

  export type CompaniesCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    roles?: boolean | CompaniesCountOutputTypeCountRolesArgs
  }

  // Custom InputTypes

  /**
   * CompaniesCountOutputType without action
   */
  export type CompaniesCountOutputTypeArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CompaniesCountOutputType
     */
    select?: CompaniesCountOutputTypeSelect<ExtArgs> | null
  }


  /**
   * CompaniesCountOutputType without action
   */
  export type CompaniesCountOutputTypeCountRolesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RolesWhereInput
  }



  /**
   * Models
   */

  /**
   * Model Subscribers
   */


  export type AggregateSubscribers = {
    _count: SubscribersCountAggregateOutputType | null
    _min: SubscribersMinAggregateOutputType | null
    _max: SubscribersMaxAggregateOutputType | null
  }

  export type SubscribersMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    linkedInUrl: string | null
    gitHub: string | null
    startedWorkingAt: Date | null
    englishLevel: EnglishLevel | null
    isConfirmed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    optOut: boolean | null
  }

  export type SubscribersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    linkedInUrl: string | null
    gitHub: string | null
    startedWorkingAt: Date | null
    englishLevel: EnglishLevel | null
    isConfirmed: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    optOut: boolean | null
  }

  export type SubscribersCountAggregateOutputType = {
    id: number
    email: number
    name: number
    linkedInUrl: number
    gitHub: number
    startedWorkingAt: number
    skills: number
    englishLevel: number
    isConfirmed: number
    createdAt: number
    updatedAt: number
    optOut: number
    _all: number
  }


  export type SubscribersMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    linkedInUrl?: true
    gitHub?: true
    startedWorkingAt?: true
    englishLevel?: true
    isConfirmed?: true
    createdAt?: true
    updatedAt?: true
    optOut?: true
  }

  export type SubscribersMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    linkedInUrl?: true
    gitHub?: true
    startedWorkingAt?: true
    englishLevel?: true
    isConfirmed?: true
    createdAt?: true
    updatedAt?: true
    optOut?: true
  }

  export type SubscribersCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    linkedInUrl?: true
    gitHub?: true
    startedWorkingAt?: true
    skills?: true
    englishLevel?: true
    isConfirmed?: true
    createdAt?: true
    updatedAt?: true
    optOut?: true
    _all?: true
  }

  export type SubscribersAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscribers to aggregate.
     */
    where?: SubscribersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscribersOrderByWithRelationInput | SubscribersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscribersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Subscribers
    **/
    _count?: true | SubscribersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscribersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscribersMaxAggregateInputType
  }

  export type GetSubscribersAggregateType<T extends SubscribersAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscribers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscribers[P]>
      : GetScalarType<T[P], AggregateSubscribers[P]>
  }




  export type SubscribersGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SubscribersWhereInput
    orderBy?: SubscribersOrderByWithAggregationInput | SubscribersOrderByWithAggregationInput[]
    by: SubscribersScalarFieldEnum[] | SubscribersScalarFieldEnum
    having?: SubscribersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscribersCountAggregateInputType | true
    _min?: SubscribersMinAggregateInputType
    _max?: SubscribersMaxAggregateInputType
  }


  export type SubscribersGroupByOutputType = {
    id: string
    email: string
    name: string | null
    linkedInUrl: string | null
    gitHub: string | null
    startedWorkingAt: Date | null
    skills: JsonValue | null
    englishLevel: EnglishLevel | null
    isConfirmed: boolean
    createdAt: Date
    updatedAt: Date | null
    optOut: boolean
    _count: SubscribersCountAggregateOutputType | null
    _min: SubscribersMinAggregateOutputType | null
    _max: SubscribersMaxAggregateOutputType | null
  }

  type GetSubscribersGroupByPayload<T extends SubscribersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscribersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscribersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscribersGroupByOutputType[P]>
            : GetScalarType<T[P], SubscribersGroupByOutputType[P]>
        }
      >
    >


  export type SubscribersSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    linkedInUrl?: boolean
    gitHub?: boolean
    startedWorkingAt?: boolean
    skills?: boolean
    englishLevel?: boolean
    isConfirmed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    optOut?: boolean
    sentRoles?: boolean | Subscribers$sentRolesArgs<ExtArgs>
    subscriberTopics?: boolean | Subscribers$subscriberTopicsArgs<ExtArgs>
    _count?: boolean | SubscribersCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["subscribers"]>

  export type SubscribersSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    linkedInUrl?: boolean
    gitHub?: boolean
    startedWorkingAt?: boolean
    skills?: boolean
    englishLevel?: boolean
    isConfirmed?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    optOut?: boolean
  }

  export type SubscribersInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    sentRoles?: boolean | Subscribers$sentRolesArgs<ExtArgs>
    subscriberTopics?: boolean | Subscribers$subscriberTopicsArgs<ExtArgs>
    _count?: boolean | SubscribersCountOutputTypeArgs<ExtArgs>
  }


  type SubscribersGetPayload<S extends boolean | null | undefined | SubscribersArgs> = $Types.GetResult<SubscribersPayload, S>

  type SubscribersCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<SubscribersFindManyArgs, 'select' | 'include'> & {
      select?: SubscribersCountAggregateInputType | true
    }

  export interface SubscribersDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Subscribers'], meta: { name: 'Subscribers' } }
    /**
     * Find zero or one Subscribers that matches the filter.
     * @param {SubscribersFindUniqueArgs} args - Arguments to find a Subscribers
     * @example
     * // Get one Subscribers
     * const subscribers = await prisma.subscribers.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SubscribersFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SubscribersFindUniqueArgs<ExtArgs>>
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Subscribers that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SubscribersFindUniqueOrThrowArgs} args - Arguments to find a Subscribers
     * @example
     * // Get one Subscribers
     * const subscribers = await prisma.subscribers.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SubscribersFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscribersFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Subscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribersFindFirstArgs} args - Arguments to find a Subscribers
     * @example
     * // Get one Subscribers
     * const subscribers = await prisma.subscribers.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SubscribersFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscribersFindFirstArgs<ExtArgs>>
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Subscribers that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribersFindFirstOrThrowArgs} args - Arguments to find a Subscribers
     * @example
     * // Get one Subscribers
     * const subscribers = await prisma.subscribers.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SubscribersFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscribersFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Subscribers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Subscribers
     * const subscribers = await prisma.subscribers.findMany()
     * 
     * // Get first 10 Subscribers
     * const subscribers = await prisma.subscribers.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscribersWithIdOnly = await prisma.subscribers.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SubscribersFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscribersFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Subscribers.
     * @param {SubscribersCreateArgs} args - Arguments to create a Subscribers.
     * @example
     * // Create one Subscribers
     * const Subscribers = await prisma.subscribers.create({
     *   data: {
     *     // ... data to create a Subscribers
     *   }
     * })
     * 
    **/
    create<T extends SubscribersCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SubscribersCreateArgs<ExtArgs>>
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Subscribers.
     *     @param {SubscribersCreateManyArgs} args - Arguments to create many Subscribers.
     *     @example
     *     // Create many Subscribers
     *     const subscribers = await prisma.subscribers.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SubscribersCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscribersCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Subscribers.
     * @param {SubscribersDeleteArgs} args - Arguments to delete one Subscribers.
     * @example
     * // Delete one Subscribers
     * const Subscribers = await prisma.subscribers.delete({
     *   where: {
     *     // ... filter to delete one Subscribers
     *   }
     * })
     * 
    **/
    delete<T extends SubscribersDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SubscribersDeleteArgs<ExtArgs>>
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Subscribers.
     * @param {SubscribersUpdateArgs} args - Arguments to update one Subscribers.
     * @example
     * // Update one Subscribers
     * const subscribers = await prisma.subscribers.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SubscribersUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SubscribersUpdateArgs<ExtArgs>>
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Subscribers.
     * @param {SubscribersDeleteManyArgs} args - Arguments to filter Subscribers to delete.
     * @example
     * // Delete a few Subscribers
     * const { count } = await prisma.subscribers.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SubscribersDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscribersDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Subscribers
     * const subscribers = await prisma.subscribers.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SubscribersUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SubscribersUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Subscribers.
     * @param {SubscribersUpsertArgs} args - Arguments to update or create a Subscribers.
     * @example
     * // Update or create a Subscribers
     * const subscribers = await prisma.subscribers.upsert({
     *   create: {
     *     // ... data to create a Subscribers
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Subscribers we want to update
     *   }
     * })
    **/
    upsert<T extends SubscribersUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SubscribersUpsertArgs<ExtArgs>>
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribersCountArgs} args - Arguments to filter Subscribers to count.
     * @example
     * // Count the number of Subscribers
     * const count = await prisma.subscribers.count({
     *   where: {
     *     // ... the filter for the Subscribers we want to count
     *   }
     * })
    **/
    count<T extends SubscribersCountArgs>(
      args?: Subset<T, SubscribersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscribersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscribersAggregateArgs>(args: Subset<T, SubscribersAggregateArgs>): Prisma.PrismaPromise<GetSubscribersAggregateType<T>>

    /**
     * Group by Subscribers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscribersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscribersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscribersGroupByArgs['orderBy'] }
        : { orderBy?: SubscribersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscribersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscribersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Subscribers model
   */
  readonly fields: SubscribersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Subscribers.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SubscribersClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    sentRoles<T extends Subscribers$sentRolesArgs<ExtArgs> = {}>(args?: Subset<T, Subscribers$sentRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findMany'>| Null>;

    subscriberTopics<T extends Subscribers$subscriberTopicsArgs<ExtArgs> = {}>(args?: Subset<T, Subscribers$subscriberTopicsArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Subscribers model
   */ 
  interface SubscribersFieldRefs {
    readonly id: FieldRef<"Subscribers", 'String'>
    readonly email: FieldRef<"Subscribers", 'String'>
    readonly name: FieldRef<"Subscribers", 'String'>
    readonly linkedInUrl: FieldRef<"Subscribers", 'String'>
    readonly gitHub: FieldRef<"Subscribers", 'String'>
    readonly startedWorkingAt: FieldRef<"Subscribers", 'DateTime'>
    readonly skills: FieldRef<"Subscribers", 'Json'>
    readonly englishLevel: FieldRef<"Subscribers", 'EnglishLevel'>
    readonly isConfirmed: FieldRef<"Subscribers", 'Boolean'>
    readonly createdAt: FieldRef<"Subscribers", 'DateTime'>
    readonly updatedAt: FieldRef<"Subscribers", 'DateTime'>
    readonly optOut: FieldRef<"Subscribers", 'Boolean'>
  }
    

  // Custom InputTypes

  /**
   * Subscribers findUnique
   */
  export type SubscribersFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * Filter, which Subscribers to fetch.
     */
    where: SubscribersWhereUniqueInput
  }


  /**
   * Subscribers findUniqueOrThrow
   */
  export type SubscribersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * Filter, which Subscribers to fetch.
     */
    where: SubscribersWhereUniqueInput
  }


  /**
   * Subscribers findFirst
   */
  export type SubscribersFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * Filter, which Subscribers to fetch.
     */
    where?: SubscribersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscribersOrderByWithRelationInput | SubscribersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscribers.
     */
    cursor?: SubscribersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscribers.
     */
    distinct?: SubscribersScalarFieldEnum | SubscribersScalarFieldEnum[]
  }


  /**
   * Subscribers findFirstOrThrow
   */
  export type SubscribersFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * Filter, which Subscribers to fetch.
     */
    where?: SubscribersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscribersOrderByWithRelationInput | SubscribersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Subscribers.
     */
    cursor?: SubscribersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Subscribers.
     */
    distinct?: SubscribersScalarFieldEnum | SubscribersScalarFieldEnum[]
  }


  /**
   * Subscribers findMany
   */
  export type SubscribersFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * Filter, which Subscribers to fetch.
     */
    where?: SubscribersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Subscribers to fetch.
     */
    orderBy?: SubscribersOrderByWithRelationInput | SubscribersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Subscribers.
     */
    cursor?: SubscribersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Subscribers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Subscribers.
     */
    skip?: number
    distinct?: SubscribersScalarFieldEnum | SubscribersScalarFieldEnum[]
  }


  /**
   * Subscribers create
   */
  export type SubscribersCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * The data needed to create a Subscribers.
     */
    data: XOR<SubscribersCreateInput, SubscribersUncheckedCreateInput>
  }


  /**
   * Subscribers createMany
   */
  export type SubscribersCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Subscribers.
     */
    data: SubscribersCreateManyInput | SubscribersCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Subscribers update
   */
  export type SubscribersUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * The data needed to update a Subscribers.
     */
    data: XOR<SubscribersUpdateInput, SubscribersUncheckedUpdateInput>
    /**
     * Choose, which Subscribers to update.
     */
    where: SubscribersWhereUniqueInput
  }


  /**
   * Subscribers updateMany
   */
  export type SubscribersUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Subscribers.
     */
    data: XOR<SubscribersUpdateManyMutationInput, SubscribersUncheckedUpdateManyInput>
    /**
     * Filter which Subscribers to update
     */
    where?: SubscribersWhereInput
  }


  /**
   * Subscribers upsert
   */
  export type SubscribersUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * The filter to search for the Subscribers to update in case it exists.
     */
    where: SubscribersWhereUniqueInput
    /**
     * In case the Subscribers found by the `where` argument doesn't exist, create a new Subscribers with this data.
     */
    create: XOR<SubscribersCreateInput, SubscribersUncheckedCreateInput>
    /**
     * In case the Subscribers was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscribersUpdateInput, SubscribersUncheckedUpdateInput>
  }


  /**
   * Subscribers delete
   */
  export type SubscribersDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    /**
     * Filter which Subscribers to delete.
     */
    where: SubscribersWhereUniqueInput
  }


  /**
   * Subscribers deleteMany
   */
  export type SubscribersDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Subscribers to delete
     */
    where?: SubscribersWhereInput
  }


  /**
   * Subscribers.sentRoles
   */
  export type Subscribers$sentRolesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    where?: SentRolesWhereInput
    orderBy?: SentRolesOrderByWithRelationInput | SentRolesOrderByWithRelationInput[]
    cursor?: SentRolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SentRolesScalarFieldEnum | SentRolesScalarFieldEnum[]
  }


  /**
   * Subscribers.subscriberTopics
   */
  export type Subscribers$subscriberTopicsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    where?: SubscriberTopicsWhereInput
    orderBy?: SubscriberTopicsOrderByWithRelationInput | SubscriberTopicsOrderByWithRelationInput[]
    cursor?: SubscriberTopicsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriberTopicsScalarFieldEnum | SubscriberTopicsScalarFieldEnum[]
  }


  /**
   * Subscribers without action
   */
  export type SubscribersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
  }



  /**
   * Model Roles
   */


  export type AggregateRoles = {
    _count: RolesCountAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  export type RolesMinAggregateOutputType = {
    id: string | null
    companyId: string | null
    title: string | null
    description: string | null
    country: string | null
    language: string | null
    currency: string | null
    salary: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sentRolesId: string | null
    ready: boolean | null
    url: string | null
  }

  export type RolesMaxAggregateOutputType = {
    id: string | null
    companyId: string | null
    title: string | null
    description: string | null
    country: string | null
    language: string | null
    currency: string | null
    salary: string | null
    createdAt: Date | null
    updatedAt: Date | null
    sentRolesId: string | null
    ready: boolean | null
    url: string | null
  }

  export type RolesCountAggregateOutputType = {
    id: number
    companyId: number
    title: number
    description: number
    country: number
    language: number
    currency: number
    salary: number
    skills: number
    createdAt: number
    updatedAt: number
    sentRolesId: number
    ready: number
    url: number
    _all: number
  }


  export type RolesMinAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    country?: true
    language?: true
    currency?: true
    salary?: true
    createdAt?: true
    updatedAt?: true
    sentRolesId?: true
    ready?: true
    url?: true
  }

  export type RolesMaxAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    country?: true
    language?: true
    currency?: true
    salary?: true
    createdAt?: true
    updatedAt?: true
    sentRolesId?: true
    ready?: true
    url?: true
  }

  export type RolesCountAggregateInputType = {
    id?: true
    companyId?: true
    title?: true
    description?: true
    country?: true
    language?: true
    currency?: true
    salary?: true
    skills?: true
    createdAt?: true
    updatedAt?: true
    sentRolesId?: true
    ready?: true
    url?: true
    _all?: true
  }

  export type RolesAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to aggregate.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Roles
    **/
    _count?: true | RolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RolesMaxAggregateInputType
  }

  export type GetRolesAggregateType<T extends RolesAggregateArgs> = {
        [P in keyof T & keyof AggregateRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoles[P]>
      : GetScalarType<T[P], AggregateRoles[P]>
  }




  export type RolesGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: RolesWhereInput
    orderBy?: RolesOrderByWithAggregationInput | RolesOrderByWithAggregationInput[]
    by: RolesScalarFieldEnum[] | RolesScalarFieldEnum
    having?: RolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RolesCountAggregateInputType | true
    _min?: RolesMinAggregateInputType
    _max?: RolesMaxAggregateInputType
  }


  export type RolesGroupByOutputType = {
    id: string
    companyId: string
    title: string
    description: string
    country: string
    language: string
    currency: string | null
    salary: string | null
    skills: JsonValue | null
    createdAt: Date
    updatedAt: Date
    sentRolesId: string | null
    ready: boolean
    url: string | null
    _count: RolesCountAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends RolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RolesGroupByOutputType[P]>
            : GetScalarType<T[P], RolesGroupByOutputType[P]>
        }
      >
    >


  export type RolesSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    companyId?: boolean
    title?: boolean
    description?: boolean
    country?: boolean
    language?: boolean
    currency?: boolean
    salary?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentRolesId?: boolean
    ready?: boolean
    url?: boolean
    company?: boolean | CompaniesArgs<ExtArgs>
    sentRoles?: boolean | Roles$sentRolesArgs<ExtArgs>
  }, ExtArgs["result"]["roles"]>

  export type RolesSelectScalar = {
    id?: boolean
    companyId?: boolean
    title?: boolean
    description?: boolean
    country?: boolean
    language?: boolean
    currency?: boolean
    salary?: boolean
    skills?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    sentRolesId?: boolean
    ready?: boolean
    url?: boolean
  }

  export type RolesInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    company?: boolean | CompaniesArgs<ExtArgs>
    sentRoles?: boolean | Roles$sentRolesArgs<ExtArgs>
  }


  type RolesGetPayload<S extends boolean | null | undefined | RolesArgs> = $Types.GetResult<RolesPayload, S>

  type RolesCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RolesFindManyArgs, 'select' | 'include'> & {
      select?: RolesCountAggregateInputType | true
    }

  export interface RolesDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Roles'], meta: { name: 'Roles' } }
    /**
     * Find zero or one Roles that matches the filter.
     * @param {RolesFindUniqueArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RolesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RolesFindUniqueArgs<ExtArgs>>
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Roles that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RolesFindUniqueOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RolesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RolesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindFirstArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RolesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RolesFindFirstArgs<ExtArgs>>
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Roles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindFirstOrThrowArgs} args - Arguments to find a Roles
     * @example
     * // Get one Roles
     * const roles = await prisma.roles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RolesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RolesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Roles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Roles
     * const roles = await prisma.roles.findMany()
     * 
     * // Get first 10 Roles
     * const roles = await prisma.roles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const rolesWithIdOnly = await prisma.roles.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RolesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Roles.
     * @param {RolesCreateArgs} args - Arguments to create a Roles.
     * @example
     * // Create one Roles
     * const Roles = await prisma.roles.create({
     *   data: {
     *     // ... data to create a Roles
     *   }
     * })
     * 
    **/
    create<T extends RolesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RolesCreateArgs<ExtArgs>>
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Roles.
     *     @param {RolesCreateManyArgs} args - Arguments to create many Roles.
     *     @example
     *     // Create many Roles
     *     const roles = await prisma.roles.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RolesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Roles.
     * @param {RolesDeleteArgs} args - Arguments to delete one Roles.
     * @example
     * // Delete one Roles
     * const Roles = await prisma.roles.delete({
     *   where: {
     *     // ... filter to delete one Roles
     *   }
     * })
     * 
    **/
    delete<T extends RolesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RolesDeleteArgs<ExtArgs>>
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Roles.
     * @param {RolesUpdateArgs} args - Arguments to update one Roles.
     * @example
     * // Update one Roles
     * const roles = await prisma.roles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RolesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RolesUpdateArgs<ExtArgs>>
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Roles.
     * @param {RolesDeleteManyArgs} args - Arguments to filter Roles to delete.
     * @example
     * // Delete a few Roles
     * const { count } = await prisma.roles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RolesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RolesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Roles
     * const roles = await prisma.roles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RolesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RolesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Roles.
     * @param {RolesUpsertArgs} args - Arguments to update or create a Roles.
     * @example
     * // Update or create a Roles
     * const roles = await prisma.roles.upsert({
     *   create: {
     *     // ... data to create a Roles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Roles we want to update
     *   }
     * })
    **/
    upsert<T extends RolesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RolesUpsertArgs<ExtArgs>>
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesCountArgs} args - Arguments to filter Roles to count.
     * @example
     * // Count the number of Roles
     * const count = await prisma.roles.count({
     *   where: {
     *     // ... the filter for the Roles we want to count
     *   }
     * })
    **/
    count<T extends RolesCountArgs>(
      args?: Subset<T, RolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RolesAggregateArgs>(args: Subset<T, RolesAggregateArgs>): Prisma.PrismaPromise<GetRolesAggregateType<T>>

    /**
     * Group by Roles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RolesGroupByArgs['orderBy'] }
        : { orderBy?: RolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Roles model
   */
  readonly fields: RolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Roles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__RolesClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    company<T extends CompaniesArgs<ExtArgs> = {}>(args?: Subset<T, CompaniesArgs<ExtArgs>>): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    sentRoles<T extends Roles$sentRolesArgs<ExtArgs> = {}>(args?: Subset<T, Roles$sentRolesArgs<ExtArgs>>): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Roles model
   */ 
  interface RolesFieldRefs {
    readonly id: FieldRef<"Roles", 'String'>
    readonly companyId: FieldRef<"Roles", 'String'>
    readonly title: FieldRef<"Roles", 'String'>
    readonly description: FieldRef<"Roles", 'String'>
    readonly country: FieldRef<"Roles", 'String'>
    readonly language: FieldRef<"Roles", 'String'>
    readonly currency: FieldRef<"Roles", 'String'>
    readonly salary: FieldRef<"Roles", 'String'>
    readonly skills: FieldRef<"Roles", 'Json'>
    readonly createdAt: FieldRef<"Roles", 'DateTime'>
    readonly updatedAt: FieldRef<"Roles", 'DateTime'>
    readonly sentRolesId: FieldRef<"Roles", 'String'>
    readonly ready: FieldRef<"Roles", 'Boolean'>
    readonly url: FieldRef<"Roles", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Roles findUnique
   */
  export type RolesFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where: RolesWhereUniqueInput
  }


  /**
   * Roles findUniqueOrThrow
   */
  export type RolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where: RolesWhereUniqueInput
  }


  /**
   * Roles findFirst
   */
  export type RolesFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }


  /**
   * Roles findFirstOrThrow
   */
  export type RolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Roles.
     */
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }


  /**
   * Roles findMany
   */
  export type RolesFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter, which Roles to fetch.
     */
    where?: RolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Roles to fetch.
     */
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Roles.
     */
    cursor?: RolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Roles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Roles.
     */
    skip?: number
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }


  /**
   * Roles create
   */
  export type RolesCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The data needed to create a Roles.
     */
    data: XOR<RolesCreateInput, RolesUncheckedCreateInput>
  }


  /**
   * Roles createMany
   */
  export type RolesCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Roles.
     */
    data: RolesCreateManyInput | RolesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Roles update
   */
  export type RolesUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The data needed to update a Roles.
     */
    data: XOR<RolesUpdateInput, RolesUncheckedUpdateInput>
    /**
     * Choose, which Roles to update.
     */
    where: RolesWhereUniqueInput
  }


  /**
   * Roles updateMany
   */
  export type RolesUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Roles.
     */
    data: XOR<RolesUpdateManyMutationInput, RolesUncheckedUpdateManyInput>
    /**
     * Filter which Roles to update
     */
    where?: RolesWhereInput
  }


  /**
   * Roles upsert
   */
  export type RolesUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * The filter to search for the Roles to update in case it exists.
     */
    where: RolesWhereUniqueInput
    /**
     * In case the Roles found by the `where` argument doesn't exist, create a new Roles with this data.
     */
    create: XOR<RolesCreateInput, RolesUncheckedCreateInput>
    /**
     * In case the Roles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RolesUpdateInput, RolesUncheckedUpdateInput>
  }


  /**
   * Roles delete
   */
  export type RolesDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    /**
     * Filter which Roles to delete.
     */
    where: RolesWhereUniqueInput
  }


  /**
   * Roles deleteMany
   */
  export type RolesDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Roles to delete
     */
    where?: RolesWhereInput
  }


  /**
   * Roles.sentRoles
   */
  export type Roles$sentRolesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    where?: SentRolesWhereInput
  }


  /**
   * Roles without action
   */
  export type RolesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
  }



  /**
   * Model SentRoles
   */


  export type AggregateSentRoles = {
    _count: SentRolesCountAggregateOutputType | null
    _min: SentRolesMinAggregateOutputType | null
    _max: SentRolesMaxAggregateOutputType | null
  }

  export type SentRolesMinAggregateOutputType = {
    id: string | null
    sentAt: Date | null
    roleId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SentRolesMaxAggregateOutputType = {
    id: string | null
    sentAt: Date | null
    roleId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SentRolesCountAggregateOutputType = {
    id: number
    sentAt: number
    roleId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SentRolesMinAggregateInputType = {
    id?: true
    sentAt?: true
    roleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SentRolesMaxAggregateInputType = {
    id?: true
    sentAt?: true
    roleId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SentRolesCountAggregateInputType = {
    id?: true
    sentAt?: true
    roleId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SentRolesAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which SentRoles to aggregate.
     */
    where?: SentRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SentRoles to fetch.
     */
    orderBy?: SentRolesOrderByWithRelationInput | SentRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SentRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SentRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SentRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SentRoles
    **/
    _count?: true | SentRolesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SentRolesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SentRolesMaxAggregateInputType
  }

  export type GetSentRolesAggregateType<T extends SentRolesAggregateArgs> = {
        [P in keyof T & keyof AggregateSentRoles]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSentRoles[P]>
      : GetScalarType<T[P], AggregateSentRoles[P]>
  }




  export type SentRolesGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SentRolesWhereInput
    orderBy?: SentRolesOrderByWithAggregationInput | SentRolesOrderByWithAggregationInput[]
    by: SentRolesScalarFieldEnum[] | SentRolesScalarFieldEnum
    having?: SentRolesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SentRolesCountAggregateInputType | true
    _min?: SentRolesMinAggregateInputType
    _max?: SentRolesMaxAggregateInputType
  }


  export type SentRolesGroupByOutputType = {
    id: string
    sentAt: Date | null
    roleId: string
    createdAt: Date
    updatedAt: Date
    _count: SentRolesCountAggregateOutputType | null
    _min: SentRolesMinAggregateOutputType | null
    _max: SentRolesMaxAggregateOutputType | null
  }

  type GetSentRolesGroupByPayload<T extends SentRolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SentRolesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SentRolesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SentRolesGroupByOutputType[P]>
            : GetScalarType<T[P], SentRolesGroupByOutputType[P]>
        }
      >
    >


  export type SentRolesSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sentAt?: boolean
    roleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    role?: boolean | SentRoles$roleArgs<ExtArgs>
    subscribers?: boolean | SentRoles$subscribersArgs<ExtArgs>
    _count?: boolean | SentRolesCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["sentRoles"]>

  export type SentRolesSelectScalar = {
    id?: boolean
    sentAt?: boolean
    roleId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SentRolesInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    role?: boolean | SentRoles$roleArgs<ExtArgs>
    subscribers?: boolean | SentRoles$subscribersArgs<ExtArgs>
    _count?: boolean | SentRolesCountOutputTypeArgs<ExtArgs>
  }


  type SentRolesGetPayload<S extends boolean | null | undefined | SentRolesArgs> = $Types.GetResult<SentRolesPayload, S>

  type SentRolesCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<SentRolesFindManyArgs, 'select' | 'include'> & {
      select?: SentRolesCountAggregateInputType | true
    }

  export interface SentRolesDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SentRoles'], meta: { name: 'SentRoles' } }
    /**
     * Find zero or one SentRoles that matches the filter.
     * @param {SentRolesFindUniqueArgs} args - Arguments to find a SentRoles
     * @example
     * // Get one SentRoles
     * const sentRoles = await prisma.sentRoles.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SentRolesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SentRolesFindUniqueArgs<ExtArgs>>
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SentRoles that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SentRolesFindUniqueOrThrowArgs} args - Arguments to find a SentRoles
     * @example
     * // Get one SentRoles
     * const sentRoles = await prisma.sentRoles.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SentRolesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SentRolesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SentRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentRolesFindFirstArgs} args - Arguments to find a SentRoles
     * @example
     * // Get one SentRoles
     * const sentRoles = await prisma.sentRoles.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SentRolesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SentRolesFindFirstArgs<ExtArgs>>
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SentRoles that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentRolesFindFirstOrThrowArgs} args - Arguments to find a SentRoles
     * @example
     * // Get one SentRoles
     * const sentRoles = await prisma.sentRoles.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SentRolesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SentRolesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SentRoles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentRolesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SentRoles
     * const sentRoles = await prisma.sentRoles.findMany()
     * 
     * // Get first 10 SentRoles
     * const sentRoles = await prisma.sentRoles.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sentRolesWithIdOnly = await prisma.sentRoles.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SentRolesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SentRolesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SentRoles.
     * @param {SentRolesCreateArgs} args - Arguments to create a SentRoles.
     * @example
     * // Create one SentRoles
     * const SentRoles = await prisma.sentRoles.create({
     *   data: {
     *     // ... data to create a SentRoles
     *   }
     * })
     * 
    **/
    create<T extends SentRolesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SentRolesCreateArgs<ExtArgs>>
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many SentRoles.
     *     @param {SentRolesCreateManyArgs} args - Arguments to create many SentRoles.
     *     @example
     *     // Create many SentRoles
     *     const sentRoles = await prisma.sentRoles.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SentRolesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SentRolesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SentRoles.
     * @param {SentRolesDeleteArgs} args - Arguments to delete one SentRoles.
     * @example
     * // Delete one SentRoles
     * const SentRoles = await prisma.sentRoles.delete({
     *   where: {
     *     // ... filter to delete one SentRoles
     *   }
     * })
     * 
    **/
    delete<T extends SentRolesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SentRolesDeleteArgs<ExtArgs>>
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SentRoles.
     * @param {SentRolesUpdateArgs} args - Arguments to update one SentRoles.
     * @example
     * // Update one SentRoles
     * const sentRoles = await prisma.sentRoles.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SentRolesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SentRolesUpdateArgs<ExtArgs>>
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SentRoles.
     * @param {SentRolesDeleteManyArgs} args - Arguments to filter SentRoles to delete.
     * @example
     * // Delete a few SentRoles
     * const { count } = await prisma.sentRoles.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SentRolesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SentRolesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SentRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentRolesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SentRoles
     * const sentRoles = await prisma.sentRoles.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SentRolesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SentRolesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SentRoles.
     * @param {SentRolesUpsertArgs} args - Arguments to update or create a SentRoles.
     * @example
     * // Update or create a SentRoles
     * const sentRoles = await prisma.sentRoles.upsert({
     *   create: {
     *     // ... data to create a SentRoles
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SentRoles we want to update
     *   }
     * })
    **/
    upsert<T extends SentRolesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SentRolesUpsertArgs<ExtArgs>>
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SentRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentRolesCountArgs} args - Arguments to filter SentRoles to count.
     * @example
     * // Count the number of SentRoles
     * const count = await prisma.sentRoles.count({
     *   where: {
     *     // ... the filter for the SentRoles we want to count
     *   }
     * })
    **/
    count<T extends SentRolesCountArgs>(
      args?: Subset<T, SentRolesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SentRolesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SentRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentRolesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SentRolesAggregateArgs>(args: Subset<T, SentRolesAggregateArgs>): Prisma.PrismaPromise<GetSentRolesAggregateType<T>>

    /**
     * Group by SentRoles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SentRolesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SentRolesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SentRolesGroupByArgs['orderBy'] }
        : { orderBy?: SentRolesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SentRolesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSentRolesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SentRoles model
   */
  readonly fields: SentRolesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SentRoles.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SentRolesClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    role<T extends SentRoles$roleArgs<ExtArgs> = {}>(args?: Subset<T, SentRoles$roleArgs<ExtArgs>>): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    subscribers<T extends SentRoles$subscribersArgs<ExtArgs> = {}>(args?: Subset<T, SentRoles$subscribersArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the SentRoles model
   */ 
  interface SentRolesFieldRefs {
    readonly id: FieldRef<"SentRoles", 'String'>
    readonly sentAt: FieldRef<"SentRoles", 'DateTime'>
    readonly roleId: FieldRef<"SentRoles", 'String'>
    readonly createdAt: FieldRef<"SentRoles", 'DateTime'>
    readonly updatedAt: FieldRef<"SentRoles", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * SentRoles findUnique
   */
  export type SentRolesFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * Filter, which SentRoles to fetch.
     */
    where: SentRolesWhereUniqueInput
  }


  /**
   * SentRoles findUniqueOrThrow
   */
  export type SentRolesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * Filter, which SentRoles to fetch.
     */
    where: SentRolesWhereUniqueInput
  }


  /**
   * SentRoles findFirst
   */
  export type SentRolesFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * Filter, which SentRoles to fetch.
     */
    where?: SentRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SentRoles to fetch.
     */
    orderBy?: SentRolesOrderByWithRelationInput | SentRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SentRoles.
     */
    cursor?: SentRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SentRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SentRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SentRoles.
     */
    distinct?: SentRolesScalarFieldEnum | SentRolesScalarFieldEnum[]
  }


  /**
   * SentRoles findFirstOrThrow
   */
  export type SentRolesFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * Filter, which SentRoles to fetch.
     */
    where?: SentRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SentRoles to fetch.
     */
    orderBy?: SentRolesOrderByWithRelationInput | SentRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SentRoles.
     */
    cursor?: SentRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SentRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SentRoles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SentRoles.
     */
    distinct?: SentRolesScalarFieldEnum | SentRolesScalarFieldEnum[]
  }


  /**
   * SentRoles findMany
   */
  export type SentRolesFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * Filter, which SentRoles to fetch.
     */
    where?: SentRolesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SentRoles to fetch.
     */
    orderBy?: SentRolesOrderByWithRelationInput | SentRolesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SentRoles.
     */
    cursor?: SentRolesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SentRoles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SentRoles.
     */
    skip?: number
    distinct?: SentRolesScalarFieldEnum | SentRolesScalarFieldEnum[]
  }


  /**
   * SentRoles create
   */
  export type SentRolesCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * The data needed to create a SentRoles.
     */
    data: XOR<SentRolesCreateInput, SentRolesUncheckedCreateInput>
  }


  /**
   * SentRoles createMany
   */
  export type SentRolesCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SentRoles.
     */
    data: SentRolesCreateManyInput | SentRolesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * SentRoles update
   */
  export type SentRolesUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * The data needed to update a SentRoles.
     */
    data: XOR<SentRolesUpdateInput, SentRolesUncheckedUpdateInput>
    /**
     * Choose, which SentRoles to update.
     */
    where: SentRolesWhereUniqueInput
  }


  /**
   * SentRoles updateMany
   */
  export type SentRolesUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SentRoles.
     */
    data: XOR<SentRolesUpdateManyMutationInput, SentRolesUncheckedUpdateManyInput>
    /**
     * Filter which SentRoles to update
     */
    where?: SentRolesWhereInput
  }


  /**
   * SentRoles upsert
   */
  export type SentRolesUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * The filter to search for the SentRoles to update in case it exists.
     */
    where: SentRolesWhereUniqueInput
    /**
     * In case the SentRoles found by the `where` argument doesn't exist, create a new SentRoles with this data.
     */
    create: XOR<SentRolesCreateInput, SentRolesUncheckedCreateInput>
    /**
     * In case the SentRoles was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SentRolesUpdateInput, SentRolesUncheckedUpdateInput>
  }


  /**
   * SentRoles delete
   */
  export type SentRolesDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
    /**
     * Filter which SentRoles to delete.
     */
    where: SentRolesWhereUniqueInput
  }


  /**
   * SentRoles deleteMany
   */
  export type SentRolesDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which SentRoles to delete
     */
    where?: SentRolesWhereInput
  }


  /**
   * SentRoles.role
   */
  export type SentRoles$roleArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    where?: RolesWhereInput
  }


  /**
   * SentRoles.subscribers
   */
  export type SentRoles$subscribersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Subscribers
     */
    select?: SubscribersSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscribersInclude<ExtArgs> | null
    where?: SubscribersWhereInput
    orderBy?: SubscribersOrderByWithRelationInput | SubscribersOrderByWithRelationInput[]
    cursor?: SubscribersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscribersScalarFieldEnum | SubscribersScalarFieldEnum[]
  }


  /**
   * SentRoles without action
   */
  export type SentRolesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SentRoles
     */
    select?: SentRolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SentRolesInclude<ExtArgs> | null
  }



  /**
   * Model SubscriberTopics
   */


  export type AggregateSubscriberTopics = {
    _count: SubscriberTopicsCountAggregateOutputType | null
    _avg: SubscriberTopicsAvgAggregateOutputType | null
    _sum: SubscriberTopicsSumAggregateOutputType | null
    _min: SubscriberTopicsMinAggregateOutputType | null
    _max: SubscriberTopicsMaxAggregateOutputType | null
  }

  export type SubscriberTopicsAvgAggregateOutputType = {
    id: number | null
    topicId: number | null
  }

  export type SubscriberTopicsSumAggregateOutputType = {
    id: number | null
    topicId: number | null
  }

  export type SubscriberTopicsMinAggregateOutputType = {
    id: number | null
    subscriberId: string | null
    topicId: number | null
  }

  export type SubscriberTopicsMaxAggregateOutputType = {
    id: number | null
    subscriberId: string | null
    topicId: number | null
  }

  export type SubscriberTopicsCountAggregateOutputType = {
    id: number
    subscriberId: number
    topicId: number
    _all: number
  }


  export type SubscriberTopicsAvgAggregateInputType = {
    id?: true
    topicId?: true
  }

  export type SubscriberTopicsSumAggregateInputType = {
    id?: true
    topicId?: true
  }

  export type SubscriberTopicsMinAggregateInputType = {
    id?: true
    subscriberId?: true
    topicId?: true
  }

  export type SubscriberTopicsMaxAggregateInputType = {
    id?: true
    subscriberId?: true
    topicId?: true
  }

  export type SubscriberTopicsCountAggregateInputType = {
    id?: true
    subscriberId?: true
    topicId?: true
    _all?: true
  }

  export type SubscriberTopicsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriberTopics to aggregate.
     */
    where?: SubscriberTopicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriberTopics to fetch.
     */
    orderBy?: SubscriberTopicsOrderByWithRelationInput | SubscriberTopicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SubscriberTopicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriberTopics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriberTopics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SubscriberTopics
    **/
    _count?: true | SubscriberTopicsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SubscriberTopicsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscriberTopicsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SubscriberTopicsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SubscriberTopicsMaxAggregateInputType
  }

  export type GetSubscriberTopicsAggregateType<T extends SubscriberTopicsAggregateArgs> = {
        [P in keyof T & keyof AggregateSubscriberTopics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSubscriberTopics[P]>
      : GetScalarType<T[P], AggregateSubscriberTopics[P]>
  }




  export type SubscriberTopicsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: SubscriberTopicsWhereInput
    orderBy?: SubscriberTopicsOrderByWithAggregationInput | SubscriberTopicsOrderByWithAggregationInput[]
    by: SubscriberTopicsScalarFieldEnum[] | SubscriberTopicsScalarFieldEnum
    having?: SubscriberTopicsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscriberTopicsCountAggregateInputType | true
    _avg?: SubscriberTopicsAvgAggregateInputType
    _sum?: SubscriberTopicsSumAggregateInputType
    _min?: SubscriberTopicsMinAggregateInputType
    _max?: SubscriberTopicsMaxAggregateInputType
  }


  export type SubscriberTopicsGroupByOutputType = {
    id: number
    subscriberId: string
    topicId: number
    _count: SubscriberTopicsCountAggregateOutputType | null
    _avg: SubscriberTopicsAvgAggregateOutputType | null
    _sum: SubscriberTopicsSumAggregateOutputType | null
    _min: SubscriberTopicsMinAggregateOutputType | null
    _max: SubscriberTopicsMaxAggregateOutputType | null
  }

  type GetSubscriberTopicsGroupByPayload<T extends SubscriberTopicsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SubscriberTopicsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SubscriberTopicsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SubscriberTopicsGroupByOutputType[P]>
            : GetScalarType<T[P], SubscriberTopicsGroupByOutputType[P]>
        }
      >
    >


  export type SubscriberTopicsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    subscriberId?: boolean
    topicId?: boolean
    subscriber?: boolean | SubscribersArgs<ExtArgs>
    topic?: boolean | TopicsArgs<ExtArgs>
  }, ExtArgs["result"]["subscriberTopics"]>

  export type SubscriberTopicsSelectScalar = {
    id?: boolean
    subscriberId?: boolean
    topicId?: boolean
  }

  export type SubscriberTopicsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    subscriber?: boolean | SubscribersArgs<ExtArgs>
    topic?: boolean | TopicsArgs<ExtArgs>
  }


  type SubscriberTopicsGetPayload<S extends boolean | null | undefined | SubscriberTopicsArgs> = $Types.GetResult<SubscriberTopicsPayload, S>

  type SubscriberTopicsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<SubscriberTopicsFindManyArgs, 'select' | 'include'> & {
      select?: SubscriberTopicsCountAggregateInputType | true
    }

  export interface SubscriberTopicsDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SubscriberTopics'], meta: { name: 'SubscriberTopics' } }
    /**
     * Find zero or one SubscriberTopics that matches the filter.
     * @param {SubscriberTopicsFindUniqueArgs} args - Arguments to find a SubscriberTopics
     * @example
     * // Get one SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends SubscriberTopicsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriberTopicsFindUniqueArgs<ExtArgs>>
    ): Prisma__SubscriberTopicsClient<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one SubscriberTopics that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {SubscriberTopicsFindUniqueOrThrowArgs} args - Arguments to find a SubscriberTopics
     * @example
     * // Get one SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends SubscriberTopicsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriberTopicsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__SubscriberTopicsClient<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first SubscriberTopics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberTopicsFindFirstArgs} args - Arguments to find a SubscriberTopics
     * @example
     * // Get one SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends SubscriberTopicsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriberTopicsFindFirstArgs<ExtArgs>>
    ): Prisma__SubscriberTopicsClient<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first SubscriberTopics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberTopicsFindFirstOrThrowArgs} args - Arguments to find a SubscriberTopics
     * @example
     * // Get one SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends SubscriberTopicsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriberTopicsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__SubscriberTopicsClient<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more SubscriberTopics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberTopicsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.findMany()
     * 
     * // Get first 10 SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const subscriberTopicsWithIdOnly = await prisma.subscriberTopics.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends SubscriberTopicsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriberTopicsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a SubscriberTopics.
     * @param {SubscriberTopicsCreateArgs} args - Arguments to create a SubscriberTopics.
     * @example
     * // Create one SubscriberTopics
     * const SubscriberTopics = await prisma.subscriberTopics.create({
     *   data: {
     *     // ... data to create a SubscriberTopics
     *   }
     * })
     * 
    **/
    create<T extends SubscriberTopicsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriberTopicsCreateArgs<ExtArgs>>
    ): Prisma__SubscriberTopicsClient<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many SubscriberTopics.
     *     @param {SubscriberTopicsCreateManyArgs} args - Arguments to create many SubscriberTopics.
     *     @example
     *     // Create many SubscriberTopics
     *     const subscriberTopics = await prisma.subscriberTopics.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends SubscriberTopicsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriberTopicsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a SubscriberTopics.
     * @param {SubscriberTopicsDeleteArgs} args - Arguments to delete one SubscriberTopics.
     * @example
     * // Delete one SubscriberTopics
     * const SubscriberTopics = await prisma.subscriberTopics.delete({
     *   where: {
     *     // ... filter to delete one SubscriberTopics
     *   }
     * })
     * 
    **/
    delete<T extends SubscriberTopicsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriberTopicsDeleteArgs<ExtArgs>>
    ): Prisma__SubscriberTopicsClient<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one SubscriberTopics.
     * @param {SubscriberTopicsUpdateArgs} args - Arguments to update one SubscriberTopics.
     * @example
     * // Update one SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends SubscriberTopicsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriberTopicsUpdateArgs<ExtArgs>>
    ): Prisma__SubscriberTopicsClient<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more SubscriberTopics.
     * @param {SubscriberTopicsDeleteManyArgs} args - Arguments to filter SubscriberTopics to delete.
     * @example
     * // Delete a few SubscriberTopics
     * const { count } = await prisma.subscriberTopics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends SubscriberTopicsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, SubscriberTopicsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SubscriberTopics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberTopicsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends SubscriberTopicsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriberTopicsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one SubscriberTopics.
     * @param {SubscriberTopicsUpsertArgs} args - Arguments to update or create a SubscriberTopics.
     * @example
     * // Update or create a SubscriberTopics
     * const subscriberTopics = await prisma.subscriberTopics.upsert({
     *   create: {
     *     // ... data to create a SubscriberTopics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SubscriberTopics we want to update
     *   }
     * })
    **/
    upsert<T extends SubscriberTopicsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, SubscriberTopicsUpsertArgs<ExtArgs>>
    ): Prisma__SubscriberTopicsClient<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of SubscriberTopics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberTopicsCountArgs} args - Arguments to filter SubscriberTopics to count.
     * @example
     * // Count the number of SubscriberTopics
     * const count = await prisma.subscriberTopics.count({
     *   where: {
     *     // ... the filter for the SubscriberTopics we want to count
     *   }
     * })
    **/
    count<T extends SubscriberTopicsCountArgs>(
      args?: Subset<T, SubscriberTopicsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SubscriberTopicsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SubscriberTopics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberTopicsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SubscriberTopicsAggregateArgs>(args: Subset<T, SubscriberTopicsAggregateArgs>): Prisma.PrismaPromise<GetSubscriberTopicsAggregateType<T>>

    /**
     * Group by SubscriberTopics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SubscriberTopicsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SubscriberTopicsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SubscriberTopicsGroupByArgs['orderBy'] }
        : { orderBy?: SubscriberTopicsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SubscriberTopicsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSubscriberTopicsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SubscriberTopics model
   */
  readonly fields: SubscriberTopicsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SubscriberTopics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__SubscriberTopicsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    subscriber<T extends SubscribersArgs<ExtArgs> = {}>(args?: Subset<T, SubscribersArgs<ExtArgs>>): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    topic<T extends TopicsArgs<ExtArgs> = {}>(args?: Subset<T, TopicsArgs<ExtArgs>>): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'findUnique'> | Null, never, ExtArgs>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the SubscriberTopics model
   */ 
  interface SubscriberTopicsFieldRefs {
    readonly id: FieldRef<"SubscriberTopics", 'Int'>
    readonly subscriberId: FieldRef<"SubscriberTopics", 'String'>
    readonly topicId: FieldRef<"SubscriberTopics", 'Int'>
  }
    

  // Custom InputTypes

  /**
   * SubscriberTopics findUnique
   */
  export type SubscriberTopicsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberTopics to fetch.
     */
    where: SubscriberTopicsWhereUniqueInput
  }


  /**
   * SubscriberTopics findUniqueOrThrow
   */
  export type SubscriberTopicsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberTopics to fetch.
     */
    where: SubscriberTopicsWhereUniqueInput
  }


  /**
   * SubscriberTopics findFirst
   */
  export type SubscriberTopicsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberTopics to fetch.
     */
    where?: SubscriberTopicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriberTopics to fetch.
     */
    orderBy?: SubscriberTopicsOrderByWithRelationInput | SubscriberTopicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriberTopics.
     */
    cursor?: SubscriberTopicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriberTopics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriberTopics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriberTopics.
     */
    distinct?: SubscriberTopicsScalarFieldEnum | SubscriberTopicsScalarFieldEnum[]
  }


  /**
   * SubscriberTopics findFirstOrThrow
   */
  export type SubscriberTopicsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberTopics to fetch.
     */
    where?: SubscriberTopicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriberTopics to fetch.
     */
    orderBy?: SubscriberTopicsOrderByWithRelationInput | SubscriberTopicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SubscriberTopics.
     */
    cursor?: SubscriberTopicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriberTopics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriberTopics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SubscriberTopics.
     */
    distinct?: SubscriberTopicsScalarFieldEnum | SubscriberTopicsScalarFieldEnum[]
  }


  /**
   * SubscriberTopics findMany
   */
  export type SubscriberTopicsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * Filter, which SubscriberTopics to fetch.
     */
    where?: SubscriberTopicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SubscriberTopics to fetch.
     */
    orderBy?: SubscriberTopicsOrderByWithRelationInput | SubscriberTopicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SubscriberTopics.
     */
    cursor?: SubscriberTopicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SubscriberTopics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SubscriberTopics.
     */
    skip?: number
    distinct?: SubscriberTopicsScalarFieldEnum | SubscriberTopicsScalarFieldEnum[]
  }


  /**
   * SubscriberTopics create
   */
  export type SubscriberTopicsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * The data needed to create a SubscriberTopics.
     */
    data: XOR<SubscriberTopicsCreateInput, SubscriberTopicsUncheckedCreateInput>
  }


  /**
   * SubscriberTopics createMany
   */
  export type SubscriberTopicsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SubscriberTopics.
     */
    data: SubscriberTopicsCreateManyInput | SubscriberTopicsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * SubscriberTopics update
   */
  export type SubscriberTopicsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * The data needed to update a SubscriberTopics.
     */
    data: XOR<SubscriberTopicsUpdateInput, SubscriberTopicsUncheckedUpdateInput>
    /**
     * Choose, which SubscriberTopics to update.
     */
    where: SubscriberTopicsWhereUniqueInput
  }


  /**
   * SubscriberTopics updateMany
   */
  export type SubscriberTopicsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SubscriberTopics.
     */
    data: XOR<SubscriberTopicsUpdateManyMutationInput, SubscriberTopicsUncheckedUpdateManyInput>
    /**
     * Filter which SubscriberTopics to update
     */
    where?: SubscriberTopicsWhereInput
  }


  /**
   * SubscriberTopics upsert
   */
  export type SubscriberTopicsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * The filter to search for the SubscriberTopics to update in case it exists.
     */
    where: SubscriberTopicsWhereUniqueInput
    /**
     * In case the SubscriberTopics found by the `where` argument doesn't exist, create a new SubscriberTopics with this data.
     */
    create: XOR<SubscriberTopicsCreateInput, SubscriberTopicsUncheckedCreateInput>
    /**
     * In case the SubscriberTopics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SubscriberTopicsUpdateInput, SubscriberTopicsUncheckedUpdateInput>
  }


  /**
   * SubscriberTopics delete
   */
  export type SubscriberTopicsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    /**
     * Filter which SubscriberTopics to delete.
     */
    where: SubscriberTopicsWhereUniqueInput
  }


  /**
   * SubscriberTopics deleteMany
   */
  export type SubscriberTopicsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which SubscriberTopics to delete
     */
    where?: SubscriberTopicsWhereInput
  }


  /**
   * SubscriberTopics without action
   */
  export type SubscriberTopicsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
  }



  /**
   * Model Topics
   */


  export type AggregateTopics = {
    _count: TopicsCountAggregateOutputType | null
    _avg: TopicsAvgAggregateOutputType | null
    _sum: TopicsSumAggregateOutputType | null
    _min: TopicsMinAggregateOutputType | null
    _max: TopicsMaxAggregateOutputType | null
  }

  export type TopicsAvgAggregateOutputType = {
    id: number | null
  }

  export type TopicsSumAggregateOutputType = {
    id: number | null
  }

  export type TopicsMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TopicsMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type TopicsCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type TopicsAvgAggregateInputType = {
    id?: true
  }

  export type TopicsSumAggregateInputType = {
    id?: true
  }

  export type TopicsMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type TopicsMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type TopicsCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type TopicsAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Topics to aggregate.
     */
    where?: TopicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Topics to fetch.
     */
    orderBy?: TopicsOrderByWithRelationInput | TopicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TopicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Topics
    **/
    _count?: true | TopicsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TopicsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TopicsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TopicsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TopicsMaxAggregateInputType
  }

  export type GetTopicsAggregateType<T extends TopicsAggregateArgs> = {
        [P in keyof T & keyof AggregateTopics]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTopics[P]>
      : GetScalarType<T[P], AggregateTopics[P]>
  }




  export type TopicsGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: TopicsWhereInput
    orderBy?: TopicsOrderByWithAggregationInput | TopicsOrderByWithAggregationInput[]
    by: TopicsScalarFieldEnum[] | TopicsScalarFieldEnum
    having?: TopicsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TopicsCountAggregateInputType | true
    _avg?: TopicsAvgAggregateInputType
    _sum?: TopicsSumAggregateInputType
    _min?: TopicsMinAggregateInputType
    _max?: TopicsMaxAggregateInputType
  }


  export type TopicsGroupByOutputType = {
    id: number
    name: string
    _count: TopicsCountAggregateOutputType | null
    _avg: TopicsAvgAggregateOutputType | null
    _sum: TopicsSumAggregateOutputType | null
    _min: TopicsMinAggregateOutputType | null
    _max: TopicsMaxAggregateOutputType | null
  }

  type GetTopicsGroupByPayload<T extends TopicsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TopicsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TopicsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TopicsGroupByOutputType[P]>
            : GetScalarType<T[P], TopicsGroupByOutputType[P]>
        }
      >
    >


  export type TopicsSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    subscribers?: boolean | Topics$subscribersArgs<ExtArgs>
    _count?: boolean | TopicsCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["topics"]>

  export type TopicsSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type TopicsInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    subscribers?: boolean | Topics$subscribersArgs<ExtArgs>
    _count?: boolean | TopicsCountOutputTypeArgs<ExtArgs>
  }


  type TopicsGetPayload<S extends boolean | null | undefined | TopicsArgs> = $Types.GetResult<TopicsPayload, S>

  type TopicsCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<TopicsFindManyArgs, 'select' | 'include'> & {
      select?: TopicsCountAggregateInputType | true
    }

  export interface TopicsDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Topics'], meta: { name: 'Topics' } }
    /**
     * Find zero or one Topics that matches the filter.
     * @param {TopicsFindUniqueArgs} args - Arguments to find a Topics
     * @example
     * // Get one Topics
     * const topics = await prisma.topics.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends TopicsFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, TopicsFindUniqueArgs<ExtArgs>>
    ): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Topics that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {TopicsFindUniqueOrThrowArgs} args - Arguments to find a Topics
     * @example
     * // Get one Topics
     * const topics = await prisma.topics.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends TopicsFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TopicsFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Topics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicsFindFirstArgs} args - Arguments to find a Topics
     * @example
     * // Get one Topics
     * const topics = await prisma.topics.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends TopicsFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, TopicsFindFirstArgs<ExtArgs>>
    ): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Topics that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicsFindFirstOrThrowArgs} args - Arguments to find a Topics
     * @example
     * // Get one Topics
     * const topics = await prisma.topics.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends TopicsFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, TopicsFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Topics that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Topics
     * const topics = await prisma.topics.findMany()
     * 
     * // Get first 10 Topics
     * const topics = await prisma.topics.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const topicsWithIdOnly = await prisma.topics.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends TopicsFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TopicsFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Topics.
     * @param {TopicsCreateArgs} args - Arguments to create a Topics.
     * @example
     * // Create one Topics
     * const Topics = await prisma.topics.create({
     *   data: {
     *     // ... data to create a Topics
     *   }
     * })
     * 
    **/
    create<T extends TopicsCreateArgs<ExtArgs>>(
      args: SelectSubset<T, TopicsCreateArgs<ExtArgs>>
    ): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Topics.
     *     @param {TopicsCreateManyArgs} args - Arguments to create many Topics.
     *     @example
     *     // Create many Topics
     *     const topics = await prisma.topics.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends TopicsCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TopicsCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Topics.
     * @param {TopicsDeleteArgs} args - Arguments to delete one Topics.
     * @example
     * // Delete one Topics
     * const Topics = await prisma.topics.delete({
     *   where: {
     *     // ... filter to delete one Topics
     *   }
     * })
     * 
    **/
    delete<T extends TopicsDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, TopicsDeleteArgs<ExtArgs>>
    ): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Topics.
     * @param {TopicsUpdateArgs} args - Arguments to update one Topics.
     * @example
     * // Update one Topics
     * const topics = await prisma.topics.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends TopicsUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, TopicsUpdateArgs<ExtArgs>>
    ): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Topics.
     * @param {TopicsDeleteManyArgs} args - Arguments to filter Topics to delete.
     * @example
     * // Delete a few Topics
     * const { count } = await prisma.topics.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends TopicsDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, TopicsDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Topics
     * const topics = await prisma.topics.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends TopicsUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, TopicsUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Topics.
     * @param {TopicsUpsertArgs} args - Arguments to update or create a Topics.
     * @example
     * // Update or create a Topics
     * const topics = await prisma.topics.upsert({
     *   create: {
     *     // ... data to create a Topics
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Topics we want to update
     *   }
     * })
    **/
    upsert<T extends TopicsUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, TopicsUpsertArgs<ExtArgs>>
    ): Prisma__TopicsClient<$Types.GetResult<TopicsPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicsCountArgs} args - Arguments to filter Topics to count.
     * @example
     * // Count the number of Topics
     * const count = await prisma.topics.count({
     *   where: {
     *     // ... the filter for the Topics we want to count
     *   }
     * })
    **/
    count<T extends TopicsCountArgs>(
      args?: Subset<T, TopicsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TopicsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TopicsAggregateArgs>(args: Subset<T, TopicsAggregateArgs>): Prisma.PrismaPromise<GetTopicsAggregateType<T>>

    /**
     * Group by Topics.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TopicsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TopicsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TopicsGroupByArgs['orderBy'] }
        : { orderBy?: TopicsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TopicsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTopicsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Topics model
   */
  readonly fields: TopicsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Topics.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__TopicsClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    subscribers<T extends Topics$subscribersArgs<ExtArgs> = {}>(args?: Subset<T, Topics$subscribersArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<SubscriberTopicsPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Topics model
   */ 
  interface TopicsFieldRefs {
    readonly id: FieldRef<"Topics", 'Int'>
    readonly name: FieldRef<"Topics", 'String'>
  }
    

  // Custom InputTypes

  /**
   * Topics findUnique
   */
  export type TopicsFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * Filter, which Topics to fetch.
     */
    where: TopicsWhereUniqueInput
  }


  /**
   * Topics findUniqueOrThrow
   */
  export type TopicsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * Filter, which Topics to fetch.
     */
    where: TopicsWhereUniqueInput
  }


  /**
   * Topics findFirst
   */
  export type TopicsFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * Filter, which Topics to fetch.
     */
    where?: TopicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Topics to fetch.
     */
    orderBy?: TopicsOrderByWithRelationInput | TopicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Topics.
     */
    cursor?: TopicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Topics.
     */
    distinct?: TopicsScalarFieldEnum | TopicsScalarFieldEnum[]
  }


  /**
   * Topics findFirstOrThrow
   */
  export type TopicsFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * Filter, which Topics to fetch.
     */
    where?: TopicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Topics to fetch.
     */
    orderBy?: TopicsOrderByWithRelationInput | TopicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Topics.
     */
    cursor?: TopicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Topics.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Topics.
     */
    distinct?: TopicsScalarFieldEnum | TopicsScalarFieldEnum[]
  }


  /**
   * Topics findMany
   */
  export type TopicsFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * Filter, which Topics to fetch.
     */
    where?: TopicsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Topics to fetch.
     */
    orderBy?: TopicsOrderByWithRelationInput | TopicsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Topics.
     */
    cursor?: TopicsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Topics from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Topics.
     */
    skip?: number
    distinct?: TopicsScalarFieldEnum | TopicsScalarFieldEnum[]
  }


  /**
   * Topics create
   */
  export type TopicsCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * The data needed to create a Topics.
     */
    data: XOR<TopicsCreateInput, TopicsUncheckedCreateInput>
  }


  /**
   * Topics createMany
   */
  export type TopicsCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Topics.
     */
    data: TopicsCreateManyInput | TopicsCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Topics update
   */
  export type TopicsUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * The data needed to update a Topics.
     */
    data: XOR<TopicsUpdateInput, TopicsUncheckedUpdateInput>
    /**
     * Choose, which Topics to update.
     */
    where: TopicsWhereUniqueInput
  }


  /**
   * Topics updateMany
   */
  export type TopicsUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Topics.
     */
    data: XOR<TopicsUpdateManyMutationInput, TopicsUncheckedUpdateManyInput>
    /**
     * Filter which Topics to update
     */
    where?: TopicsWhereInput
  }


  /**
   * Topics upsert
   */
  export type TopicsUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * The filter to search for the Topics to update in case it exists.
     */
    where: TopicsWhereUniqueInput
    /**
     * In case the Topics found by the `where` argument doesn't exist, create a new Topics with this data.
     */
    create: XOR<TopicsCreateInput, TopicsUncheckedCreateInput>
    /**
     * In case the Topics was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TopicsUpdateInput, TopicsUncheckedUpdateInput>
  }


  /**
   * Topics delete
   */
  export type TopicsDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
    /**
     * Filter which Topics to delete.
     */
    where: TopicsWhereUniqueInput
  }


  /**
   * Topics deleteMany
   */
  export type TopicsDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Topics to delete
     */
    where?: TopicsWhereInput
  }


  /**
   * Topics.subscribers
   */
  export type Topics$subscribersArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SubscriberTopics
     */
    select?: SubscriberTopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: SubscriberTopicsInclude<ExtArgs> | null
    where?: SubscriberTopicsWhereInput
    orderBy?: SubscriberTopicsOrderByWithRelationInput | SubscriberTopicsOrderByWithRelationInput[]
    cursor?: SubscriberTopicsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SubscriberTopicsScalarFieldEnum | SubscriberTopicsScalarFieldEnum[]
  }


  /**
   * Topics without action
   */
  export type TopicsArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Topics
     */
    select?: TopicsSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: TopicsInclude<ExtArgs> | null
  }



  /**
   * Model Companies
   */


  export type AggregateCompanies = {
    _count: CompaniesCountAggregateOutputType | null
    _min: CompaniesMinAggregateOutputType | null
    _max: CompaniesMaxAggregateOutputType | null
  }

  export type CompaniesMinAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    logoUrl: string | null
    countryIcon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompaniesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    logoUrl: string | null
    countryIcon: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type CompaniesCountAggregateOutputType = {
    id: number
    name: number
    url: number
    logoUrl: number
    countryIcon: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type CompaniesMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    logoUrl?: true
    countryIcon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompaniesMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    logoUrl?: true
    countryIcon?: true
    createdAt?: true
    updatedAt?: true
  }

  export type CompaniesCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    logoUrl?: true
    countryIcon?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type CompaniesAggregateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to aggregate.
     */
    where?: CompaniesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompaniesOrderByWithRelationInput | CompaniesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CompaniesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Companies
    **/
    _count?: true | CompaniesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CompaniesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CompaniesMaxAggregateInputType
  }

  export type GetCompaniesAggregateType<T extends CompaniesAggregateArgs> = {
        [P in keyof T & keyof AggregateCompanies]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCompanies[P]>
      : GetScalarType<T[P], AggregateCompanies[P]>
  }




  export type CompaniesGroupByArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    where?: CompaniesWhereInput
    orderBy?: CompaniesOrderByWithAggregationInput | CompaniesOrderByWithAggregationInput[]
    by: CompaniesScalarFieldEnum[] | CompaniesScalarFieldEnum
    having?: CompaniesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CompaniesCountAggregateInputType | true
    _min?: CompaniesMinAggregateInputType
    _max?: CompaniesMaxAggregateInputType
  }


  export type CompaniesGroupByOutputType = {
    id: string
    name: string
    url: string
    logoUrl: string | null
    countryIcon: string
    createdAt: Date
    updatedAt: Date
    _count: CompaniesCountAggregateOutputType | null
    _min: CompaniesMinAggregateOutputType | null
    _max: CompaniesMaxAggregateOutputType | null
  }

  type GetCompaniesGroupByPayload<T extends CompaniesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CompaniesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CompaniesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CompaniesGroupByOutputType[P]>
            : GetScalarType<T[P], CompaniesGroupByOutputType[P]>
        }
      >
    >


  export type CompaniesSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    url?: boolean
    logoUrl?: boolean
    countryIcon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    roles?: boolean | Companies$rolesArgs<ExtArgs>
    _count?: boolean | CompaniesCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["companies"]>

  export type CompaniesSelectScalar = {
    id?: boolean
    name?: boolean
    url?: boolean
    logoUrl?: boolean
    countryIcon?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type CompaniesInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    roles?: boolean | Companies$rolesArgs<ExtArgs>
    _count?: boolean | CompaniesCountOutputTypeArgs<ExtArgs>
  }


  type CompaniesGetPayload<S extends boolean | null | undefined | CompaniesArgs> = $Types.GetResult<CompaniesPayload, S>

  type CompaniesCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<CompaniesFindManyArgs, 'select' | 'include'> & {
      select?: CompaniesCountAggregateInputType | true
    }

  export interface CompaniesDelegate<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Companies'], meta: { name: 'Companies' } }
    /**
     * Find zero or one Companies that matches the filter.
     * @param {CompaniesFindUniqueArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends CompaniesFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, CompaniesFindUniqueArgs<ExtArgs>>
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Companies that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {CompaniesFindUniqueOrThrowArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends CompaniesFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CompaniesFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesFindFirstArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends CompaniesFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, CompaniesFindFirstArgs<ExtArgs>>
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Companies that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesFindFirstOrThrowArgs} args - Arguments to find a Companies
     * @example
     * // Get one Companies
     * const companies = await prisma.companies.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends CompaniesFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, CompaniesFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Companies that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Companies
     * const companies = await prisma.companies.findMany()
     * 
     * // Get first 10 Companies
     * const companies = await prisma.companies.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const companiesWithIdOnly = await prisma.companies.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends CompaniesFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CompaniesFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Companies.
     * @param {CompaniesCreateArgs} args - Arguments to create a Companies.
     * @example
     * // Create one Companies
     * const Companies = await prisma.companies.create({
     *   data: {
     *     // ... data to create a Companies
     *   }
     * })
     * 
    **/
    create<T extends CompaniesCreateArgs<ExtArgs>>(
      args: SelectSubset<T, CompaniesCreateArgs<ExtArgs>>
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Companies.
     *     @param {CompaniesCreateManyArgs} args - Arguments to create many Companies.
     *     @example
     *     // Create many Companies
     *     const companies = await prisma.companies.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends CompaniesCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CompaniesCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Companies.
     * @param {CompaniesDeleteArgs} args - Arguments to delete one Companies.
     * @example
     * // Delete one Companies
     * const Companies = await prisma.companies.delete({
     *   where: {
     *     // ... filter to delete one Companies
     *   }
     * })
     * 
    **/
    delete<T extends CompaniesDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, CompaniesDeleteArgs<ExtArgs>>
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Companies.
     * @param {CompaniesUpdateArgs} args - Arguments to update one Companies.
     * @example
     * // Update one Companies
     * const companies = await prisma.companies.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends CompaniesUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, CompaniesUpdateArgs<ExtArgs>>
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Companies.
     * @param {CompaniesDeleteManyArgs} args - Arguments to filter Companies to delete.
     * @example
     * // Delete a few Companies
     * const { count } = await prisma.companies.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends CompaniesDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, CompaniesDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Companies
     * const companies = await prisma.companies.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends CompaniesUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, CompaniesUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Companies.
     * @param {CompaniesUpsertArgs} args - Arguments to update or create a Companies.
     * @example
     * // Update or create a Companies
     * const companies = await prisma.companies.upsert({
     *   create: {
     *     // ... data to create a Companies
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Companies we want to update
     *   }
     * })
    **/
    upsert<T extends CompaniesUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, CompaniesUpsertArgs<ExtArgs>>
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesCountArgs} args - Arguments to filter Companies to count.
     * @example
     * // Count the number of Companies
     * const count = await prisma.companies.count({
     *   where: {
     *     // ... the filter for the Companies we want to count
     *   }
     * })
    **/
    count<T extends CompaniesCountArgs>(
      args?: Subset<T, CompaniesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CompaniesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CompaniesAggregateArgs>(args: Subset<T, CompaniesAggregateArgs>): Prisma.PrismaPromise<GetCompaniesAggregateType<T>>

    /**
     * Group by Companies.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CompaniesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CompaniesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CompaniesGroupByArgs['orderBy'] }
        : { orderBy?: CompaniesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CompaniesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCompaniesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Companies model
   */
  readonly fields: CompaniesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Companies.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__CompaniesClient<T, Null = never, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> implements Prisma.PrismaPromise<T> {
    private readonly _dmmf;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    readonly [Symbol.toStringTag]: 'PrismaPromise';
    constructor(_dmmf: runtime.DMMFClass, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);

    roles<T extends Companies$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Companies$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findMany'>| Null>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  /**
   * Fields of the Companies model
   */ 
  interface CompaniesFieldRefs {
    readonly id: FieldRef<"Companies", 'String'>
    readonly name: FieldRef<"Companies", 'String'>
    readonly url: FieldRef<"Companies", 'String'>
    readonly logoUrl: FieldRef<"Companies", 'String'>
    readonly countryIcon: FieldRef<"Companies", 'String'>
    readonly createdAt: FieldRef<"Companies", 'DateTime'>
    readonly updatedAt: FieldRef<"Companies", 'DateTime'>
  }
    

  // Custom InputTypes

  /**
   * Companies findUnique
   */
  export type CompaniesFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where: CompaniesWhereUniqueInput
  }


  /**
   * Companies findUniqueOrThrow
   */
  export type CompaniesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where: CompaniesWhereUniqueInput
  }


  /**
   * Companies findFirst
   */
  export type CompaniesFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompaniesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompaniesOrderByWithRelationInput | CompaniesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompaniesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompaniesScalarFieldEnum | CompaniesScalarFieldEnum[]
  }


  /**
   * Companies findFirstOrThrow
   */
  export type CompaniesFindFirstOrThrowArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompaniesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompaniesOrderByWithRelationInput | CompaniesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Companies.
     */
    cursor?: CompaniesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Companies.
     */
    distinct?: CompaniesScalarFieldEnum | CompaniesScalarFieldEnum[]
  }


  /**
   * Companies findMany
   */
  export type CompaniesFindManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * Filter, which Companies to fetch.
     */
    where?: CompaniesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Companies to fetch.
     */
    orderBy?: CompaniesOrderByWithRelationInput | CompaniesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Companies.
     */
    cursor?: CompaniesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Companies from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Companies.
     */
    skip?: number
    distinct?: CompaniesScalarFieldEnum | CompaniesScalarFieldEnum[]
  }


  /**
   * Companies create
   */
  export type CompaniesCreateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * The data needed to create a Companies.
     */
    data: XOR<CompaniesCreateInput, CompaniesUncheckedCreateInput>
  }


  /**
   * Companies createMany
   */
  export type CompaniesCreateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Companies.
     */
    data: CompaniesCreateManyInput | CompaniesCreateManyInput[]
    skipDuplicates?: boolean
  }


  /**
   * Companies update
   */
  export type CompaniesUpdateArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * The data needed to update a Companies.
     */
    data: XOR<CompaniesUpdateInput, CompaniesUncheckedUpdateInput>
    /**
     * Choose, which Companies to update.
     */
    where: CompaniesWhereUniqueInput
  }


  /**
   * Companies updateMany
   */
  export type CompaniesUpdateManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Companies.
     */
    data: XOR<CompaniesUpdateManyMutationInput, CompaniesUncheckedUpdateManyInput>
    /**
     * Filter which Companies to update
     */
    where?: CompaniesWhereInput
  }


  /**
   * Companies upsert
   */
  export type CompaniesUpsertArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * The filter to search for the Companies to update in case it exists.
     */
    where: CompaniesWhereUniqueInput
    /**
     * In case the Companies found by the `where` argument doesn't exist, create a new Companies with this data.
     */
    create: XOR<CompaniesCreateInput, CompaniesUncheckedCreateInput>
    /**
     * In case the Companies was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CompaniesUpdateInput, CompaniesUncheckedUpdateInput>
  }


  /**
   * Companies delete
   */
  export type CompaniesDeleteArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
    /**
     * Filter which Companies to delete.
     */
    where: CompaniesWhereUniqueInput
  }


  /**
   * Companies deleteMany
   */
  export type CompaniesDeleteManyArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Filter which Companies to delete
     */
    where?: CompaniesWhereInput
  }


  /**
   * Companies.roles
   */
  export type Companies$rolesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Roles
     */
    select?: RolesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: RolesInclude<ExtArgs> | null
    where?: RolesWhereInput
    orderBy?: RolesOrderByWithRelationInput | RolesOrderByWithRelationInput[]
    cursor?: RolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RolesScalarFieldEnum | RolesScalarFieldEnum[]
  }


  /**
   * Companies without action
   */
  export type CompaniesArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Companies
     */
    select?: CompaniesSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well.
     */
    include?: CompaniesInclude<ExtArgs> | null
  }



  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SubscribersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    linkedInUrl: 'linkedInUrl',
    gitHub: 'gitHub',
    startedWorkingAt: 'startedWorkingAt',
    skills: 'skills',
    englishLevel: 'englishLevel',
    isConfirmed: 'isConfirmed',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    optOut: 'optOut'
  };

  export type SubscribersScalarFieldEnum = (typeof SubscribersScalarFieldEnum)[keyof typeof SubscribersScalarFieldEnum]


  export const RolesScalarFieldEnum: {
    id: 'id',
    companyId: 'companyId',
    title: 'title',
    description: 'description',
    country: 'country',
    language: 'language',
    currency: 'currency',
    salary: 'salary',
    skills: 'skills',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    sentRolesId: 'sentRolesId',
    ready: 'ready',
    url: 'url'
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const SentRolesScalarFieldEnum: {
    id: 'id',
    sentAt: 'sentAt',
    roleId: 'roleId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SentRolesScalarFieldEnum = (typeof SentRolesScalarFieldEnum)[keyof typeof SentRolesScalarFieldEnum]


  export const SubscriberTopicsScalarFieldEnum: {
    id: 'id',
    subscriberId: 'subscriberId',
    topicId: 'topicId'
  };

  export type SubscriberTopicsScalarFieldEnum = (typeof SubscriberTopicsScalarFieldEnum)[keyof typeof SubscriberTopicsScalarFieldEnum]


  export const TopicsScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type TopicsScalarFieldEnum = (typeof TopicsScalarFieldEnum)[keyof typeof TopicsScalarFieldEnum]


  export const CompaniesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    logoUrl: 'logoUrl',
    countryIcon: 'countryIcon',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type CompaniesScalarFieldEnum = (typeof CompaniesScalarFieldEnum)[keyof typeof CompaniesScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'EnglishLevel'
   */
  export type EnumEnglishLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnglishLevel'>
    


  /**
   * Reference to a field of type 'EnglishLevel[]'
   */
  export type ListEnumEnglishLevelFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EnglishLevel[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SubscribersWhereInput = {
    AND?: SubscribersWhereInput | SubscribersWhereInput[]
    OR?: SubscribersWhereInput[]
    NOT?: SubscribersWhereInput | SubscribersWhereInput[]
    id?: UuidFilter<"Subscribers"> | string
    email?: StringFilter<"Subscribers"> | string
    name?: StringNullableFilter<"Subscribers"> | string | null
    linkedInUrl?: StringNullableFilter<"Subscribers"> | string | null
    gitHub?: StringNullableFilter<"Subscribers"> | string | null
    startedWorkingAt?: DateTimeNullableFilter<"Subscribers"> | Date | string | null
    skills?: JsonNullableFilter<"Subscribers">
    englishLevel?: EnumEnglishLevelNullableFilter<"Subscribers"> | EnglishLevel | null
    isConfirmed?: BoolFilter<"Subscribers"> | boolean
    createdAt?: DateTimeFilter<"Subscribers"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Subscribers"> | Date | string | null
    optOut?: BoolFilter<"Subscribers"> | boolean
    sentRoles?: SentRolesListRelationFilter
    subscriberTopics?: SubscriberTopicsListRelationFilter
  }

  export type SubscribersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    gitHub?: SortOrderInput | SortOrder
    startedWorkingAt?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    englishLevel?: SortOrderInput | SortOrder
    isConfirmed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    optOut?: SortOrder
    sentRoles?: SentRolesOrderByRelationAggregateInput
    subscriberTopics?: SubscriberTopicsOrderByRelationAggregateInput
  }

  export type SubscribersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: SubscribersWhereInput | SubscribersWhereInput[]
    OR?: SubscribersWhereInput[]
    NOT?: SubscribersWhereInput | SubscribersWhereInput[]
    name?: StringNullableFilter<"Subscribers"> | string | null
    linkedInUrl?: StringNullableFilter<"Subscribers"> | string | null
    gitHub?: StringNullableFilter<"Subscribers"> | string | null
    startedWorkingAt?: DateTimeNullableFilter<"Subscribers"> | Date | string | null
    skills?: JsonNullableFilter<"Subscribers">
    englishLevel?: EnumEnglishLevelNullableFilter<"Subscribers"> | EnglishLevel | null
    isConfirmed?: BoolFilter<"Subscribers"> | boolean
    createdAt?: DateTimeFilter<"Subscribers"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Subscribers"> | Date | string | null
    optOut?: BoolFilter<"Subscribers"> | boolean
    sentRoles?: SentRolesListRelationFilter
    subscriberTopics?: SubscriberTopicsListRelationFilter
  }, "id" | "email">

  export type SubscribersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrderInput | SortOrder
    linkedInUrl?: SortOrderInput | SortOrder
    gitHub?: SortOrderInput | SortOrder
    startedWorkingAt?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    englishLevel?: SortOrderInput | SortOrder
    isConfirmed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrderInput | SortOrder
    optOut?: SortOrder
    _count?: SubscribersCountOrderByAggregateInput
    _max?: SubscribersMaxOrderByAggregateInput
    _min?: SubscribersMinOrderByAggregateInput
  }

  export type SubscribersScalarWhereWithAggregatesInput = {
    AND?: SubscribersScalarWhereWithAggregatesInput | SubscribersScalarWhereWithAggregatesInput[]
    OR?: SubscribersScalarWhereWithAggregatesInput[]
    NOT?: SubscribersScalarWhereWithAggregatesInput | SubscribersScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Subscribers"> | string
    email?: StringWithAggregatesFilter<"Subscribers"> | string
    name?: StringNullableWithAggregatesFilter<"Subscribers"> | string | null
    linkedInUrl?: StringNullableWithAggregatesFilter<"Subscribers"> | string | null
    gitHub?: StringNullableWithAggregatesFilter<"Subscribers"> | string | null
    startedWorkingAt?: DateTimeNullableWithAggregatesFilter<"Subscribers"> | Date | string | null
    skills?: JsonNullableWithAggregatesFilter<"Subscribers">
    englishLevel?: EnumEnglishLevelNullableWithAggregatesFilter<"Subscribers"> | EnglishLevel | null
    isConfirmed?: BoolWithAggregatesFilter<"Subscribers"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Subscribers"> | Date | string
    updatedAt?: DateTimeNullableWithAggregatesFilter<"Subscribers"> | Date | string | null
    optOut?: BoolWithAggregatesFilter<"Subscribers"> | boolean
  }

  export type RolesWhereInput = {
    AND?: RolesWhereInput | RolesWhereInput[]
    OR?: RolesWhereInput[]
    NOT?: RolesWhereInput | RolesWhereInput[]
    id?: StringFilter<"Roles"> | string
    companyId?: StringFilter<"Roles"> | string
    title?: StringFilter<"Roles"> | string
    description?: StringFilter<"Roles"> | string
    country?: StringFilter<"Roles"> | string
    language?: StringFilter<"Roles"> | string
    currency?: StringNullableFilter<"Roles"> | string | null
    salary?: StringNullableFilter<"Roles"> | string | null
    skills?: JsonNullableFilter<"Roles">
    createdAt?: DateTimeFilter<"Roles"> | Date | string
    updatedAt?: DateTimeFilter<"Roles"> | Date | string
    sentRolesId?: StringNullableFilter<"Roles"> | string | null
    ready?: BoolFilter<"Roles"> | boolean
    url?: StringNullableFilter<"Roles"> | string | null
    company?: XOR<CompaniesRelationFilter, CompaniesWhereInput>
    sentRoles?: XOR<SentRolesNullableRelationFilter, SentRolesWhereInput> | null
  }

  export type RolesOrderByWithRelationInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    country?: SortOrder
    language?: SortOrder
    currency?: SortOrderInput | SortOrder
    salary?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentRolesId?: SortOrderInput | SortOrder
    ready?: SortOrder
    url?: SortOrderInput | SortOrder
    company?: CompaniesOrderByWithRelationInput
    sentRoles?: SentRolesOrderByWithRelationInput
  }

  export type RolesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sentRolesId?: string
    AND?: RolesWhereInput | RolesWhereInput[]
    OR?: RolesWhereInput[]
    NOT?: RolesWhereInput | RolesWhereInput[]
    companyId?: StringFilter<"Roles"> | string
    title?: StringFilter<"Roles"> | string
    description?: StringFilter<"Roles"> | string
    country?: StringFilter<"Roles"> | string
    language?: StringFilter<"Roles"> | string
    currency?: StringNullableFilter<"Roles"> | string | null
    salary?: StringNullableFilter<"Roles"> | string | null
    skills?: JsonNullableFilter<"Roles">
    createdAt?: DateTimeFilter<"Roles"> | Date | string
    updatedAt?: DateTimeFilter<"Roles"> | Date | string
    ready?: BoolFilter<"Roles"> | boolean
    url?: StringNullableFilter<"Roles"> | string | null
    company?: XOR<CompaniesRelationFilter, CompaniesWhereInput>
    sentRoles?: XOR<SentRolesNullableRelationFilter, SentRolesWhereInput> | null
  }, "id" | "sentRolesId">

  export type RolesOrderByWithAggregationInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    country?: SortOrder
    language?: SortOrder
    currency?: SortOrderInput | SortOrder
    salary?: SortOrderInput | SortOrder
    skills?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentRolesId?: SortOrderInput | SortOrder
    ready?: SortOrder
    url?: SortOrderInput | SortOrder
    _count?: RolesCountOrderByAggregateInput
    _max?: RolesMaxOrderByAggregateInput
    _min?: RolesMinOrderByAggregateInput
  }

  export type RolesScalarWhereWithAggregatesInput = {
    AND?: RolesScalarWhereWithAggregatesInput | RolesScalarWhereWithAggregatesInput[]
    OR?: RolesScalarWhereWithAggregatesInput[]
    NOT?: RolesScalarWhereWithAggregatesInput | RolesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Roles"> | string
    companyId?: StringWithAggregatesFilter<"Roles"> | string
    title?: StringWithAggregatesFilter<"Roles"> | string
    description?: StringWithAggregatesFilter<"Roles"> | string
    country?: StringWithAggregatesFilter<"Roles"> | string
    language?: StringWithAggregatesFilter<"Roles"> | string
    currency?: StringNullableWithAggregatesFilter<"Roles"> | string | null
    salary?: StringNullableWithAggregatesFilter<"Roles"> | string | null
    skills?: JsonNullableWithAggregatesFilter<"Roles">
    createdAt?: DateTimeWithAggregatesFilter<"Roles"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Roles"> | Date | string
    sentRolesId?: StringNullableWithAggregatesFilter<"Roles"> | string | null
    ready?: BoolWithAggregatesFilter<"Roles"> | boolean
    url?: StringNullableWithAggregatesFilter<"Roles"> | string | null
  }

  export type SentRolesWhereInput = {
    AND?: SentRolesWhereInput | SentRolesWhereInput[]
    OR?: SentRolesWhereInput[]
    NOT?: SentRolesWhereInput | SentRolesWhereInput[]
    id?: StringFilter<"SentRoles"> | string
    sentAt?: DateTimeNullableFilter<"SentRoles"> | Date | string | null
    roleId?: StringFilter<"SentRoles"> | string
    createdAt?: DateTimeFilter<"SentRoles"> | Date | string
    updatedAt?: DateTimeFilter<"SentRoles"> | Date | string
    role?: XOR<RolesNullableRelationFilter, RolesWhereInput> | null
    subscribers?: SubscribersListRelationFilter
  }

  export type SentRolesOrderByWithRelationInput = {
    id?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    role?: RolesOrderByWithRelationInput
    subscribers?: SubscribersOrderByRelationAggregateInput
  }

  export type SentRolesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: SentRolesWhereInput | SentRolesWhereInput[]
    OR?: SentRolesWhereInput[]
    NOT?: SentRolesWhereInput | SentRolesWhereInput[]
    sentAt?: DateTimeNullableFilter<"SentRoles"> | Date | string | null
    roleId?: StringFilter<"SentRoles"> | string
    createdAt?: DateTimeFilter<"SentRoles"> | Date | string
    updatedAt?: DateTimeFilter<"SentRoles"> | Date | string
    role?: XOR<RolesNullableRelationFilter, RolesWhereInput> | null
    subscribers?: SubscribersListRelationFilter
  }, "id">

  export type SentRolesOrderByWithAggregationInput = {
    id?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SentRolesCountOrderByAggregateInput
    _max?: SentRolesMaxOrderByAggregateInput
    _min?: SentRolesMinOrderByAggregateInput
  }

  export type SentRolesScalarWhereWithAggregatesInput = {
    AND?: SentRolesScalarWhereWithAggregatesInput | SentRolesScalarWhereWithAggregatesInput[]
    OR?: SentRolesScalarWhereWithAggregatesInput[]
    NOT?: SentRolesScalarWhereWithAggregatesInput | SentRolesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"SentRoles"> | string
    sentAt?: DateTimeNullableWithAggregatesFilter<"SentRoles"> | Date | string | null
    roleId?: StringWithAggregatesFilter<"SentRoles"> | string
    createdAt?: DateTimeWithAggregatesFilter<"SentRoles"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SentRoles"> | Date | string
  }

  export type SubscriberTopicsWhereInput = {
    AND?: SubscriberTopicsWhereInput | SubscriberTopicsWhereInput[]
    OR?: SubscriberTopicsWhereInput[]
    NOT?: SubscriberTopicsWhereInput | SubscriberTopicsWhereInput[]
    id?: IntFilter<"SubscriberTopics"> | number
    subscriberId?: UuidFilter<"SubscriberTopics"> | string
    topicId?: IntFilter<"SubscriberTopics"> | number
    subscriber?: XOR<SubscribersRelationFilter, SubscribersWhereInput>
    topic?: XOR<TopicsRelationFilter, TopicsWhereInput>
  }

  export type SubscriberTopicsOrderByWithRelationInput = {
    id?: SortOrder
    subscriberId?: SortOrder
    topicId?: SortOrder
    subscriber?: SubscribersOrderByWithRelationInput
    topic?: TopicsOrderByWithRelationInput
  }

  export type SubscriberTopicsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SubscriberTopicsWhereInput | SubscriberTopicsWhereInput[]
    OR?: SubscriberTopicsWhereInput[]
    NOT?: SubscriberTopicsWhereInput | SubscriberTopicsWhereInput[]
    subscriberId?: UuidFilter<"SubscriberTopics"> | string
    topicId?: IntFilter<"SubscriberTopics"> | number
    subscriber?: XOR<SubscribersRelationFilter, SubscribersWhereInput>
    topic?: XOR<TopicsRelationFilter, TopicsWhereInput>
  }, "id">

  export type SubscriberTopicsOrderByWithAggregationInput = {
    id?: SortOrder
    subscriberId?: SortOrder
    topicId?: SortOrder
    _count?: SubscriberTopicsCountOrderByAggregateInput
    _avg?: SubscriberTopicsAvgOrderByAggregateInput
    _max?: SubscriberTopicsMaxOrderByAggregateInput
    _min?: SubscriberTopicsMinOrderByAggregateInput
    _sum?: SubscriberTopicsSumOrderByAggregateInput
  }

  export type SubscriberTopicsScalarWhereWithAggregatesInput = {
    AND?: SubscriberTopicsScalarWhereWithAggregatesInput | SubscriberTopicsScalarWhereWithAggregatesInput[]
    OR?: SubscriberTopicsScalarWhereWithAggregatesInput[]
    NOT?: SubscriberTopicsScalarWhereWithAggregatesInput | SubscriberTopicsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SubscriberTopics"> | number
    subscriberId?: UuidWithAggregatesFilter<"SubscriberTopics"> | string
    topicId?: IntWithAggregatesFilter<"SubscriberTopics"> | number
  }

  export type TopicsWhereInput = {
    AND?: TopicsWhereInput | TopicsWhereInput[]
    OR?: TopicsWhereInput[]
    NOT?: TopicsWhereInput | TopicsWhereInput[]
    id?: IntFilter<"Topics"> | number
    name?: StringFilter<"Topics"> | string
    subscribers?: SubscriberTopicsListRelationFilter
  }

  export type TopicsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    subscribers?: SubscriberTopicsOrderByRelationAggregateInput
  }

  export type TopicsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: TopicsWhereInput | TopicsWhereInput[]
    OR?: TopicsWhereInput[]
    NOT?: TopicsWhereInput | TopicsWhereInput[]
    subscribers?: SubscriberTopicsListRelationFilter
  }, "id" | "name">

  export type TopicsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: TopicsCountOrderByAggregateInput
    _avg?: TopicsAvgOrderByAggregateInput
    _max?: TopicsMaxOrderByAggregateInput
    _min?: TopicsMinOrderByAggregateInput
    _sum?: TopicsSumOrderByAggregateInput
  }

  export type TopicsScalarWhereWithAggregatesInput = {
    AND?: TopicsScalarWhereWithAggregatesInput | TopicsScalarWhereWithAggregatesInput[]
    OR?: TopicsScalarWhereWithAggregatesInput[]
    NOT?: TopicsScalarWhereWithAggregatesInput | TopicsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Topics"> | number
    name?: StringWithAggregatesFilter<"Topics"> | string
  }

  export type CompaniesWhereInput = {
    AND?: CompaniesWhereInput | CompaniesWhereInput[]
    OR?: CompaniesWhereInput[]
    NOT?: CompaniesWhereInput | CompaniesWhereInput[]
    id?: StringFilter<"Companies"> | string
    name?: StringFilter<"Companies"> | string
    url?: StringFilter<"Companies"> | string
    logoUrl?: StringNullableFilter<"Companies"> | string | null
    countryIcon?: StringFilter<"Companies"> | string
    createdAt?: DateTimeFilter<"Companies"> | Date | string
    updatedAt?: DateTimeFilter<"Companies"> | Date | string
    roles?: RolesListRelationFilter
  }

  export type CompaniesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    roles?: RolesOrderByRelationAggregateInput
  }

  export type CompaniesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CompaniesWhereInput | CompaniesWhereInput[]
    OR?: CompaniesWhereInput[]
    NOT?: CompaniesWhereInput | CompaniesWhereInput[]
    name?: StringFilter<"Companies"> | string
    url?: StringFilter<"Companies"> | string
    logoUrl?: StringNullableFilter<"Companies"> | string | null
    countryIcon?: StringFilter<"Companies"> | string
    createdAt?: DateTimeFilter<"Companies"> | Date | string
    updatedAt?: DateTimeFilter<"Companies"> | Date | string
    roles?: RolesListRelationFilter
  }, "id">

  export type CompaniesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: CompaniesCountOrderByAggregateInput
    _max?: CompaniesMaxOrderByAggregateInput
    _min?: CompaniesMinOrderByAggregateInput
  }

  export type CompaniesScalarWhereWithAggregatesInput = {
    AND?: CompaniesScalarWhereWithAggregatesInput | CompaniesScalarWhereWithAggregatesInput[]
    OR?: CompaniesScalarWhereWithAggregatesInput[]
    NOT?: CompaniesScalarWhereWithAggregatesInput | CompaniesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Companies"> | string
    name?: StringWithAggregatesFilter<"Companies"> | string
    url?: StringWithAggregatesFilter<"Companies"> | string
    logoUrl?: StringNullableWithAggregatesFilter<"Companies"> | string | null
    countryIcon?: StringWithAggregatesFilter<"Companies"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Companies"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Companies"> | Date | string
  }

  export type SubscribersCreateInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    optOut?: boolean
    sentRoles?: SentRolesCreateNestedManyWithoutSubscribersInput
    subscriberTopics?: SubscriberTopicsCreateNestedManyWithoutSubscriberInput
  }

  export type SubscribersUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    optOut?: boolean
    sentRoles?: SentRolesUncheckedCreateNestedManyWithoutSubscribersInput
    subscriberTopics?: SubscriberTopicsUncheckedCreateNestedManyWithoutSubscriberInput
  }

  export type SubscribersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
    sentRoles?: SentRolesUpdateManyWithoutSubscribersNestedInput
    subscriberTopics?: SubscriberTopicsUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscribersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
    sentRoles?: SentRolesUncheckedUpdateManyWithoutSubscribersNestedInput
    subscriberTopics?: SubscriberTopicsUncheckedUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscribersCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    optOut?: boolean
  }

  export type SubscribersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubscribersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
  }

  export type RolesCreateInput = {
    id?: string
    title: string
    description: string
    country: string
    language: string
    currency?: string | null
    salary?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ready?: boolean
    url?: string | null
    company: CompaniesCreateNestedOneWithoutRolesInput
    sentRoles?: SentRolesCreateNestedOneWithoutRoleInput
  }

  export type RolesUncheckedCreateInput = {
    id?: string
    companyId: string
    title: string
    description: string
    country: string
    language: string
    currency?: string | null
    salary?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sentRolesId?: string | null
    ready?: boolean
    url?: string | null
  }

  export type RolesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompaniesUpdateOneRequiredWithoutRolesNestedInput
    sentRoles?: SentRolesUpdateOneWithoutRoleNestedInput
  }

  export type RolesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentRolesId?: NullableStringFieldUpdateOperationsInput | string | null
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RolesCreateManyInput = {
    id?: string
    companyId: string
    title: string
    description: string
    country: string
    language: string
    currency?: string | null
    salary?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sentRolesId?: string | null
    ready?: boolean
    url?: string | null
  }

  export type RolesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RolesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentRolesId?: NullableStringFieldUpdateOperationsInput | string | null
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SentRolesCreateInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: RolesCreateNestedOneWithoutSentRolesInput
    subscribers?: SubscribersCreateNestedManyWithoutSentRolesInput
  }

  export type SentRolesUncheckedCreateInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: RolesUncheckedCreateNestedOneWithoutSentRolesInput
    subscribers?: SubscribersUncheckedCreateNestedManyWithoutSentRolesInput
  }

  export type SentRolesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RolesUpdateOneWithoutSentRolesNestedInput
    subscribers?: SubscribersUpdateManyWithoutSentRolesNestedInput
  }

  export type SentRolesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RolesUncheckedUpdateOneWithoutSentRolesNestedInput
    subscribers?: SubscribersUncheckedUpdateManyWithoutSentRolesNestedInput
  }

  export type SentRolesCreateManyInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SentRolesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentRolesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriberTopicsCreateInput = {
    subscriber: SubscribersCreateNestedOneWithoutSubscriberTopicsInput
    topic: TopicsCreateNestedOneWithoutSubscribersInput
  }

  export type SubscriberTopicsUncheckedCreateInput = {
    id?: number
    subscriberId: string
    topicId: number
  }

  export type SubscriberTopicsUpdateInput = {
    subscriber?: SubscribersUpdateOneRequiredWithoutSubscriberTopicsNestedInput
    topic?: TopicsUpdateOneRequiredWithoutSubscribersNestedInput
  }

  export type SubscriberTopicsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    subscriberId?: StringFieldUpdateOperationsInput | string
    topicId?: IntFieldUpdateOperationsInput | number
  }

  export type SubscriberTopicsCreateManyInput = {
    id?: number
    subscriberId: string
    topicId: number
  }

  export type SubscriberTopicsUpdateManyMutationInput = {

  }

  export type SubscriberTopicsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    subscriberId?: StringFieldUpdateOperationsInput | string
    topicId?: IntFieldUpdateOperationsInput | number
  }

  export type TopicsCreateInput = {
    name: string
    subscribers?: SubscriberTopicsCreateNestedManyWithoutTopicInput
  }

  export type TopicsUncheckedCreateInput = {
    id?: number
    name: string
    subscribers?: SubscriberTopicsUncheckedCreateNestedManyWithoutTopicInput
  }

  export type TopicsUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    subscribers?: SubscriberTopicsUpdateManyWithoutTopicNestedInput
  }

  export type TopicsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    subscribers?: SubscriberTopicsUncheckedUpdateManyWithoutTopicNestedInput
  }

  export type TopicsCreateManyInput = {
    id?: number
    name: string
  }

  export type TopicsUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TopicsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type CompaniesCreateInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RolesCreateNestedManyWithoutCompanyInput
  }

  export type CompaniesUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string
    updatedAt?: Date | string
    roles?: RolesUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompaniesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RolesUpdateManyWithoutCompanyNestedInput
  }

  export type CompaniesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    roles?: RolesUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompaniesCreateManyInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompaniesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompaniesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }
  export type JsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type EnumEnglishLevelNullableFilter<$PrismaModel = never> = {
    equals?: EnglishLevel | EnumEnglishLevelFieldRefInput<$PrismaModel> | null
    in?: EnglishLevel[] | ListEnumEnglishLevelFieldRefInput<$PrismaModel> | null
    notIn?: EnglishLevel[] | ListEnumEnglishLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEnglishLevelNullableFilter<$PrismaModel> | EnglishLevel | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SentRolesListRelationFilter = {
    every?: SentRolesWhereInput
    some?: SentRolesWhereInput
    none?: SentRolesWhereInput
  }

  export type SubscriberTopicsListRelationFilter = {
    every?: SubscriberTopicsWhereInput
    some?: SubscriberTopicsWhereInput
    none?: SubscriberTopicsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SentRolesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscriberTopicsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SubscribersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    linkedInUrl?: SortOrder
    gitHub?: SortOrder
    startedWorkingAt?: SortOrder
    skills?: SortOrder
    englishLevel?: SortOrder
    isConfirmed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    optOut?: SortOrder
  }

  export type SubscribersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    linkedInUrl?: SortOrder
    gitHub?: SortOrder
    startedWorkingAt?: SortOrder
    englishLevel?: SortOrder
    isConfirmed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    optOut?: SortOrder
  }

  export type SubscribersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    linkedInUrl?: SortOrder
    gitHub?: SortOrder
    startedWorkingAt?: SortOrder
    englishLevel?: SortOrder
    isConfirmed?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    optOut?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type EnumEnglishLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: EnglishLevel | EnumEnglishLevelFieldRefInput<$PrismaModel> | null
    in?: EnglishLevel[] | ListEnumEnglishLevelFieldRefInput<$PrismaModel> | null
    notIn?: EnglishLevel[] | ListEnumEnglishLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEnglishLevelNullableWithAggregatesFilter<$PrismaModel> | EnglishLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEnglishLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumEnglishLevelNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type CompaniesRelationFilter = {
    is?: CompaniesWhereInput
    isNot?: CompaniesWhereInput
  }

  export type SentRolesNullableRelationFilter = {
    is?: SentRolesWhereInput | null
    isNot?: SentRolesWhereInput | null
  }

  export type RolesCountOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    country?: SortOrder
    language?: SortOrder
    currency?: SortOrder
    salary?: SortOrder
    skills?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentRolesId?: SortOrder
    ready?: SortOrder
    url?: SortOrder
  }

  export type RolesMaxOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    country?: SortOrder
    language?: SortOrder
    currency?: SortOrder
    salary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentRolesId?: SortOrder
    ready?: SortOrder
    url?: SortOrder
  }

  export type RolesMinOrderByAggregateInput = {
    id?: SortOrder
    companyId?: SortOrder
    title?: SortOrder
    description?: SortOrder
    country?: SortOrder
    language?: SortOrder
    currency?: SortOrder
    salary?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    sentRolesId?: SortOrder
    ready?: SortOrder
    url?: SortOrder
  }

  export type RolesNullableRelationFilter = {
    is?: RolesWhereInput | null
    isNot?: RolesWhereInput | null
  }

  export type SubscribersListRelationFilter = {
    every?: SubscribersWhereInput
    some?: SubscribersWhereInput
    none?: SubscribersWhereInput
  }

  export type SubscribersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SentRolesCountOrderByAggregateInput = {
    id?: SortOrder
    sentAt?: SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SentRolesMaxOrderByAggregateInput = {
    id?: SortOrder
    sentAt?: SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SentRolesMinOrderByAggregateInput = {
    id?: SortOrder
    sentAt?: SortOrder
    roleId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type SubscribersRelationFilter = {
    is?: SubscribersWhereInput
    isNot?: SubscribersWhereInput
  }

  export type TopicsRelationFilter = {
    is?: TopicsWhereInput
    isNot?: TopicsWhereInput
  }

  export type SubscriberTopicsCountOrderByAggregateInput = {
    id?: SortOrder
    subscriberId?: SortOrder
    topicId?: SortOrder
  }

  export type SubscriberTopicsAvgOrderByAggregateInput = {
    id?: SortOrder
    topicId?: SortOrder
  }

  export type SubscriberTopicsMaxOrderByAggregateInput = {
    id?: SortOrder
    subscriberId?: SortOrder
    topicId?: SortOrder
  }

  export type SubscriberTopicsMinOrderByAggregateInput = {
    id?: SortOrder
    subscriberId?: SortOrder
    topicId?: SortOrder
  }

  export type SubscriberTopicsSumOrderByAggregateInput = {
    id?: SortOrder
    topicId?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type TopicsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TopicsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TopicsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TopicsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type TopicsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type RolesListRelationFilter = {
    every?: RolesWhereInput
    some?: RolesWhereInput
    none?: RolesWhereInput
  }

  export type RolesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CompaniesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompaniesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type CompaniesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SentRolesCreateNestedManyWithoutSubscribersInput = {
    create?: XOR<SentRolesCreateWithoutSubscribersInput, SentRolesUncheckedCreateWithoutSubscribersInput> | SentRolesCreateWithoutSubscribersInput[] | SentRolesUncheckedCreateWithoutSubscribersInput[]
    connectOrCreate?: SentRolesCreateOrConnectWithoutSubscribersInput | SentRolesCreateOrConnectWithoutSubscribersInput[]
    connect?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
  }

  export type SubscriberTopicsCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<SubscriberTopicsCreateWithoutSubscriberInput, SubscriberTopicsUncheckedCreateWithoutSubscriberInput> | SubscriberTopicsCreateWithoutSubscriberInput[] | SubscriberTopicsUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: SubscriberTopicsCreateOrConnectWithoutSubscriberInput | SubscriberTopicsCreateOrConnectWithoutSubscriberInput[]
    createMany?: SubscriberTopicsCreateManySubscriberInputEnvelope
    connect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
  }

  export type SentRolesUncheckedCreateNestedManyWithoutSubscribersInput = {
    create?: XOR<SentRolesCreateWithoutSubscribersInput, SentRolesUncheckedCreateWithoutSubscribersInput> | SentRolesCreateWithoutSubscribersInput[] | SentRolesUncheckedCreateWithoutSubscribersInput[]
    connectOrCreate?: SentRolesCreateOrConnectWithoutSubscribersInput | SentRolesCreateOrConnectWithoutSubscribersInput[]
    connect?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
  }

  export type SubscriberTopicsUncheckedCreateNestedManyWithoutSubscriberInput = {
    create?: XOR<SubscriberTopicsCreateWithoutSubscriberInput, SubscriberTopicsUncheckedCreateWithoutSubscriberInput> | SubscriberTopicsCreateWithoutSubscriberInput[] | SubscriberTopicsUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: SubscriberTopicsCreateOrConnectWithoutSubscriberInput | SubscriberTopicsCreateOrConnectWithoutSubscriberInput[]
    createMany?: SubscriberTopicsCreateManySubscriberInputEnvelope
    connect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableEnumEnglishLevelFieldUpdateOperationsInput = {
    set?: EnglishLevel | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SentRolesUpdateManyWithoutSubscribersNestedInput = {
    create?: XOR<SentRolesCreateWithoutSubscribersInput, SentRolesUncheckedCreateWithoutSubscribersInput> | SentRolesCreateWithoutSubscribersInput[] | SentRolesUncheckedCreateWithoutSubscribersInput[]
    connectOrCreate?: SentRolesCreateOrConnectWithoutSubscribersInput | SentRolesCreateOrConnectWithoutSubscribersInput[]
    upsert?: SentRolesUpsertWithWhereUniqueWithoutSubscribersInput | SentRolesUpsertWithWhereUniqueWithoutSubscribersInput[]
    set?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
    disconnect?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
    delete?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
    connect?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
    update?: SentRolesUpdateWithWhereUniqueWithoutSubscribersInput | SentRolesUpdateWithWhereUniqueWithoutSubscribersInput[]
    updateMany?: SentRolesUpdateManyWithWhereWithoutSubscribersInput | SentRolesUpdateManyWithWhereWithoutSubscribersInput[]
    deleteMany?: SentRolesScalarWhereInput | SentRolesScalarWhereInput[]
  }

  export type SubscriberTopicsUpdateManyWithoutSubscriberNestedInput = {
    create?: XOR<SubscriberTopicsCreateWithoutSubscriberInput, SubscriberTopicsUncheckedCreateWithoutSubscriberInput> | SubscriberTopicsCreateWithoutSubscriberInput[] | SubscriberTopicsUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: SubscriberTopicsCreateOrConnectWithoutSubscriberInput | SubscriberTopicsCreateOrConnectWithoutSubscriberInput[]
    upsert?: SubscriberTopicsUpsertWithWhereUniqueWithoutSubscriberInput | SubscriberTopicsUpsertWithWhereUniqueWithoutSubscriberInput[]
    createMany?: SubscriberTopicsCreateManySubscriberInputEnvelope
    set?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    disconnect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    delete?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    connect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    update?: SubscriberTopicsUpdateWithWhereUniqueWithoutSubscriberInput | SubscriberTopicsUpdateWithWhereUniqueWithoutSubscriberInput[]
    updateMany?: SubscriberTopicsUpdateManyWithWhereWithoutSubscriberInput | SubscriberTopicsUpdateManyWithWhereWithoutSubscriberInput[]
    deleteMany?: SubscriberTopicsScalarWhereInput | SubscriberTopicsScalarWhereInput[]
  }

  export type SentRolesUncheckedUpdateManyWithoutSubscribersNestedInput = {
    create?: XOR<SentRolesCreateWithoutSubscribersInput, SentRolesUncheckedCreateWithoutSubscribersInput> | SentRolesCreateWithoutSubscribersInput[] | SentRolesUncheckedCreateWithoutSubscribersInput[]
    connectOrCreate?: SentRolesCreateOrConnectWithoutSubscribersInput | SentRolesCreateOrConnectWithoutSubscribersInput[]
    upsert?: SentRolesUpsertWithWhereUniqueWithoutSubscribersInput | SentRolesUpsertWithWhereUniqueWithoutSubscribersInput[]
    set?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
    disconnect?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
    delete?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
    connect?: SentRolesWhereUniqueInput | SentRolesWhereUniqueInput[]
    update?: SentRolesUpdateWithWhereUniqueWithoutSubscribersInput | SentRolesUpdateWithWhereUniqueWithoutSubscribersInput[]
    updateMany?: SentRolesUpdateManyWithWhereWithoutSubscribersInput | SentRolesUpdateManyWithWhereWithoutSubscribersInput[]
    deleteMany?: SentRolesScalarWhereInput | SentRolesScalarWhereInput[]
  }

  export type SubscriberTopicsUncheckedUpdateManyWithoutSubscriberNestedInput = {
    create?: XOR<SubscriberTopicsCreateWithoutSubscriberInput, SubscriberTopicsUncheckedCreateWithoutSubscriberInput> | SubscriberTopicsCreateWithoutSubscriberInput[] | SubscriberTopicsUncheckedCreateWithoutSubscriberInput[]
    connectOrCreate?: SubscriberTopicsCreateOrConnectWithoutSubscriberInput | SubscriberTopicsCreateOrConnectWithoutSubscriberInput[]
    upsert?: SubscriberTopicsUpsertWithWhereUniqueWithoutSubscriberInput | SubscriberTopicsUpsertWithWhereUniqueWithoutSubscriberInput[]
    createMany?: SubscriberTopicsCreateManySubscriberInputEnvelope
    set?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    disconnect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    delete?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    connect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    update?: SubscriberTopicsUpdateWithWhereUniqueWithoutSubscriberInput | SubscriberTopicsUpdateWithWhereUniqueWithoutSubscriberInput[]
    updateMany?: SubscriberTopicsUpdateManyWithWhereWithoutSubscriberInput | SubscriberTopicsUpdateManyWithWhereWithoutSubscriberInput[]
    deleteMany?: SubscriberTopicsScalarWhereInput | SubscriberTopicsScalarWhereInput[]
  }

  export type CompaniesCreateNestedOneWithoutRolesInput = {
    create?: XOR<CompaniesCreateWithoutRolesInput, CompaniesUncheckedCreateWithoutRolesInput>
    connectOrCreate?: CompaniesCreateOrConnectWithoutRolesInput
    connect?: CompaniesWhereUniqueInput
  }

  export type SentRolesCreateNestedOneWithoutRoleInput = {
    create?: XOR<SentRolesCreateWithoutRoleInput, SentRolesUncheckedCreateWithoutRoleInput>
    connectOrCreate?: SentRolesCreateOrConnectWithoutRoleInput
    connect?: SentRolesWhereUniqueInput
  }

  export type CompaniesUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<CompaniesCreateWithoutRolesInput, CompaniesUncheckedCreateWithoutRolesInput>
    connectOrCreate?: CompaniesCreateOrConnectWithoutRolesInput
    upsert?: CompaniesUpsertWithoutRolesInput
    connect?: CompaniesWhereUniqueInput
    update?: XOR<XOR<CompaniesUpdateToOneWithWhereWithoutRolesInput, CompaniesUpdateWithoutRolesInput>, CompaniesUncheckedUpdateWithoutRolesInput>
  }

  export type SentRolesUpdateOneWithoutRoleNestedInput = {
    create?: XOR<SentRolesCreateWithoutRoleInput, SentRolesUncheckedCreateWithoutRoleInput>
    connectOrCreate?: SentRolesCreateOrConnectWithoutRoleInput
    upsert?: SentRolesUpsertWithoutRoleInput
    disconnect?: SentRolesWhereInput | boolean
    delete?: SentRolesWhereInput | boolean
    connect?: SentRolesWhereUniqueInput
    update?: XOR<XOR<SentRolesUpdateToOneWithWhereWithoutRoleInput, SentRolesUpdateWithoutRoleInput>, SentRolesUncheckedUpdateWithoutRoleInput>
  }

  export type RolesCreateNestedOneWithoutSentRolesInput = {
    create?: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutSentRolesInput
    connect?: RolesWhereUniqueInput
  }

  export type SubscribersCreateNestedManyWithoutSentRolesInput = {
    create?: XOR<SubscribersCreateWithoutSentRolesInput, SubscribersUncheckedCreateWithoutSentRolesInput> | SubscribersCreateWithoutSentRolesInput[] | SubscribersUncheckedCreateWithoutSentRolesInput[]
    connectOrCreate?: SubscribersCreateOrConnectWithoutSentRolesInput | SubscribersCreateOrConnectWithoutSentRolesInput[]
    connect?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
  }

  export type RolesUncheckedCreateNestedOneWithoutSentRolesInput = {
    create?: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutSentRolesInput
    connect?: RolesWhereUniqueInput
  }

  export type SubscribersUncheckedCreateNestedManyWithoutSentRolesInput = {
    create?: XOR<SubscribersCreateWithoutSentRolesInput, SubscribersUncheckedCreateWithoutSentRolesInput> | SubscribersCreateWithoutSentRolesInput[] | SubscribersUncheckedCreateWithoutSentRolesInput[]
    connectOrCreate?: SubscribersCreateOrConnectWithoutSentRolesInput | SubscribersCreateOrConnectWithoutSentRolesInput[]
    connect?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
  }

  export type RolesUpdateOneWithoutSentRolesNestedInput = {
    create?: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutSentRolesInput
    upsert?: RolesUpsertWithoutSentRolesInput
    disconnect?: RolesWhereInput | boolean
    delete?: RolesWhereInput | boolean
    connect?: RolesWhereUniqueInput
    update?: XOR<XOR<RolesUpdateToOneWithWhereWithoutSentRolesInput, RolesUpdateWithoutSentRolesInput>, RolesUncheckedUpdateWithoutSentRolesInput>
  }

  export type SubscribersUpdateManyWithoutSentRolesNestedInput = {
    create?: XOR<SubscribersCreateWithoutSentRolesInput, SubscribersUncheckedCreateWithoutSentRolesInput> | SubscribersCreateWithoutSentRolesInput[] | SubscribersUncheckedCreateWithoutSentRolesInput[]
    connectOrCreate?: SubscribersCreateOrConnectWithoutSentRolesInput | SubscribersCreateOrConnectWithoutSentRolesInput[]
    upsert?: SubscribersUpsertWithWhereUniqueWithoutSentRolesInput | SubscribersUpsertWithWhereUniqueWithoutSentRolesInput[]
    set?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
    disconnect?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
    delete?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
    connect?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
    update?: SubscribersUpdateWithWhereUniqueWithoutSentRolesInput | SubscribersUpdateWithWhereUniqueWithoutSentRolesInput[]
    updateMany?: SubscribersUpdateManyWithWhereWithoutSentRolesInput | SubscribersUpdateManyWithWhereWithoutSentRolesInput[]
    deleteMany?: SubscribersScalarWhereInput | SubscribersScalarWhereInput[]
  }

  export type RolesUncheckedUpdateOneWithoutSentRolesNestedInput = {
    create?: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutSentRolesInput
    upsert?: RolesUpsertWithoutSentRolesInput
    disconnect?: RolesWhereInput | boolean
    delete?: RolesWhereInput | boolean
    connect?: RolesWhereUniqueInput
    update?: XOR<XOR<RolesUpdateToOneWithWhereWithoutSentRolesInput, RolesUpdateWithoutSentRolesInput>, RolesUncheckedUpdateWithoutSentRolesInput>
  }

  export type SubscribersUncheckedUpdateManyWithoutSentRolesNestedInput = {
    create?: XOR<SubscribersCreateWithoutSentRolesInput, SubscribersUncheckedCreateWithoutSentRolesInput> | SubscribersCreateWithoutSentRolesInput[] | SubscribersUncheckedCreateWithoutSentRolesInput[]
    connectOrCreate?: SubscribersCreateOrConnectWithoutSentRolesInput | SubscribersCreateOrConnectWithoutSentRolesInput[]
    upsert?: SubscribersUpsertWithWhereUniqueWithoutSentRolesInput | SubscribersUpsertWithWhereUniqueWithoutSentRolesInput[]
    set?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
    disconnect?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
    delete?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
    connect?: SubscribersWhereUniqueInput | SubscribersWhereUniqueInput[]
    update?: SubscribersUpdateWithWhereUniqueWithoutSentRolesInput | SubscribersUpdateWithWhereUniqueWithoutSentRolesInput[]
    updateMany?: SubscribersUpdateManyWithWhereWithoutSentRolesInput | SubscribersUpdateManyWithWhereWithoutSentRolesInput[]
    deleteMany?: SubscribersScalarWhereInput | SubscribersScalarWhereInput[]
  }

  export type SubscribersCreateNestedOneWithoutSubscriberTopicsInput = {
    create?: XOR<SubscribersCreateWithoutSubscriberTopicsInput, SubscribersUncheckedCreateWithoutSubscriberTopicsInput>
    connectOrCreate?: SubscribersCreateOrConnectWithoutSubscriberTopicsInput
    connect?: SubscribersWhereUniqueInput
  }

  export type TopicsCreateNestedOneWithoutSubscribersInput = {
    create?: XOR<TopicsCreateWithoutSubscribersInput, TopicsUncheckedCreateWithoutSubscribersInput>
    connectOrCreate?: TopicsCreateOrConnectWithoutSubscribersInput
    connect?: TopicsWhereUniqueInput
  }

  export type SubscribersUpdateOneRequiredWithoutSubscriberTopicsNestedInput = {
    create?: XOR<SubscribersCreateWithoutSubscriberTopicsInput, SubscribersUncheckedCreateWithoutSubscriberTopicsInput>
    connectOrCreate?: SubscribersCreateOrConnectWithoutSubscriberTopicsInput
    upsert?: SubscribersUpsertWithoutSubscriberTopicsInput
    connect?: SubscribersWhereUniqueInput
    update?: XOR<XOR<SubscribersUpdateToOneWithWhereWithoutSubscriberTopicsInput, SubscribersUpdateWithoutSubscriberTopicsInput>, SubscribersUncheckedUpdateWithoutSubscriberTopicsInput>
  }

  export type TopicsUpdateOneRequiredWithoutSubscribersNestedInput = {
    create?: XOR<TopicsCreateWithoutSubscribersInput, TopicsUncheckedCreateWithoutSubscribersInput>
    connectOrCreate?: TopicsCreateOrConnectWithoutSubscribersInput
    upsert?: TopicsUpsertWithoutSubscribersInput
    connect?: TopicsWhereUniqueInput
    update?: XOR<XOR<TopicsUpdateToOneWithWhereWithoutSubscribersInput, TopicsUpdateWithoutSubscribersInput>, TopicsUncheckedUpdateWithoutSubscribersInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SubscriberTopicsCreateNestedManyWithoutTopicInput = {
    create?: XOR<SubscriberTopicsCreateWithoutTopicInput, SubscriberTopicsUncheckedCreateWithoutTopicInput> | SubscriberTopicsCreateWithoutTopicInput[] | SubscriberTopicsUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: SubscriberTopicsCreateOrConnectWithoutTopicInput | SubscriberTopicsCreateOrConnectWithoutTopicInput[]
    createMany?: SubscriberTopicsCreateManyTopicInputEnvelope
    connect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
  }

  export type SubscriberTopicsUncheckedCreateNestedManyWithoutTopicInput = {
    create?: XOR<SubscriberTopicsCreateWithoutTopicInput, SubscriberTopicsUncheckedCreateWithoutTopicInput> | SubscriberTopicsCreateWithoutTopicInput[] | SubscriberTopicsUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: SubscriberTopicsCreateOrConnectWithoutTopicInput | SubscriberTopicsCreateOrConnectWithoutTopicInput[]
    createMany?: SubscriberTopicsCreateManyTopicInputEnvelope
    connect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
  }

  export type SubscriberTopicsUpdateManyWithoutTopicNestedInput = {
    create?: XOR<SubscriberTopicsCreateWithoutTopicInput, SubscriberTopicsUncheckedCreateWithoutTopicInput> | SubscriberTopicsCreateWithoutTopicInput[] | SubscriberTopicsUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: SubscriberTopicsCreateOrConnectWithoutTopicInput | SubscriberTopicsCreateOrConnectWithoutTopicInput[]
    upsert?: SubscriberTopicsUpsertWithWhereUniqueWithoutTopicInput | SubscriberTopicsUpsertWithWhereUniqueWithoutTopicInput[]
    createMany?: SubscriberTopicsCreateManyTopicInputEnvelope
    set?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    disconnect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    delete?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    connect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    update?: SubscriberTopicsUpdateWithWhereUniqueWithoutTopicInput | SubscriberTopicsUpdateWithWhereUniqueWithoutTopicInput[]
    updateMany?: SubscriberTopicsUpdateManyWithWhereWithoutTopicInput | SubscriberTopicsUpdateManyWithWhereWithoutTopicInput[]
    deleteMany?: SubscriberTopicsScalarWhereInput | SubscriberTopicsScalarWhereInput[]
  }

  export type SubscriberTopicsUncheckedUpdateManyWithoutTopicNestedInput = {
    create?: XOR<SubscriberTopicsCreateWithoutTopicInput, SubscriberTopicsUncheckedCreateWithoutTopicInput> | SubscriberTopicsCreateWithoutTopicInput[] | SubscriberTopicsUncheckedCreateWithoutTopicInput[]
    connectOrCreate?: SubscriberTopicsCreateOrConnectWithoutTopicInput | SubscriberTopicsCreateOrConnectWithoutTopicInput[]
    upsert?: SubscriberTopicsUpsertWithWhereUniqueWithoutTopicInput | SubscriberTopicsUpsertWithWhereUniqueWithoutTopicInput[]
    createMany?: SubscriberTopicsCreateManyTopicInputEnvelope
    set?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    disconnect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    delete?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    connect?: SubscriberTopicsWhereUniqueInput | SubscriberTopicsWhereUniqueInput[]
    update?: SubscriberTopicsUpdateWithWhereUniqueWithoutTopicInput | SubscriberTopicsUpdateWithWhereUniqueWithoutTopicInput[]
    updateMany?: SubscriberTopicsUpdateManyWithWhereWithoutTopicInput | SubscriberTopicsUpdateManyWithWhereWithoutTopicInput[]
    deleteMany?: SubscriberTopicsScalarWhereInput | SubscriberTopicsScalarWhereInput[]
  }

  export type RolesCreateNestedManyWithoutCompanyInput = {
    create?: XOR<RolesCreateWithoutCompanyInput, RolesUncheckedCreateWithoutCompanyInput> | RolesCreateWithoutCompanyInput[] | RolesUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RolesCreateOrConnectWithoutCompanyInput | RolesCreateOrConnectWithoutCompanyInput[]
    createMany?: RolesCreateManyCompanyInputEnvelope
    connect?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
  }

  export type RolesUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<RolesCreateWithoutCompanyInput, RolesUncheckedCreateWithoutCompanyInput> | RolesCreateWithoutCompanyInput[] | RolesUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RolesCreateOrConnectWithoutCompanyInput | RolesCreateOrConnectWithoutCompanyInput[]
    createMany?: RolesCreateManyCompanyInputEnvelope
    connect?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
  }

  export type RolesUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<RolesCreateWithoutCompanyInput, RolesUncheckedCreateWithoutCompanyInput> | RolesCreateWithoutCompanyInput[] | RolesUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RolesCreateOrConnectWithoutCompanyInput | RolesCreateOrConnectWithoutCompanyInput[]
    upsert?: RolesUpsertWithWhereUniqueWithoutCompanyInput | RolesUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: RolesCreateManyCompanyInputEnvelope
    set?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
    disconnect?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
    delete?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
    connect?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
    update?: RolesUpdateWithWhereUniqueWithoutCompanyInput | RolesUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: RolesUpdateManyWithWhereWithoutCompanyInput | RolesUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: RolesScalarWhereInput | RolesScalarWhereInput[]
  }

  export type RolesUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<RolesCreateWithoutCompanyInput, RolesUncheckedCreateWithoutCompanyInput> | RolesCreateWithoutCompanyInput[] | RolesUncheckedCreateWithoutCompanyInput[]
    connectOrCreate?: RolesCreateOrConnectWithoutCompanyInput | RolesCreateOrConnectWithoutCompanyInput[]
    upsert?: RolesUpsertWithWhereUniqueWithoutCompanyInput | RolesUpsertWithWhereUniqueWithoutCompanyInput[]
    createMany?: RolesCreateManyCompanyInputEnvelope
    set?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
    disconnect?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
    delete?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
    connect?: RolesWhereUniqueInput | RolesWhereUniqueInput[]
    update?: RolesUpdateWithWhereUniqueWithoutCompanyInput | RolesUpdateWithWhereUniqueWithoutCompanyInput[]
    updateMany?: RolesUpdateManyWithWhereWithoutCompanyInput | RolesUpdateManyWithWhereWithoutCompanyInput[]
    deleteMany?: RolesScalarWhereInput | RolesScalarWhereInput[]
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumEnglishLevelNullableFilter<$PrismaModel = never> = {
    equals?: EnglishLevel | EnumEnglishLevelFieldRefInput<$PrismaModel> | null
    in?: EnglishLevel[] | ListEnumEnglishLevelFieldRefInput<$PrismaModel> | null
    notIn?: EnglishLevel[] | ListEnumEnglishLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEnglishLevelNullableFilter<$PrismaModel> | EnglishLevel | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumEnglishLevelNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: EnglishLevel | EnumEnglishLevelFieldRefInput<$PrismaModel> | null
    in?: EnglishLevel[] | ListEnumEnglishLevelFieldRefInput<$PrismaModel> | null
    notIn?: EnglishLevel[] | ListEnumEnglishLevelFieldRefInput<$PrismaModel> | null
    not?: NestedEnumEnglishLevelNullableWithAggregatesFilter<$PrismaModel> | EnglishLevel | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumEnglishLevelNullableFilter<$PrismaModel>
    _max?: NestedEnumEnglishLevelNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type SentRolesCreateWithoutSubscribersInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: RolesCreateNestedOneWithoutSentRolesInput
  }

  export type SentRolesUncheckedCreateWithoutSubscribersInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    role?: RolesUncheckedCreateNestedOneWithoutSentRolesInput
  }

  export type SentRolesCreateOrConnectWithoutSubscribersInput = {
    where: SentRolesWhereUniqueInput
    create: XOR<SentRolesCreateWithoutSubscribersInput, SentRolesUncheckedCreateWithoutSubscribersInput>
  }

  export type SubscriberTopicsCreateWithoutSubscriberInput = {
    topic: TopicsCreateNestedOneWithoutSubscribersInput
  }

  export type SubscriberTopicsUncheckedCreateWithoutSubscriberInput = {
    id?: number
    topicId: number
  }

  export type SubscriberTopicsCreateOrConnectWithoutSubscriberInput = {
    where: SubscriberTopicsWhereUniqueInput
    create: XOR<SubscriberTopicsCreateWithoutSubscriberInput, SubscriberTopicsUncheckedCreateWithoutSubscriberInput>
  }

  export type SubscriberTopicsCreateManySubscriberInputEnvelope = {
    data: SubscriberTopicsCreateManySubscriberInput | SubscriberTopicsCreateManySubscriberInput[]
    skipDuplicates?: boolean
  }

  export type SentRolesUpsertWithWhereUniqueWithoutSubscribersInput = {
    where: SentRolesWhereUniqueInput
    update: XOR<SentRolesUpdateWithoutSubscribersInput, SentRolesUncheckedUpdateWithoutSubscribersInput>
    create: XOR<SentRolesCreateWithoutSubscribersInput, SentRolesUncheckedCreateWithoutSubscribersInput>
  }

  export type SentRolesUpdateWithWhereUniqueWithoutSubscribersInput = {
    where: SentRolesWhereUniqueInput
    data: XOR<SentRolesUpdateWithoutSubscribersInput, SentRolesUncheckedUpdateWithoutSubscribersInput>
  }

  export type SentRolesUpdateManyWithWhereWithoutSubscribersInput = {
    where: SentRolesScalarWhereInput
    data: XOR<SentRolesUpdateManyMutationInput, SentRolesUncheckedUpdateManyWithoutSubscribersInput>
  }

  export type SentRolesScalarWhereInput = {
    AND?: SentRolesScalarWhereInput | SentRolesScalarWhereInput[]
    OR?: SentRolesScalarWhereInput[]
    NOT?: SentRolesScalarWhereInput | SentRolesScalarWhereInput[]
    id?: StringFilter<"SentRoles"> | string
    sentAt?: DateTimeNullableFilter<"SentRoles"> | Date | string | null
    roleId?: StringFilter<"SentRoles"> | string
    createdAt?: DateTimeFilter<"SentRoles"> | Date | string
    updatedAt?: DateTimeFilter<"SentRoles"> | Date | string
  }

  export type SubscriberTopicsUpsertWithWhereUniqueWithoutSubscriberInput = {
    where: SubscriberTopicsWhereUniqueInput
    update: XOR<SubscriberTopicsUpdateWithoutSubscriberInput, SubscriberTopicsUncheckedUpdateWithoutSubscriberInput>
    create: XOR<SubscriberTopicsCreateWithoutSubscriberInput, SubscriberTopicsUncheckedCreateWithoutSubscriberInput>
  }

  export type SubscriberTopicsUpdateWithWhereUniqueWithoutSubscriberInput = {
    where: SubscriberTopicsWhereUniqueInput
    data: XOR<SubscriberTopicsUpdateWithoutSubscriberInput, SubscriberTopicsUncheckedUpdateWithoutSubscriberInput>
  }

  export type SubscriberTopicsUpdateManyWithWhereWithoutSubscriberInput = {
    where: SubscriberTopicsScalarWhereInput
    data: XOR<SubscriberTopicsUpdateManyMutationInput, SubscriberTopicsUncheckedUpdateManyWithoutSubscriberInput>
  }

  export type SubscriberTopicsScalarWhereInput = {
    AND?: SubscriberTopicsScalarWhereInput | SubscriberTopicsScalarWhereInput[]
    OR?: SubscriberTopicsScalarWhereInput[]
    NOT?: SubscriberTopicsScalarWhereInput | SubscriberTopicsScalarWhereInput[]
    id?: IntFilter<"SubscriberTopics"> | number
    subscriberId?: UuidFilter<"SubscriberTopics"> | string
    topicId?: IntFilter<"SubscriberTopics"> | number
  }

  export type CompaniesCreateWithoutRolesInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompaniesUncheckedCreateWithoutRolesInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type CompaniesCreateOrConnectWithoutRolesInput = {
    where: CompaniesWhereUniqueInput
    create: XOR<CompaniesCreateWithoutRolesInput, CompaniesUncheckedCreateWithoutRolesInput>
  }

  export type SentRolesCreateWithoutRoleInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribers?: SubscribersCreateNestedManyWithoutSentRolesInput
  }

  export type SentRolesUncheckedCreateWithoutRoleInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    subscribers?: SubscribersUncheckedCreateNestedManyWithoutSentRolesInput
  }

  export type SentRolesCreateOrConnectWithoutRoleInput = {
    where: SentRolesWhereUniqueInput
    create: XOR<SentRolesCreateWithoutRoleInput, SentRolesUncheckedCreateWithoutRoleInput>
  }

  export type CompaniesUpsertWithoutRolesInput = {
    update: XOR<CompaniesUpdateWithoutRolesInput, CompaniesUncheckedUpdateWithoutRolesInput>
    create: XOR<CompaniesCreateWithoutRolesInput, CompaniesUncheckedCreateWithoutRolesInput>
    where?: CompaniesWhereInput
  }

  export type CompaniesUpdateToOneWithWhereWithoutRolesInput = {
    where?: CompaniesWhereInput
    data: XOR<CompaniesUpdateWithoutRolesInput, CompaniesUncheckedUpdateWithoutRolesInput>
  }

  export type CompaniesUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CompaniesUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SentRolesUpsertWithoutRoleInput = {
    update: XOR<SentRolesUpdateWithoutRoleInput, SentRolesUncheckedUpdateWithoutRoleInput>
    create: XOR<SentRolesCreateWithoutRoleInput, SentRolesUncheckedCreateWithoutRoleInput>
    where?: SentRolesWhereInput
  }

  export type SentRolesUpdateToOneWithWhereWithoutRoleInput = {
    where?: SentRolesWhereInput
    data: XOR<SentRolesUpdateWithoutRoleInput, SentRolesUncheckedUpdateWithoutRoleInput>
  }

  export type SentRolesUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribers?: SubscribersUpdateManyWithoutSentRolesNestedInput
  }

  export type SentRolesUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    subscribers?: SubscribersUncheckedUpdateManyWithoutSentRolesNestedInput
  }

  export type RolesCreateWithoutSentRolesInput = {
    id?: string
    title: string
    description: string
    country: string
    language: string
    currency?: string | null
    salary?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ready?: boolean
    url?: string | null
    company: CompaniesCreateNestedOneWithoutRolesInput
  }

  export type RolesUncheckedCreateWithoutSentRolesInput = {
    id?: string
    companyId: string
    title: string
    description: string
    country: string
    language: string
    currency?: string | null
    salary?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ready?: boolean
    url?: string | null
  }

  export type RolesCreateOrConnectWithoutSentRolesInput = {
    where: RolesWhereUniqueInput
    create: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
  }

  export type SubscribersCreateWithoutSentRolesInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    optOut?: boolean
    subscriberTopics?: SubscriberTopicsCreateNestedManyWithoutSubscriberInput
  }

  export type SubscribersUncheckedCreateWithoutSentRolesInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    optOut?: boolean
    subscriberTopics?: SubscriberTopicsUncheckedCreateNestedManyWithoutSubscriberInput
  }

  export type SubscribersCreateOrConnectWithoutSentRolesInput = {
    where: SubscribersWhereUniqueInput
    create: XOR<SubscribersCreateWithoutSentRolesInput, SubscribersUncheckedCreateWithoutSentRolesInput>
  }

  export type RolesUpsertWithoutSentRolesInput = {
    update: XOR<RolesUpdateWithoutSentRolesInput, RolesUncheckedUpdateWithoutSentRolesInput>
    create: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    where?: RolesWhereInput
  }

  export type RolesUpdateToOneWithWhereWithoutSentRolesInput = {
    where?: RolesWhereInput
    data: XOR<RolesUpdateWithoutSentRolesInput, RolesUncheckedUpdateWithoutSentRolesInput>
  }

  export type RolesUpdateWithoutSentRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
    company?: CompaniesUpdateOneRequiredWithoutRolesNestedInput
  }

  export type RolesUncheckedUpdateWithoutSentRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    companyId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SubscribersUpsertWithWhereUniqueWithoutSentRolesInput = {
    where: SubscribersWhereUniqueInput
    update: XOR<SubscribersUpdateWithoutSentRolesInput, SubscribersUncheckedUpdateWithoutSentRolesInput>
    create: XOR<SubscribersCreateWithoutSentRolesInput, SubscribersUncheckedCreateWithoutSentRolesInput>
  }

  export type SubscribersUpdateWithWhereUniqueWithoutSentRolesInput = {
    where: SubscribersWhereUniqueInput
    data: XOR<SubscribersUpdateWithoutSentRolesInput, SubscribersUncheckedUpdateWithoutSentRolesInput>
  }

  export type SubscribersUpdateManyWithWhereWithoutSentRolesInput = {
    where: SubscribersScalarWhereInput
    data: XOR<SubscribersUpdateManyMutationInput, SubscribersUncheckedUpdateManyWithoutSentRolesInput>
  }

  export type SubscribersScalarWhereInput = {
    AND?: SubscribersScalarWhereInput | SubscribersScalarWhereInput[]
    OR?: SubscribersScalarWhereInput[]
    NOT?: SubscribersScalarWhereInput | SubscribersScalarWhereInput[]
    id?: UuidFilter<"Subscribers"> | string
    email?: StringFilter<"Subscribers"> | string
    name?: StringNullableFilter<"Subscribers"> | string | null
    linkedInUrl?: StringNullableFilter<"Subscribers"> | string | null
    gitHub?: StringNullableFilter<"Subscribers"> | string | null
    startedWorkingAt?: DateTimeNullableFilter<"Subscribers"> | Date | string | null
    skills?: JsonNullableFilter<"Subscribers">
    englishLevel?: EnumEnglishLevelNullableFilter<"Subscribers"> | EnglishLevel | null
    isConfirmed?: BoolFilter<"Subscribers"> | boolean
    createdAt?: DateTimeFilter<"Subscribers"> | Date | string
    updatedAt?: DateTimeNullableFilter<"Subscribers"> | Date | string | null
    optOut?: BoolFilter<"Subscribers"> | boolean
  }

  export type SubscribersCreateWithoutSubscriberTopicsInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    optOut?: boolean
    sentRoles?: SentRolesCreateNestedManyWithoutSubscribersInput
  }

  export type SubscribersUncheckedCreateWithoutSubscriberTopicsInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string | null
    optOut?: boolean
    sentRoles?: SentRolesUncheckedCreateNestedManyWithoutSubscribersInput
  }

  export type SubscribersCreateOrConnectWithoutSubscriberTopicsInput = {
    where: SubscribersWhereUniqueInput
    create: XOR<SubscribersCreateWithoutSubscriberTopicsInput, SubscribersUncheckedCreateWithoutSubscriberTopicsInput>
  }

  export type TopicsCreateWithoutSubscribersInput = {
    name: string
  }

  export type TopicsUncheckedCreateWithoutSubscribersInput = {
    id?: number
    name: string
  }

  export type TopicsCreateOrConnectWithoutSubscribersInput = {
    where: TopicsWhereUniqueInput
    create: XOR<TopicsCreateWithoutSubscribersInput, TopicsUncheckedCreateWithoutSubscribersInput>
  }

  export type SubscribersUpsertWithoutSubscriberTopicsInput = {
    update: XOR<SubscribersUpdateWithoutSubscriberTopicsInput, SubscribersUncheckedUpdateWithoutSubscriberTopicsInput>
    create: XOR<SubscribersCreateWithoutSubscriberTopicsInput, SubscribersUncheckedCreateWithoutSubscriberTopicsInput>
    where?: SubscribersWhereInput
  }

  export type SubscribersUpdateToOneWithWhereWithoutSubscriberTopicsInput = {
    where?: SubscribersWhereInput
    data: XOR<SubscribersUpdateWithoutSubscriberTopicsInput, SubscribersUncheckedUpdateWithoutSubscriberTopicsInput>
  }

  export type SubscribersUpdateWithoutSubscriberTopicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
    sentRoles?: SentRolesUpdateManyWithoutSubscribersNestedInput
  }

  export type SubscribersUncheckedUpdateWithoutSubscriberTopicsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
    sentRoles?: SentRolesUncheckedUpdateManyWithoutSubscribersNestedInput
  }

  export type TopicsUpsertWithoutSubscribersInput = {
    update: XOR<TopicsUpdateWithoutSubscribersInput, TopicsUncheckedUpdateWithoutSubscribersInput>
    create: XOR<TopicsCreateWithoutSubscribersInput, TopicsUncheckedCreateWithoutSubscribersInput>
    where?: TopicsWhereInput
  }

  export type TopicsUpdateToOneWithWhereWithoutSubscribersInput = {
    where?: TopicsWhereInput
    data: XOR<TopicsUpdateWithoutSubscribersInput, TopicsUncheckedUpdateWithoutSubscribersInput>
  }

  export type TopicsUpdateWithoutSubscribersInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TopicsUncheckedUpdateWithoutSubscribersInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberTopicsCreateWithoutTopicInput = {
    subscriber: SubscribersCreateNestedOneWithoutSubscriberTopicsInput
  }

  export type SubscriberTopicsUncheckedCreateWithoutTopicInput = {
    id?: number
    subscriberId: string
  }

  export type SubscriberTopicsCreateOrConnectWithoutTopicInput = {
    where: SubscriberTopicsWhereUniqueInput
    create: XOR<SubscriberTopicsCreateWithoutTopicInput, SubscriberTopicsUncheckedCreateWithoutTopicInput>
  }

  export type SubscriberTopicsCreateManyTopicInputEnvelope = {
    data: SubscriberTopicsCreateManyTopicInput | SubscriberTopicsCreateManyTopicInput[]
    skipDuplicates?: boolean
  }

  export type SubscriberTopicsUpsertWithWhereUniqueWithoutTopicInput = {
    where: SubscriberTopicsWhereUniqueInput
    update: XOR<SubscriberTopicsUpdateWithoutTopicInput, SubscriberTopicsUncheckedUpdateWithoutTopicInput>
    create: XOR<SubscriberTopicsCreateWithoutTopicInput, SubscriberTopicsUncheckedCreateWithoutTopicInput>
  }

  export type SubscriberTopicsUpdateWithWhereUniqueWithoutTopicInput = {
    where: SubscriberTopicsWhereUniqueInput
    data: XOR<SubscriberTopicsUpdateWithoutTopicInput, SubscriberTopicsUncheckedUpdateWithoutTopicInput>
  }

  export type SubscriberTopicsUpdateManyWithWhereWithoutTopicInput = {
    where: SubscriberTopicsScalarWhereInput
    data: XOR<SubscriberTopicsUpdateManyMutationInput, SubscriberTopicsUncheckedUpdateManyWithoutTopicInput>
  }

  export type RolesCreateWithoutCompanyInput = {
    id?: string
    title: string
    description: string
    country: string
    language: string
    currency?: string | null
    salary?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    ready?: boolean
    url?: string | null
    sentRoles?: SentRolesCreateNestedOneWithoutRoleInput
  }

  export type RolesUncheckedCreateWithoutCompanyInput = {
    id?: string
    title: string
    description: string
    country: string
    language: string
    currency?: string | null
    salary?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sentRolesId?: string | null
    ready?: boolean
    url?: string | null
  }

  export type RolesCreateOrConnectWithoutCompanyInput = {
    where: RolesWhereUniqueInput
    create: XOR<RolesCreateWithoutCompanyInput, RolesUncheckedCreateWithoutCompanyInput>
  }

  export type RolesCreateManyCompanyInputEnvelope = {
    data: RolesCreateManyCompanyInput | RolesCreateManyCompanyInput[]
    skipDuplicates?: boolean
  }

  export type RolesUpsertWithWhereUniqueWithoutCompanyInput = {
    where: RolesWhereUniqueInput
    update: XOR<RolesUpdateWithoutCompanyInput, RolesUncheckedUpdateWithoutCompanyInput>
    create: XOR<RolesCreateWithoutCompanyInput, RolesUncheckedCreateWithoutCompanyInput>
  }

  export type RolesUpdateWithWhereUniqueWithoutCompanyInput = {
    where: RolesWhereUniqueInput
    data: XOR<RolesUpdateWithoutCompanyInput, RolesUncheckedUpdateWithoutCompanyInput>
  }

  export type RolesUpdateManyWithWhereWithoutCompanyInput = {
    where: RolesScalarWhereInput
    data: XOR<RolesUpdateManyMutationInput, RolesUncheckedUpdateManyWithoutCompanyInput>
  }

  export type RolesScalarWhereInput = {
    AND?: RolesScalarWhereInput | RolesScalarWhereInput[]
    OR?: RolesScalarWhereInput[]
    NOT?: RolesScalarWhereInput | RolesScalarWhereInput[]
    id?: StringFilter<"Roles"> | string
    companyId?: StringFilter<"Roles"> | string
    title?: StringFilter<"Roles"> | string
    description?: StringFilter<"Roles"> | string
    country?: StringFilter<"Roles"> | string
    language?: StringFilter<"Roles"> | string
    currency?: StringNullableFilter<"Roles"> | string | null
    salary?: StringNullableFilter<"Roles"> | string | null
    skills?: JsonNullableFilter<"Roles">
    createdAt?: DateTimeFilter<"Roles"> | Date | string
    updatedAt?: DateTimeFilter<"Roles"> | Date | string
    sentRolesId?: StringNullableFilter<"Roles"> | string | null
    ready?: BoolFilter<"Roles"> | boolean
    url?: StringNullableFilter<"Roles"> | string | null
  }

  export type SubscriberTopicsCreateManySubscriberInput = {
    id?: number
    topicId: number
  }

  export type SentRolesUpdateWithoutSubscribersInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RolesUpdateOneWithoutSentRolesNestedInput
  }

  export type SentRolesUncheckedUpdateWithoutSubscribersInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: RolesUncheckedUpdateOneWithoutSentRolesNestedInput
  }

  export type SentRolesUncheckedUpdateManyWithoutSubscribersInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SubscriberTopicsUpdateWithoutSubscriberInput = {
    topic?: TopicsUpdateOneRequiredWithoutSubscribersNestedInput
  }

  export type SubscriberTopicsUncheckedUpdateWithoutSubscriberInput = {
    id?: IntFieldUpdateOperationsInput | number
    topicId?: IntFieldUpdateOperationsInput | number
  }

  export type SubscriberTopicsUncheckedUpdateManyWithoutSubscriberInput = {
    id?: IntFieldUpdateOperationsInput | number
    topicId?: IntFieldUpdateOperationsInput | number
  }

  export type SubscribersUpdateWithoutSentRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
    subscriberTopics?: SubscriberTopicsUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscribersUncheckedUpdateWithoutSentRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
    subscriberTopics?: SubscriberTopicsUncheckedUpdateManyWithoutSubscriberNestedInput
  }

  export type SubscribersUncheckedUpdateManyWithoutSentRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    optOut?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubscriberTopicsCreateManyTopicInput = {
    id?: number
    subscriberId: string
  }

  export type SubscriberTopicsUpdateWithoutTopicInput = {
    subscriber?: SubscribersUpdateOneRequiredWithoutSubscriberTopicsNestedInput
  }

  export type SubscriberTopicsUncheckedUpdateWithoutTopicInput = {
    id?: IntFieldUpdateOperationsInput | number
    subscriberId?: StringFieldUpdateOperationsInput | string
  }

  export type SubscriberTopicsUncheckedUpdateManyWithoutTopicInput = {
    id?: IntFieldUpdateOperationsInput | number
    subscriberId?: StringFieldUpdateOperationsInput | string
  }

  export type RolesCreateManyCompanyInput = {
    id?: string
    title: string
    description: string
    country: string
    language: string
    currency?: string | null
    salary?: string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    sentRolesId?: string | null
    ready?: boolean
    url?: string | null
  }

  export type RolesUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
    sentRoles?: SentRolesUpdateOneWithoutRoleNestedInput
  }

  export type RolesUncheckedUpdateWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentRolesId?: NullableStringFieldUpdateOperationsInput | string | null
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RolesUncheckedUpdateManyWithoutCompanyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sentRolesId?: NullableStringFieldUpdateOperationsInput | string | null
    ready?: BoolFieldUpdateOperationsInput | boolean
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}