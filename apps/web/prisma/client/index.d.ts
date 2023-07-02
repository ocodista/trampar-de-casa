
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
  objects: {
    sentRoles: SentRolesPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    email: string
    name: string | null
    linkedInUrl: string | null
    gitHub: string | null
    startedWorkingAt: number | null
    skills: Prisma.JsonValue | null
    englishLevel: EnglishLevel | null
    isConfirmed: boolean
    createdAt: Date
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
    createdAt: Date | null
    sentRolesId: string | null
  }, ExtArgs["result"]["roles"]>
  composites: {}
}

/**
 * Model Roles
 * 
 */
export type Roles = runtime.Types.DefaultSelection<RolesPayload>
export type SentRolesPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {
    role: RolesPayload<ExtArgs> | null
    subscribers: SubscribersPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    sentAt: Date | null
    roleId: string
  }, ExtArgs["result"]["sentRoles"]>
  composites: {}
}

/**
 * Model SentRoles
 * 
 */
export type SentRoles = runtime.Types.DefaultSelection<SentRolesPayload>
export type CompaniesPayload<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
  objects: {
    roles: RolesPayload<ExtArgs>[]
  }
  scalars: $Extensions.GetResult<{
    id: string
    name: string
    url: string
    logoUrl: string | null
    countryIcon: string
    createdAt: Date | null
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
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false,
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
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

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
  get subscribers(): Prisma.SubscribersDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.roles`: Exposes CRUD operations for the **Roles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Roles
    * const roles = await prisma.roles.findMany()
    * ```
    */
  get roles(): Prisma.RolesDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.sentRoles`: Exposes CRUD operations for the **SentRoles** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SentRoles
    * const sentRoles = await prisma.sentRoles.findMany()
    * ```
    */
  get sentRoles(): Prisma.SentRolesDelegate<GlobalReject, ExtArgs>;

  /**
   * `prisma.companies`: Exposes CRUD operations for the **Companies** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Companies
    * const companies = await prisma.companies.findMany()
    * ```
    */
  get companies(): Prisma.CompaniesDelegate<GlobalReject, ExtArgs>;
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
   * Prisma Client JS version: 4.16.1
   * Query Engine version: b20ead4d3ab9e78ac112966e242ded703f4a052c
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
  export type JsonArray = Array<JsonValue>

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
  export type InputJsonArray = ReadonlyArray<InputJsonValue | null>

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
  : T extends bigint
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
    strict extends boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends boolean = 1
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
  export type At<O extends object, K extends Key, strict extends boolean = 1> = {
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

  export type Not<B extends boolean> = {
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

  export type Or<B1 extends boolean, B2 extends boolean> = {
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
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

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
      modelProps: 'subscribers' | 'roles' | 'sentRoles' | 'companies'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      Subscribers: {
        operations: {
          findUnique: {
            args: Prisma.SubscribersFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload> | null
            payload: SubscribersPayload<ExtArgs>
          }
          findUniqueOrThrow: {
            args: Prisma.SubscribersFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
            payload: SubscribersPayload<ExtArgs>
          }
          findFirst: {
            args: Prisma.SubscribersFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload> | null
            payload: SubscribersPayload<ExtArgs>
          }
          findFirstOrThrow: {
            args: Prisma.SubscribersFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
            payload: SubscribersPayload<ExtArgs>
          }
          findMany: {
            args: Prisma.SubscribersFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>[]
            payload: SubscribersPayload<ExtArgs>
          }
          create: {
            args: Prisma.SubscribersCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
            payload: SubscribersPayload<ExtArgs>
          }
          createMany: {
            args: Prisma.SubscribersCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: SubscribersPayload<ExtArgs>
          }
          delete: {
            args: Prisma.SubscribersDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
            payload: SubscribersPayload<ExtArgs>
          }
          update: {
            args: Prisma.SubscribersUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
            payload: SubscribersPayload<ExtArgs>
          }
          deleteMany: {
            args: Prisma.SubscribersDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: SubscribersPayload<ExtArgs>
          }
          updateMany: {
            args: Prisma.SubscribersUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: SubscribersPayload<ExtArgs>
          }
          upsert: {
            args: Prisma.SubscribersUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SubscribersPayload>
            payload: SubscribersPayload<ExtArgs>
          }
          aggregate: {
            args: Prisma.SubscribersAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSubscribers>
            payload: SubscribersPayload<ExtArgs>
          }
          groupBy: {
            args: Prisma.SubscribersGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SubscribersGroupByOutputType>[]
            payload: SubscribersPayload<ExtArgs>
          }
          count: {
            args: Prisma.SubscribersCountArgs<ExtArgs>,
            result: $Utils.Optional<SubscribersCountAggregateOutputType> | number
            payload: SubscribersPayload<ExtArgs>
          }
        }
      }
      Roles: {
        operations: {
          findUnique: {
            args: Prisma.RolesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload> | null
            payload: RolesPayload<ExtArgs>
          }
          findUniqueOrThrow: {
            args: Prisma.RolesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
            payload: RolesPayload<ExtArgs>
          }
          findFirst: {
            args: Prisma.RolesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload> | null
            payload: RolesPayload<ExtArgs>
          }
          findFirstOrThrow: {
            args: Prisma.RolesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
            payload: RolesPayload<ExtArgs>
          }
          findMany: {
            args: Prisma.RolesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>[]
            payload: RolesPayload<ExtArgs>
          }
          create: {
            args: Prisma.RolesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
            payload: RolesPayload<ExtArgs>
          }
          createMany: {
            args: Prisma.RolesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: RolesPayload<ExtArgs>
          }
          delete: {
            args: Prisma.RolesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
            payload: RolesPayload<ExtArgs>
          }
          update: {
            args: Prisma.RolesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
            payload: RolesPayload<ExtArgs>
          }
          deleteMany: {
            args: Prisma.RolesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: RolesPayload<ExtArgs>
          }
          updateMany: {
            args: Prisma.RolesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: RolesPayload<ExtArgs>
          }
          upsert: {
            args: Prisma.RolesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<RolesPayload>
            payload: RolesPayload<ExtArgs>
          }
          aggregate: {
            args: Prisma.RolesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRoles>
            payload: RolesPayload<ExtArgs>
          }
          groupBy: {
            args: Prisma.RolesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RolesGroupByOutputType>[]
            payload: RolesPayload<ExtArgs>
          }
          count: {
            args: Prisma.RolesCountArgs<ExtArgs>,
            result: $Utils.Optional<RolesCountAggregateOutputType> | number
            payload: RolesPayload<ExtArgs>
          }
        }
      }
      SentRoles: {
        operations: {
          findUnique: {
            args: Prisma.SentRolesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload> | null
            payload: SentRolesPayload<ExtArgs>
          }
          findUniqueOrThrow: {
            args: Prisma.SentRolesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
            payload: SentRolesPayload<ExtArgs>
          }
          findFirst: {
            args: Prisma.SentRolesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload> | null
            payload: SentRolesPayload<ExtArgs>
          }
          findFirstOrThrow: {
            args: Prisma.SentRolesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
            payload: SentRolesPayload<ExtArgs>
          }
          findMany: {
            args: Prisma.SentRolesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>[]
            payload: SentRolesPayload<ExtArgs>
          }
          create: {
            args: Prisma.SentRolesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
            payload: SentRolesPayload<ExtArgs>
          }
          createMany: {
            args: Prisma.SentRolesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: SentRolesPayload<ExtArgs>
          }
          delete: {
            args: Prisma.SentRolesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
            payload: SentRolesPayload<ExtArgs>
          }
          update: {
            args: Prisma.SentRolesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
            payload: SentRolesPayload<ExtArgs>
          }
          deleteMany: {
            args: Prisma.SentRolesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: SentRolesPayload<ExtArgs>
          }
          updateMany: {
            args: Prisma.SentRolesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: SentRolesPayload<ExtArgs>
          }
          upsert: {
            args: Prisma.SentRolesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<SentRolesPayload>
            payload: SentRolesPayload<ExtArgs>
          }
          aggregate: {
            args: Prisma.SentRolesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateSentRoles>
            payload: SentRolesPayload<ExtArgs>
          }
          groupBy: {
            args: Prisma.SentRolesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<SentRolesGroupByOutputType>[]
            payload: SentRolesPayload<ExtArgs>
          }
          count: {
            args: Prisma.SentRolesCountArgs<ExtArgs>,
            result: $Utils.Optional<SentRolesCountAggregateOutputType> | number
            payload: SentRolesPayload<ExtArgs>
          }
        }
      }
      Companies: {
        operations: {
          findUnique: {
            args: Prisma.CompaniesFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload> | null
            payload: CompaniesPayload<ExtArgs>
          }
          findUniqueOrThrow: {
            args: Prisma.CompaniesFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
            payload: CompaniesPayload<ExtArgs>
          }
          findFirst: {
            args: Prisma.CompaniesFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload> | null
            payload: CompaniesPayload<ExtArgs>
          }
          findFirstOrThrow: {
            args: Prisma.CompaniesFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
            payload: CompaniesPayload<ExtArgs>
          }
          findMany: {
            args: Prisma.CompaniesFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>[]
            payload: CompaniesPayload<ExtArgs>
          }
          create: {
            args: Prisma.CompaniesCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
            payload: CompaniesPayload<ExtArgs>
          }
          createMany: {
            args: Prisma.CompaniesCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: CompaniesPayload<ExtArgs>
          }
          delete: {
            args: Prisma.CompaniesDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
            payload: CompaniesPayload<ExtArgs>
          }
          update: {
            args: Prisma.CompaniesUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
            payload: CompaniesPayload<ExtArgs>
          }
          deleteMany: {
            args: Prisma.CompaniesDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: CompaniesPayload<ExtArgs>
          }
          updateMany: {
            args: Prisma.CompaniesUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
            payload: CompaniesPayload<ExtArgs>
          }
          upsert: {
            args: Prisma.CompaniesUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<CompaniesPayload>
            payload: CompaniesPayload<ExtArgs>
          }
          aggregate: {
            args: Prisma.CompaniesAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateCompanies>
            payload: CompaniesPayload<ExtArgs>
          }
          groupBy: {
            args: Prisma.CompaniesGroupByArgs<ExtArgs>,
            result: $Utils.Optional<CompaniesGroupByOutputType>[]
            payload: CompaniesPayload<ExtArgs>
          }
          count: {
            args: Prisma.CompaniesCountArgs<ExtArgs>,
            result: $Utils.Optional<CompaniesCountAggregateOutputType> | number
            payload: CompaniesPayload<ExtArgs>
          }
        }
      }
    }
  } & {
    other: {
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
          payload: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
          payload: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
          payload: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
          payload: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
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
  }

  export type SubscribersCountOutputTypeSelect<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    sentRoles?: boolean | SubscribersCountOutputTypeCountSentRolesArgs
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
    _avg: SubscribersAvgAggregateOutputType | null
    _sum: SubscribersSumAggregateOutputType | null
    _min: SubscribersMinAggregateOutputType | null
    _max: SubscribersMaxAggregateOutputType | null
  }

  export type SubscribersAvgAggregateOutputType = {
    startedWorkingAt: number | null
  }

  export type SubscribersSumAggregateOutputType = {
    startedWorkingAt: number | null
  }

  export type SubscribersMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    linkedInUrl: string | null
    gitHub: string | null
    startedWorkingAt: number | null
    englishLevel: EnglishLevel | null
    isConfirmed: boolean | null
    createdAt: Date | null
    optOut: boolean | null
  }

  export type SubscribersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    linkedInUrl: string | null
    gitHub: string | null
    startedWorkingAt: number | null
    englishLevel: EnglishLevel | null
    isConfirmed: boolean | null
    createdAt: Date | null
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
    optOut: number
    _all: number
  }


  export type SubscribersAvgAggregateInputType = {
    startedWorkingAt?: true
  }

  export type SubscribersSumAggregateInputType = {
    startedWorkingAt?: true
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
    orderBy?: Enumerable<SubscribersOrderByWithRelationInput>
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
     * Select which fields to average
    **/
    _avg?: SubscribersAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SubscribersSumAggregateInputType
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
    orderBy?: Enumerable<SubscribersOrderByWithAggregationInput>
    by: SubscribersScalarFieldEnum[]
    having?: SubscribersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SubscribersCountAggregateInputType | true
    _avg?: SubscribersAvgAggregateInputType
    _sum?: SubscribersSumAggregateInputType
    _min?: SubscribersMinAggregateInputType
    _max?: SubscribersMaxAggregateInputType
  }


  export type SubscribersGroupByOutputType = {
    id: string
    email: string
    name: string | null
    linkedInUrl: string | null
    gitHub: string | null
    startedWorkingAt: number | null
    skills: JsonValue | null
    englishLevel: EnglishLevel | null
    isConfirmed: boolean
    createdAt: Date
    optOut: boolean
    _count: SubscribersCountAggregateOutputType | null
    _avg: SubscribersAvgAggregateOutputType | null
    _sum: SubscribersSumAggregateOutputType | null
    _min: SubscribersMinAggregateOutputType | null
    _max: SubscribersMaxAggregateOutputType | null
  }

  type GetSubscribersGroupByPayload<T extends SubscribersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<SubscribersGroupByOutputType, T['by']> &
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
    optOut?: boolean
    sentRoles?: boolean | Subscribers$sentRolesArgs<ExtArgs>
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
    optOut?: boolean
  }

  export type SubscribersInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    sentRoles?: boolean | Subscribers$sentRolesArgs<ExtArgs>
    _count?: boolean | SubscribersCountOutputTypeArgs<ExtArgs>
  }


  type SubscribersGetPayload<S extends boolean | null | undefined | SubscribersArgs> = $Types.GetResult<SubscribersPayload, S>

  type SubscribersCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<SubscribersFindManyArgs, 'select' | 'include'> & {
      select?: SubscribersCountAggregateInputType | true
    }

  export interface SubscribersDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    findUnique<T extends SubscribersFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SubscribersFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Subscribers'> extends True ? Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

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
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    findFirst<T extends SubscribersFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SubscribersFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Subscribers'> extends True ? Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Subscribers that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findMany', never>>

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
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

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
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    ): Prisma__SubscribersClient<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
      ByFields extends TupleToUnion<T['by']>,
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

    sentRoles<T extends Subscribers$sentRolesArgs<ExtArgs> = {}>(args?: Subset<T, Subscribers$sentRolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findMany', never>| Null>;

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



  // Custom InputTypes

  /**
   * Subscribers base type for findUnique actions
   */
  export type SubscribersFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
   * Subscribers findUnique
   */
  export interface SubscribersFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends SubscribersFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
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
   * Subscribers base type for findFirst actions
   */
  export type SubscribersFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
    orderBy?: Enumerable<SubscribersOrderByWithRelationInput>
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
    distinct?: Enumerable<SubscribersScalarFieldEnum>
  }

  /**
   * Subscribers findFirst
   */
  export interface SubscribersFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends SubscribersFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
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
    orderBy?: Enumerable<SubscribersOrderByWithRelationInput>
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
    distinct?: Enumerable<SubscribersScalarFieldEnum>
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
    orderBy?: Enumerable<SubscribersOrderByWithRelationInput>
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
    distinct?: Enumerable<SubscribersScalarFieldEnum>
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
    data: Enumerable<SubscribersCreateManyInput>
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
    orderBy?: Enumerable<SentRolesOrderByWithRelationInput>
    cursor?: SentRolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<SentRolesScalarFieldEnum>
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
    sentRolesId: string | null
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
    sentRolesId: string | null
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
    sentRolesId: number
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
    sentRolesId?: true
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
    sentRolesId?: true
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
    sentRolesId?: true
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
    orderBy?: Enumerable<RolesOrderByWithRelationInput>
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
    orderBy?: Enumerable<RolesOrderByWithAggregationInput>
    by: RolesScalarFieldEnum[]
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
    createdAt: Date | null
    sentRolesId: string | null
    _count: RolesCountAggregateOutputType | null
    _min: RolesMinAggregateOutputType | null
    _max: RolesMaxAggregateOutputType | null
  }

  type GetRolesGroupByPayload<T extends RolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<RolesGroupByOutputType, T['by']> &
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
    sentRolesId?: boolean
    company?: boolean | CompaniesArgs<ExtArgs>
    sentRoles?: boolean | SentRolesArgs<ExtArgs>
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
    sentRolesId?: boolean
  }

  export type RolesInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    company?: boolean | CompaniesArgs<ExtArgs>
    sentRoles?: boolean | SentRolesArgs<ExtArgs>
  }


  type RolesGetPayload<S extends boolean | null | undefined | RolesArgs> = $Types.GetResult<RolesPayload, S>

  type RolesCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<RolesFindManyArgs, 'select' | 'include'> & {
      select?: RolesCountAggregateInputType | true
    }

  export interface RolesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    findUnique<T extends RolesFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, RolesFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Roles'> extends True ? Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

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
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    findFirst<T extends RolesFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, RolesFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Roles'> extends True ? Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Roles that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findMany', never>>

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
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

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
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    ): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
      ByFields extends TupleToUnion<T['by']>,
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

    company<T extends CompaniesArgs<ExtArgs> = {}>(args?: Subset<T, CompaniesArgs<ExtArgs>>): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    sentRoles<T extends SentRolesArgs<ExtArgs> = {}>(args?: Subset<T, SentRolesArgs<ExtArgs>>): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

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



  // Custom InputTypes

  /**
   * Roles base type for findUnique actions
   */
  export type RolesFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
   * Roles findUnique
   */
  export interface RolesFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends RolesFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
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
   * Roles base type for findFirst actions
   */
  export type RolesFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
    orderBy?: Enumerable<RolesOrderByWithRelationInput>
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
    distinct?: Enumerable<RolesScalarFieldEnum>
  }

  /**
   * Roles findFirst
   */
  export interface RolesFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends RolesFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
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
    orderBy?: Enumerable<RolesOrderByWithRelationInput>
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
    distinct?: Enumerable<RolesScalarFieldEnum>
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
    orderBy?: Enumerable<RolesOrderByWithRelationInput>
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
    distinct?: Enumerable<RolesScalarFieldEnum>
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
    data: Enumerable<RolesCreateManyInput>
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
  }

  export type SentRolesMaxAggregateOutputType = {
    id: string | null
    sentAt: Date | null
    roleId: string | null
  }

  export type SentRolesCountAggregateOutputType = {
    id: number
    sentAt: number
    roleId: number
    _all: number
  }


  export type SentRolesMinAggregateInputType = {
    id?: true
    sentAt?: true
    roleId?: true
  }

  export type SentRolesMaxAggregateInputType = {
    id?: true
    sentAt?: true
    roleId?: true
  }

  export type SentRolesCountAggregateInputType = {
    id?: true
    sentAt?: true
    roleId?: true
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
    orderBy?: Enumerable<SentRolesOrderByWithRelationInput>
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
    orderBy?: Enumerable<SentRolesOrderByWithAggregationInput>
    by: SentRolesScalarFieldEnum[]
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
    _count: SentRolesCountAggregateOutputType | null
    _min: SentRolesMinAggregateOutputType | null
    _max: SentRolesMaxAggregateOutputType | null
  }

  type GetSentRolesGroupByPayload<T extends SentRolesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<SentRolesGroupByOutputType, T['by']> &
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
    role?: boolean | RolesArgs<ExtArgs>
    subscribers?: boolean | SentRoles$subscribersArgs<ExtArgs>
    _count?: boolean | SentRolesCountOutputTypeArgs<ExtArgs>
  }, ExtArgs["result"]["sentRoles"]>

  export type SentRolesSelectScalar = {
    id?: boolean
    sentAt?: boolean
    roleId?: boolean
  }

  export type SentRolesInclude<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
    role?: boolean | RolesArgs<ExtArgs>
    subscribers?: boolean | SentRoles$subscribersArgs<ExtArgs>
    _count?: boolean | SentRolesCountOutputTypeArgs<ExtArgs>
  }


  type SentRolesGetPayload<S extends boolean | null | undefined | SentRolesArgs> = $Types.GetResult<SentRolesPayload, S>

  type SentRolesCountArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = 
    Omit<SentRolesFindManyArgs, 'select' | 'include'> & {
      select?: SentRolesCountAggregateInputType | true
    }

  export interface SentRolesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    findUnique<T extends SentRolesFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, SentRolesFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'SentRoles'> extends True ? Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

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
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    findFirst<T extends SentRolesFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, SentRolesFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'SentRoles'> extends True ? Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first SentRoles that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'findMany', never>>

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
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

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
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    ): Prisma__SentRolesClient<$Types.GetResult<SentRolesPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
      ByFields extends TupleToUnion<T['by']>,
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

    role<T extends RolesArgs<ExtArgs> = {}>(args?: Subset<T, RolesArgs<ExtArgs>>): Prisma__RolesClient<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findUnique', never> | Null, never, ExtArgs>;

    subscribers<T extends SentRoles$subscribersArgs<ExtArgs> = {}>(args?: Subset<T, SentRoles$subscribersArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<SubscribersPayload<ExtArgs>, T, 'findMany', never>| Null>;

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



  // Custom InputTypes

  /**
   * SentRoles base type for findUnique actions
   */
  export type SentRolesFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
   * SentRoles findUnique
   */
  export interface SentRolesFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends SentRolesFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
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
   * SentRoles base type for findFirst actions
   */
  export type SentRolesFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
    orderBy?: Enumerable<SentRolesOrderByWithRelationInput>
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
    distinct?: Enumerable<SentRolesScalarFieldEnum>
  }

  /**
   * SentRoles findFirst
   */
  export interface SentRolesFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends SentRolesFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
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
    orderBy?: Enumerable<SentRolesOrderByWithRelationInput>
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
    distinct?: Enumerable<SentRolesScalarFieldEnum>
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
    orderBy?: Enumerable<SentRolesOrderByWithRelationInput>
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
    distinct?: Enumerable<SentRolesScalarFieldEnum>
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
    data: Enumerable<SentRolesCreateManyInput>
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
    orderBy?: Enumerable<SubscribersOrderByWithRelationInput>
    cursor?: SubscribersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<SubscribersScalarFieldEnum>
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
  }

  export type CompaniesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    url: string | null
    logoUrl: string | null
    countryIcon: string | null
    createdAt: Date | null
  }

  export type CompaniesCountAggregateOutputType = {
    id: number
    name: number
    url: number
    logoUrl: number
    countryIcon: number
    createdAt: number
    _all: number
  }


  export type CompaniesMinAggregateInputType = {
    id?: true
    name?: true
    url?: true
    logoUrl?: true
    countryIcon?: true
    createdAt?: true
  }

  export type CompaniesMaxAggregateInputType = {
    id?: true
    name?: true
    url?: true
    logoUrl?: true
    countryIcon?: true
    createdAt?: true
  }

  export type CompaniesCountAggregateInputType = {
    id?: true
    name?: true
    url?: true
    logoUrl?: true
    countryIcon?: true
    createdAt?: true
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
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
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
    orderBy?: Enumerable<CompaniesOrderByWithAggregationInput>
    by: CompaniesScalarFieldEnum[]
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
    createdAt: Date | null
    _count: CompaniesCountAggregateOutputType | null
    _min: CompaniesMinAggregateOutputType | null
    _max: CompaniesMaxAggregateOutputType | null
  }

  type GetCompaniesGroupByPayload<T extends CompaniesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickArray<CompaniesGroupByOutputType, T['by']> &
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

  export interface CompaniesDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined, ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> {
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
    findUnique<T extends CompaniesFindUniqueArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, CompaniesFindUniqueArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Companies'> extends True ? Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findUnique', never>, never, ExtArgs> : Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findUnique', never> | null, null, ExtArgs>

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
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findUniqueOrThrow', never>, never, ExtArgs>

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
    findFirst<T extends CompaniesFindFirstArgs<ExtArgs>, LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, CompaniesFindFirstArgs<ExtArgs>>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Companies'> extends True ? Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findFirst', never>, never, ExtArgs> : Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findFirst', never> | null, null, ExtArgs>

    /**
     * Find the first Companies that matches the filter or
     * throw `NotFoundError` if no matches were found.
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
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findFirstOrThrow', never>, never, ExtArgs>

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
    ): Prisma.PrismaPromise<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'findMany', never>>

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
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'create', never>, never, ExtArgs>

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
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'delete', never>, never, ExtArgs>

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
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'update', never>, never, ExtArgs>

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
    ): Prisma__CompaniesClient<$Types.GetResult<CompaniesPayload<ExtArgs>, T, 'upsert', never>, never, ExtArgs>

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
      ByFields extends TupleToUnion<T['by']>,
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

    roles<T extends Companies$rolesArgs<ExtArgs> = {}>(args?: Subset<T, Companies$rolesArgs<ExtArgs>>): Prisma.PrismaPromise<$Types.GetResult<RolesPayload<ExtArgs>, T, 'findMany', never>| Null>;

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



  // Custom InputTypes

  /**
   * Companies base type for findUnique actions
   */
  export type CompaniesFindUniqueArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
   * Companies findUnique
   */
  export interface CompaniesFindUniqueArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends CompaniesFindUniqueArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
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
   * Companies base type for findFirst actions
   */
  export type CompaniesFindFirstArgsBase<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> = {
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
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
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
    distinct?: Enumerable<CompaniesScalarFieldEnum>
  }

  /**
   * Companies findFirst
   */
  export interface CompaniesFindFirstArgs<ExtArgs extends $Extensions.Args = $Extensions.DefaultArgs> extends CompaniesFindFirstArgsBase<ExtArgs> {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
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
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
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
    distinct?: Enumerable<CompaniesScalarFieldEnum>
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
    orderBy?: Enumerable<CompaniesOrderByWithRelationInput>
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
    distinct?: Enumerable<CompaniesScalarFieldEnum>
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
    data: Enumerable<CompaniesCreateManyInput>
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
    orderBy?: Enumerable<RolesOrderByWithRelationInput>
    cursor?: RolesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Enumerable<RolesScalarFieldEnum>
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
    sentRolesId: 'sentRolesId'
  };

  export type RolesScalarFieldEnum = (typeof RolesScalarFieldEnum)[keyof typeof RolesScalarFieldEnum]


  export const SentRolesScalarFieldEnum: {
    id: 'id',
    sentAt: 'sentAt',
    roleId: 'roleId'
  };

  export type SentRolesScalarFieldEnum = (typeof SentRolesScalarFieldEnum)[keyof typeof SentRolesScalarFieldEnum]


  export const CompaniesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    url: 'url',
    logoUrl: 'logoUrl',
    countryIcon: 'countryIcon',
    createdAt: 'createdAt'
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
   * Deep Input Types
   */


  export type SubscribersWhereInput = {
    AND?: Enumerable<SubscribersWhereInput>
    OR?: Enumerable<SubscribersWhereInput>
    NOT?: Enumerable<SubscribersWhereInput>
    id?: UuidFilter | string
    email?: StringFilter | string
    name?: StringNullableFilter | string | null
    linkedInUrl?: StringNullableFilter | string | null
    gitHub?: StringNullableFilter | string | null
    startedWorkingAt?: IntNullableFilter | number | null
    skills?: JsonNullableFilter
    englishLevel?: EnumEnglishLevelNullableFilter | EnglishLevel | null
    isConfirmed?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    optOut?: BoolFilter | boolean
    sentRoles?: SentRolesListRelationFilter
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
    optOut?: SortOrder
    sentRoles?: SentRolesOrderByRelationAggregateInput
  }

  export type SubscribersWhereUniqueInput = {
    id?: string
    email?: string
  }

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
    optOut?: SortOrder
    _count?: SubscribersCountOrderByAggregateInput
    _avg?: SubscribersAvgOrderByAggregateInput
    _max?: SubscribersMaxOrderByAggregateInput
    _min?: SubscribersMinOrderByAggregateInput
    _sum?: SubscribersSumOrderByAggregateInput
  }

  export type SubscribersScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SubscribersScalarWhereWithAggregatesInput>
    OR?: Enumerable<SubscribersScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SubscribersScalarWhereWithAggregatesInput>
    id?: UuidWithAggregatesFilter | string
    email?: StringWithAggregatesFilter | string
    name?: StringNullableWithAggregatesFilter | string | null
    linkedInUrl?: StringNullableWithAggregatesFilter | string | null
    gitHub?: StringNullableWithAggregatesFilter | string | null
    startedWorkingAt?: IntNullableWithAggregatesFilter | number | null
    skills?: JsonNullableWithAggregatesFilter
    englishLevel?: EnumEnglishLevelNullableWithAggregatesFilter | EnglishLevel | null
    isConfirmed?: BoolWithAggregatesFilter | boolean
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    optOut?: BoolWithAggregatesFilter | boolean
  }

  export type RolesWhereInput = {
    AND?: Enumerable<RolesWhereInput>
    OR?: Enumerable<RolesWhereInput>
    NOT?: Enumerable<RolesWhereInput>
    id?: StringFilter | string
    companyId?: StringFilter | string
    title?: StringFilter | string
    description?: StringFilter | string
    country?: StringFilter | string
    language?: StringFilter | string
    currency?: StringNullableFilter | string | null
    salary?: StringNullableFilter | string | null
    skills?: JsonNullableFilter
    createdAt?: DateTimeNullableFilter | Date | string | null
    sentRolesId?: StringNullableFilter | string | null
    company?: XOR<CompaniesRelationFilter, CompaniesWhereInput>
    sentRoles?: XOR<SentRolesRelationFilter, SentRolesWhereInput> | null
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
    createdAt?: SortOrderInput | SortOrder
    sentRolesId?: SortOrderInput | SortOrder
    company?: CompaniesOrderByWithRelationInput
    sentRoles?: SentRolesOrderByWithRelationInput
  }

  export type RolesWhereUniqueInput = {
    id?: string
    sentRolesId?: string
  }

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
    createdAt?: SortOrderInput | SortOrder
    sentRolesId?: SortOrderInput | SortOrder
    _count?: RolesCountOrderByAggregateInput
    _max?: RolesMaxOrderByAggregateInput
    _min?: RolesMinOrderByAggregateInput
  }

  export type RolesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<RolesScalarWhereWithAggregatesInput>
    OR?: Enumerable<RolesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<RolesScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    companyId?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    description?: StringWithAggregatesFilter | string
    country?: StringWithAggregatesFilter | string
    language?: StringWithAggregatesFilter | string
    currency?: StringNullableWithAggregatesFilter | string | null
    salary?: StringNullableWithAggregatesFilter | string | null
    skills?: JsonNullableWithAggregatesFilter
    createdAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    sentRolesId?: StringNullableWithAggregatesFilter | string | null
  }

  export type SentRolesWhereInput = {
    AND?: Enumerable<SentRolesWhereInput>
    OR?: Enumerable<SentRolesWhereInput>
    NOT?: Enumerable<SentRolesWhereInput>
    id?: StringFilter | string
    sentAt?: DateTimeNullableFilter | Date | string | null
    roleId?: StringFilter | string
    role?: XOR<RolesRelationFilter, RolesWhereInput> | null
    subscribers?: SubscribersListRelationFilter
  }

  export type SentRolesOrderByWithRelationInput = {
    id?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    roleId?: SortOrder
    role?: RolesOrderByWithRelationInput
    subscribers?: SubscribersOrderByRelationAggregateInput
  }

  export type SentRolesWhereUniqueInput = {
    id?: string
  }

  export type SentRolesOrderByWithAggregationInput = {
    id?: SortOrder
    sentAt?: SortOrderInput | SortOrder
    roleId?: SortOrder
    _count?: SentRolesCountOrderByAggregateInput
    _max?: SentRolesMaxOrderByAggregateInput
    _min?: SentRolesMinOrderByAggregateInput
  }

  export type SentRolesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<SentRolesScalarWhereWithAggregatesInput>
    OR?: Enumerable<SentRolesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<SentRolesScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    sentAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
    roleId?: StringWithAggregatesFilter | string
  }

  export type CompaniesWhereInput = {
    AND?: Enumerable<CompaniesWhereInput>
    OR?: Enumerable<CompaniesWhereInput>
    NOT?: Enumerable<CompaniesWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    url?: StringFilter | string
    logoUrl?: StringNullableFilter | string | null
    countryIcon?: StringFilter | string
    createdAt?: DateTimeNullableFilter | Date | string | null
    roles?: RolesListRelationFilter
  }

  export type CompaniesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    roles?: RolesOrderByRelationAggregateInput
  }

  export type CompaniesWhereUniqueInput = {
    id?: string
  }

  export type CompaniesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrderInput | SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    _count?: CompaniesCountOrderByAggregateInput
    _max?: CompaniesMaxOrderByAggregateInput
    _min?: CompaniesMinOrderByAggregateInput
  }

  export type CompaniesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<CompaniesScalarWhereWithAggregatesInput>
    OR?: Enumerable<CompaniesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<CompaniesScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    logoUrl?: StringNullableWithAggregatesFilter | string | null
    countryIcon?: StringWithAggregatesFilter | string
    createdAt?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type SubscribersCreateInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    optOut?: boolean
    sentRoles?: SentRolesCreateNestedManyWithoutSubscribersInput
  }

  export type SubscribersUncheckedCreateInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    optOut?: boolean
    sentRoles?: SentRolesUncheckedCreateNestedManyWithoutSubscribersInput
  }

  export type SubscribersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableIntFieldUpdateOperationsInput | number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    optOut?: BoolFieldUpdateOperationsInput | boolean
    sentRoles?: SentRolesUpdateManyWithoutSubscribersNestedInput
  }

  export type SubscribersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableIntFieldUpdateOperationsInput | number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    optOut?: BoolFieldUpdateOperationsInput | boolean
    sentRoles?: SentRolesUncheckedUpdateManyWithoutSubscribersNestedInput
  }

  export type SubscribersCreateManyInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    optOut?: boolean
  }

  export type SubscribersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableIntFieldUpdateOperationsInput | number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    optOut?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubscribersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableIntFieldUpdateOperationsInput | number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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
    createdAt?: Date | string | null
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
    createdAt?: Date | string | null
    sentRolesId?: string | null
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
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentRolesId?: NullableStringFieldUpdateOperationsInput | string | null
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
    createdAt?: Date | string | null
    sentRolesId?: string | null
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
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentRolesId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SentRolesCreateInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    role?: RolesCreateNestedOneWithoutSentRolesInput
    subscribers?: SubscribersCreateNestedManyWithoutSentRolesInput
  }

  export type SentRolesUncheckedCreateInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    role?: RolesUncheckedCreateNestedOneWithoutSentRolesInput
    subscribers?: SubscribersUncheckedCreateNestedManyWithoutSentRolesInput
  }

  export type SentRolesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    role?: RolesUpdateOneWithoutSentRolesNestedInput
    subscribers?: SubscribersUpdateManyWithoutSentRolesNestedInput
  }

  export type SentRolesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    role?: RolesUncheckedUpdateOneWithoutSentRolesNestedInput
    subscribers?: SubscribersUncheckedUpdateManyWithoutSentRolesNestedInput
  }

  export type SentRolesCreateManyInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
  }

  export type SentRolesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type SentRolesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type CompaniesCreateInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string | null
    roles?: RolesCreateNestedManyWithoutCompanyInput
  }

  export type CompaniesUncheckedCreateInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string | null
    roles?: RolesUncheckedCreateNestedManyWithoutCompanyInput
  }

  export type CompaniesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roles?: RolesUpdateManyWithoutCompanyNestedInput
  }

  export type CompaniesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roles?: RolesUncheckedUpdateManyWithoutCompanyNestedInput
  }

  export type CompaniesCreateManyInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string | null
  }

  export type CompaniesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CompaniesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidFilter | string
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type EnumEnglishLevelNullableFilter = {
    equals?: EnglishLevel | null
    in?: Enumerable<EnglishLevel> | null
    notIn?: Enumerable<EnglishLevel> | null
    not?: NestedEnumEnglishLevelNullableFilter | EnglishLevel | null
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type SentRolesListRelationFilter = {
    every?: SentRolesWhereInput
    some?: SentRolesWhereInput
    none?: SentRolesWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SentRolesOrderByRelationAggregateInput = {
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
    optOut?: SortOrder
  }

  export type SubscribersAvgOrderByAggregateInput = {
    startedWorkingAt?: SortOrder
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
    optOut?: SortOrder
  }

  export type SubscribersSumOrderByAggregateInput = {
    startedWorkingAt?: SortOrder
  }

  export type UuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type EnumEnglishLevelNullableWithAggregatesFilter = {
    equals?: EnglishLevel | null
    in?: Enumerable<EnglishLevel> | null
    notIn?: Enumerable<EnglishLevel> | null
    not?: NestedEnumEnglishLevelNullableWithAggregatesFilter | EnglishLevel | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumEnglishLevelNullableFilter
    _max?: NestedEnumEnglishLevelNullableFilter
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type CompaniesRelationFilter = {
    is?: CompaniesWhereInput | null
    isNot?: CompaniesWhereInput | null
  }

  export type SentRolesRelationFilter = {
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
    sentRolesId?: SortOrder
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
    sentRolesId?: SortOrder
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
    sentRolesId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type RolesRelationFilter = {
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
  }

  export type SentRolesMaxOrderByAggregateInput = {
    id?: SortOrder
    sentAt?: SortOrder
    roleId?: SortOrder
  }

  export type SentRolesMinOrderByAggregateInput = {
    id?: SortOrder
    sentAt?: SortOrder
    roleId?: SortOrder
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
  }

  export type CompaniesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrder
  }

  export type CompaniesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    url?: SortOrder
    logoUrl?: SortOrder
    countryIcon?: SortOrder
    createdAt?: SortOrder
  }

  export type SentRolesCreateNestedManyWithoutSubscribersInput = {
    create?: XOR<Enumerable<SentRolesCreateWithoutSubscribersInput>, Enumerable<SentRolesUncheckedCreateWithoutSubscribersInput>>
    connectOrCreate?: Enumerable<SentRolesCreateOrConnectWithoutSubscribersInput>
    connect?: Enumerable<SentRolesWhereUniqueInput>
  }

  export type SentRolesUncheckedCreateNestedManyWithoutSubscribersInput = {
    create?: XOR<Enumerable<SentRolesCreateWithoutSubscribersInput>, Enumerable<SentRolesUncheckedCreateWithoutSubscribersInput>>
    connectOrCreate?: Enumerable<SentRolesCreateOrConnectWithoutSubscribersInput>
    connect?: Enumerable<SentRolesWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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
    create?: XOR<Enumerable<SentRolesCreateWithoutSubscribersInput>, Enumerable<SentRolesUncheckedCreateWithoutSubscribersInput>>
    connectOrCreate?: Enumerable<SentRolesCreateOrConnectWithoutSubscribersInput>
    upsert?: Enumerable<SentRolesUpsertWithWhereUniqueWithoutSubscribersInput>
    set?: Enumerable<SentRolesWhereUniqueInput>
    disconnect?: Enumerable<SentRolesWhereUniqueInput>
    delete?: Enumerable<SentRolesWhereUniqueInput>
    connect?: Enumerable<SentRolesWhereUniqueInput>
    update?: Enumerable<SentRolesUpdateWithWhereUniqueWithoutSubscribersInput>
    updateMany?: Enumerable<SentRolesUpdateManyWithWhereWithoutSubscribersInput>
    deleteMany?: Enumerable<SentRolesScalarWhereInput>
  }

  export type SentRolesUncheckedUpdateManyWithoutSubscribersNestedInput = {
    create?: XOR<Enumerable<SentRolesCreateWithoutSubscribersInput>, Enumerable<SentRolesUncheckedCreateWithoutSubscribersInput>>
    connectOrCreate?: Enumerable<SentRolesCreateOrConnectWithoutSubscribersInput>
    upsert?: Enumerable<SentRolesUpsertWithWhereUniqueWithoutSubscribersInput>
    set?: Enumerable<SentRolesWhereUniqueInput>
    disconnect?: Enumerable<SentRolesWhereUniqueInput>
    delete?: Enumerable<SentRolesWhereUniqueInput>
    connect?: Enumerable<SentRolesWhereUniqueInput>
    update?: Enumerable<SentRolesUpdateWithWhereUniqueWithoutSubscribersInput>
    updateMany?: Enumerable<SentRolesUpdateManyWithWhereWithoutSubscribersInput>
    deleteMany?: Enumerable<SentRolesScalarWhereInput>
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

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type CompaniesUpdateOneRequiredWithoutRolesNestedInput = {
    create?: XOR<CompaniesCreateWithoutRolesInput, CompaniesUncheckedCreateWithoutRolesInput>
    connectOrCreate?: CompaniesCreateOrConnectWithoutRolesInput
    upsert?: CompaniesUpsertWithoutRolesInput
    connect?: CompaniesWhereUniqueInput
    update?: XOR<CompaniesUpdateWithoutRolesInput, CompaniesUncheckedUpdateWithoutRolesInput>
  }

  export type SentRolesUpdateOneWithoutRoleNestedInput = {
    create?: XOR<SentRolesCreateWithoutRoleInput, SentRolesUncheckedCreateWithoutRoleInput>
    connectOrCreate?: SentRolesCreateOrConnectWithoutRoleInput
    upsert?: SentRolesUpsertWithoutRoleInput
    disconnect?: boolean
    delete?: boolean
    connect?: SentRolesWhereUniqueInput
    update?: XOR<SentRolesUpdateWithoutRoleInput, SentRolesUncheckedUpdateWithoutRoleInput>
  }

  export type RolesCreateNestedOneWithoutSentRolesInput = {
    create?: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutSentRolesInput
    connect?: RolesWhereUniqueInput
  }

  export type SubscribersCreateNestedManyWithoutSentRolesInput = {
    create?: XOR<Enumerable<SubscribersCreateWithoutSentRolesInput>, Enumerable<SubscribersUncheckedCreateWithoutSentRolesInput>>
    connectOrCreate?: Enumerable<SubscribersCreateOrConnectWithoutSentRolesInput>
    connect?: Enumerable<SubscribersWhereUniqueInput>
  }

  export type RolesUncheckedCreateNestedOneWithoutSentRolesInput = {
    create?: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutSentRolesInput
    connect?: RolesWhereUniqueInput
  }

  export type SubscribersUncheckedCreateNestedManyWithoutSentRolesInput = {
    create?: XOR<Enumerable<SubscribersCreateWithoutSentRolesInput>, Enumerable<SubscribersUncheckedCreateWithoutSentRolesInput>>
    connectOrCreate?: Enumerable<SubscribersCreateOrConnectWithoutSentRolesInput>
    connect?: Enumerable<SubscribersWhereUniqueInput>
  }

  export type RolesUpdateOneWithoutSentRolesNestedInput = {
    create?: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutSentRolesInput
    upsert?: RolesUpsertWithoutSentRolesInput
    disconnect?: boolean
    delete?: boolean
    connect?: RolesWhereUniqueInput
    update?: XOR<RolesUpdateWithoutSentRolesInput, RolesUncheckedUpdateWithoutSentRolesInput>
  }

  export type SubscribersUpdateManyWithoutSentRolesNestedInput = {
    create?: XOR<Enumerable<SubscribersCreateWithoutSentRolesInput>, Enumerable<SubscribersUncheckedCreateWithoutSentRolesInput>>
    connectOrCreate?: Enumerable<SubscribersCreateOrConnectWithoutSentRolesInput>
    upsert?: Enumerable<SubscribersUpsertWithWhereUniqueWithoutSentRolesInput>
    set?: Enumerable<SubscribersWhereUniqueInput>
    disconnect?: Enumerable<SubscribersWhereUniqueInput>
    delete?: Enumerable<SubscribersWhereUniqueInput>
    connect?: Enumerable<SubscribersWhereUniqueInput>
    update?: Enumerable<SubscribersUpdateWithWhereUniqueWithoutSentRolesInput>
    updateMany?: Enumerable<SubscribersUpdateManyWithWhereWithoutSentRolesInput>
    deleteMany?: Enumerable<SubscribersScalarWhereInput>
  }

  export type RolesUncheckedUpdateOneWithoutSentRolesNestedInput = {
    create?: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
    connectOrCreate?: RolesCreateOrConnectWithoutSentRolesInput
    upsert?: RolesUpsertWithoutSentRolesInput
    disconnect?: boolean
    delete?: boolean
    connect?: RolesWhereUniqueInput
    update?: XOR<RolesUpdateWithoutSentRolesInput, RolesUncheckedUpdateWithoutSentRolesInput>
  }

  export type SubscribersUncheckedUpdateManyWithoutSentRolesNestedInput = {
    create?: XOR<Enumerable<SubscribersCreateWithoutSentRolesInput>, Enumerable<SubscribersUncheckedCreateWithoutSentRolesInput>>
    connectOrCreate?: Enumerable<SubscribersCreateOrConnectWithoutSentRolesInput>
    upsert?: Enumerable<SubscribersUpsertWithWhereUniqueWithoutSentRolesInput>
    set?: Enumerable<SubscribersWhereUniqueInput>
    disconnect?: Enumerable<SubscribersWhereUniqueInput>
    delete?: Enumerable<SubscribersWhereUniqueInput>
    connect?: Enumerable<SubscribersWhereUniqueInput>
    update?: Enumerable<SubscribersUpdateWithWhereUniqueWithoutSentRolesInput>
    updateMany?: Enumerable<SubscribersUpdateManyWithWhereWithoutSentRolesInput>
    deleteMany?: Enumerable<SubscribersScalarWhereInput>
  }

  export type RolesCreateNestedManyWithoutCompanyInput = {
    create?: XOR<Enumerable<RolesCreateWithoutCompanyInput>, Enumerable<RolesUncheckedCreateWithoutCompanyInput>>
    connectOrCreate?: Enumerable<RolesCreateOrConnectWithoutCompanyInput>
    createMany?: RolesCreateManyCompanyInputEnvelope
    connect?: Enumerable<RolesWhereUniqueInput>
  }

  export type RolesUncheckedCreateNestedManyWithoutCompanyInput = {
    create?: XOR<Enumerable<RolesCreateWithoutCompanyInput>, Enumerable<RolesUncheckedCreateWithoutCompanyInput>>
    connectOrCreate?: Enumerable<RolesCreateOrConnectWithoutCompanyInput>
    createMany?: RolesCreateManyCompanyInputEnvelope
    connect?: Enumerable<RolesWhereUniqueInput>
  }

  export type RolesUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<Enumerable<RolesCreateWithoutCompanyInput>, Enumerable<RolesUncheckedCreateWithoutCompanyInput>>
    connectOrCreate?: Enumerable<RolesCreateOrConnectWithoutCompanyInput>
    upsert?: Enumerable<RolesUpsertWithWhereUniqueWithoutCompanyInput>
    createMany?: RolesCreateManyCompanyInputEnvelope
    set?: Enumerable<RolesWhereUniqueInput>
    disconnect?: Enumerable<RolesWhereUniqueInput>
    delete?: Enumerable<RolesWhereUniqueInput>
    connect?: Enumerable<RolesWhereUniqueInput>
    update?: Enumerable<RolesUpdateWithWhereUniqueWithoutCompanyInput>
    updateMany?: Enumerable<RolesUpdateManyWithWhereWithoutCompanyInput>
    deleteMany?: Enumerable<RolesScalarWhereInput>
  }

  export type RolesUncheckedUpdateManyWithoutCompanyNestedInput = {
    create?: XOR<Enumerable<RolesCreateWithoutCompanyInput>, Enumerable<RolesUncheckedCreateWithoutCompanyInput>>
    connectOrCreate?: Enumerable<RolesCreateOrConnectWithoutCompanyInput>
    upsert?: Enumerable<RolesUpsertWithWhereUniqueWithoutCompanyInput>
    createMany?: RolesCreateManyCompanyInputEnvelope
    set?: Enumerable<RolesWhereUniqueInput>
    disconnect?: Enumerable<RolesWhereUniqueInput>
    delete?: Enumerable<RolesWhereUniqueInput>
    connect?: Enumerable<RolesWhereUniqueInput>
    update?: Enumerable<RolesUpdateWithWhereUniqueWithoutCompanyInput>
    updateMany?: Enumerable<RolesUpdateManyWithWhereWithoutCompanyInput>
    deleteMany?: Enumerable<RolesScalarWhereInput>
  }

  export type NestedUuidFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidFilter | string
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedEnumEnglishLevelNullableFilter = {
    equals?: EnglishLevel | null
    in?: Enumerable<EnglishLevel> | null
    notIn?: Enumerable<EnglishLevel> | null
    not?: NestedEnumEnglishLevelNullableFilter | EnglishLevel | null
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedUuidWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    not?: NestedUuidWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number> | number
    notIn?: Enumerable<number> | number
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string> | string
    notIn?: Enumerable<string> | string
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | string | null
    notIn?: Enumerable<string> | string | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | number | null
    notIn?: Enumerable<number> | number | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: InputJsonValue | JsonNullValueFilter
    path?: string[]
    string_contains?: string
    string_starts_with?: string
    string_ends_with?: string
    array_contains?: InputJsonValue | null
    array_starts_with?: InputJsonValue | null
    array_ends_with?: InputJsonValue | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonNullValueFilter
  }

  export type NestedEnumEnglishLevelNullableWithAggregatesFilter = {
    equals?: EnglishLevel | null
    in?: Enumerable<EnglishLevel> | null
    notIn?: Enumerable<EnglishLevel> | null
    not?: NestedEnumEnglishLevelNullableWithAggregatesFilter | EnglishLevel | null
    _count?: NestedIntNullableFilter
    _min?: NestedEnumEnglishLevelNullableFilter
    _max?: NestedEnumEnglishLevelNullableFilter
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string> | Date | string
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | Date | string | null
    notIn?: Enumerable<Date> | Enumerable<string> | Date | string | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type SentRolesCreateWithoutSubscribersInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    role?: RolesCreateNestedOneWithoutSentRolesInput
  }

  export type SentRolesUncheckedCreateWithoutSubscribersInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    role?: RolesUncheckedCreateNestedOneWithoutSentRolesInput
  }

  export type SentRolesCreateOrConnectWithoutSubscribersInput = {
    where: SentRolesWhereUniqueInput
    create: XOR<SentRolesCreateWithoutSubscribersInput, SentRolesUncheckedCreateWithoutSubscribersInput>
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
    data: XOR<SentRolesUpdateManyMutationInput, SentRolesUncheckedUpdateManyWithoutSentRolesInput>
  }

  export type SentRolesScalarWhereInput = {
    AND?: Enumerable<SentRolesScalarWhereInput>
    OR?: Enumerable<SentRolesScalarWhereInput>
    NOT?: Enumerable<SentRolesScalarWhereInput>
    id?: StringFilter | string
    sentAt?: DateTimeNullableFilter | Date | string | null
    roleId?: StringFilter | string
  }

  export type CompaniesCreateWithoutRolesInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string | null
  }

  export type CompaniesUncheckedCreateWithoutRolesInput = {
    id?: string
    name: string
    url: string
    logoUrl?: string | null
    countryIcon: string
    createdAt?: Date | string | null
  }

  export type CompaniesCreateOrConnectWithoutRolesInput = {
    where: CompaniesWhereUniqueInput
    create: XOR<CompaniesCreateWithoutRolesInput, CompaniesUncheckedCreateWithoutRolesInput>
  }

  export type SentRolesCreateWithoutRoleInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    subscribers?: SubscribersCreateNestedManyWithoutSentRolesInput
  }

  export type SentRolesUncheckedCreateWithoutRoleInput = {
    id?: string
    sentAt?: Date | string | null
    roleId: string
    subscribers?: SubscribersUncheckedCreateNestedManyWithoutSentRolesInput
  }

  export type SentRolesCreateOrConnectWithoutRoleInput = {
    where: SentRolesWhereUniqueInput
    create: XOR<SentRolesCreateWithoutRoleInput, SentRolesUncheckedCreateWithoutRoleInput>
  }

  export type CompaniesUpsertWithoutRolesInput = {
    update: XOR<CompaniesUpdateWithoutRolesInput, CompaniesUncheckedUpdateWithoutRolesInput>
    create: XOR<CompaniesCreateWithoutRolesInput, CompaniesUncheckedCreateWithoutRolesInput>
  }

  export type CompaniesUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type CompaniesUncheckedUpdateWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    countryIcon?: StringFieldUpdateOperationsInput | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type SentRolesUpsertWithoutRoleInput = {
    update: XOR<SentRolesUpdateWithoutRoleInput, SentRolesUncheckedUpdateWithoutRoleInput>
    create: XOR<SentRolesCreateWithoutRoleInput, SentRolesUncheckedCreateWithoutRoleInput>
  }

  export type SentRolesUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    subscribers?: SubscribersUpdateManyWithoutSentRolesNestedInput
  }

  export type SentRolesUncheckedUpdateWithoutRoleInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
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
    createdAt?: Date | string | null
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
    createdAt?: Date | string | null
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
    startedWorkingAt?: number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    optOut?: boolean
  }

  export type SubscribersUncheckedCreateWithoutSentRolesInput = {
    id?: string
    email: string
    name?: string | null
    linkedInUrl?: string | null
    gitHub?: string | null
    startedWorkingAt?: number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: EnglishLevel | null
    isConfirmed?: boolean
    createdAt?: Date | string
    optOut?: boolean
  }

  export type SubscribersCreateOrConnectWithoutSentRolesInput = {
    where: SubscribersWhereUniqueInput
    create: XOR<SubscribersCreateWithoutSentRolesInput, SubscribersUncheckedCreateWithoutSentRolesInput>
  }

  export type RolesUpsertWithoutSentRolesInput = {
    update: XOR<RolesUpdateWithoutSentRolesInput, RolesUncheckedUpdateWithoutSentRolesInput>
    create: XOR<RolesCreateWithoutSentRolesInput, RolesUncheckedCreateWithoutSentRolesInput>
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
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    data: XOR<SubscribersUpdateManyMutationInput, SubscribersUncheckedUpdateManyWithoutSubscribersInput>
  }

  export type SubscribersScalarWhereInput = {
    AND?: Enumerable<SubscribersScalarWhereInput>
    OR?: Enumerable<SubscribersScalarWhereInput>
    NOT?: Enumerable<SubscribersScalarWhereInput>
    id?: UuidFilter | string
    email?: StringFilter | string
    name?: StringNullableFilter | string | null
    linkedInUrl?: StringNullableFilter | string | null
    gitHub?: StringNullableFilter | string | null
    startedWorkingAt?: IntNullableFilter | number | null
    skills?: JsonNullableFilter
    englishLevel?: EnumEnglishLevelNullableFilter | EnglishLevel | null
    isConfirmed?: BoolFilter | boolean
    createdAt?: DateTimeFilter | Date | string
    optOut?: BoolFilter | boolean
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
    createdAt?: Date | string | null
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
    createdAt?: Date | string | null
    sentRolesId?: string | null
  }

  export type RolesCreateOrConnectWithoutCompanyInput = {
    where: RolesWhereUniqueInput
    create: XOR<RolesCreateWithoutCompanyInput, RolesUncheckedCreateWithoutCompanyInput>
  }

  export type RolesCreateManyCompanyInputEnvelope = {
    data: Enumerable<RolesCreateManyCompanyInput>
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
    data: XOR<RolesUpdateManyMutationInput, RolesUncheckedUpdateManyWithoutRolesInput>
  }

  export type RolesScalarWhereInput = {
    AND?: Enumerable<RolesScalarWhereInput>
    OR?: Enumerable<RolesScalarWhereInput>
    NOT?: Enumerable<RolesScalarWhereInput>
    id?: StringFilter | string
    companyId?: StringFilter | string
    title?: StringFilter | string
    description?: StringFilter | string
    country?: StringFilter | string
    language?: StringFilter | string
    currency?: StringNullableFilter | string | null
    salary?: StringNullableFilter | string | null
    skills?: JsonNullableFilter
    createdAt?: DateTimeNullableFilter | Date | string | null
    sentRolesId?: StringNullableFilter | string | null
  }

  export type SentRolesUpdateWithoutSubscribersInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    role?: RolesUpdateOneWithoutSentRolesNestedInput
  }

  export type SentRolesUncheckedUpdateWithoutSubscribersInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
    role?: RolesUncheckedUpdateOneWithoutSentRolesNestedInput
  }

  export type SentRolesUncheckedUpdateManyWithoutSentRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    sentAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    roleId?: StringFieldUpdateOperationsInput | string
  }

  export type SubscribersUpdateWithoutSentRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableIntFieldUpdateOperationsInput | number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    optOut?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubscribersUncheckedUpdateWithoutSentRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableIntFieldUpdateOperationsInput | number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    optOut?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SubscribersUncheckedUpdateManyWithoutSubscribersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    linkedInUrl?: NullableStringFieldUpdateOperationsInput | string | null
    gitHub?: NullableStringFieldUpdateOperationsInput | string | null
    startedWorkingAt?: NullableIntFieldUpdateOperationsInput | number | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    englishLevel?: NullableEnumEnglishLevelFieldUpdateOperationsInput | EnglishLevel | null
    isConfirmed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    optOut?: BoolFieldUpdateOperationsInput | boolean
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
    createdAt?: Date | string | null
    sentRolesId?: string | null
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
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentRolesId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RolesUncheckedUpdateManyWithoutRolesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    country?: StringFieldUpdateOperationsInput | string
    language?: StringFieldUpdateOperationsInput | string
    currency?: NullableStringFieldUpdateOperationsInput | string | null
    salary?: NullableStringFieldUpdateOperationsInput | string | null
    skills?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    sentRolesId?: NullableStringFieldUpdateOperationsInput | string | null
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