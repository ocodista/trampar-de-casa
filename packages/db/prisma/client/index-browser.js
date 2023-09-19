
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
} = require('./runtime/index-browser')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 5.0.0
 * Query Engine version: 6a3747c37ff169c90047725a05a6ef02e32ac97e
 */
Prisma.prismaVersion = {
  client: "5.0.0",
  engine: "6a3747c37ff169c90047725a05a6ef02e32ac97e"
}

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  throw new Error(`Extensions.getExtensionContext is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.defineExtension = () => {
  throw new Error(`Extensions.defineExtension is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.SubscribersScalarFieldEnum = {
  id: 'id',
  email: 'email',
  name: 'name',
  linkedInUrl: 'linkedInUrl',
  gitHub: 'gitHub',
  startedWorkingAt: 'startedWorkingAt',
  englishLevel: 'englishLevel',
  isConfirmed: 'isConfirmed',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  optOut: 'optOut',
  skillsId: 'skillsId'
};

exports.Prisma.RolesScalarFieldEnum = {
  minimumYears: 'minimumYears',
  id: 'id',
  title: 'title',
  description: 'description',
  country: 'country',
  language: 'language',
  currency: 'currency',
  salary: 'salary',
  skillsId: 'skillsId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  sentRolesId: 'sentRolesId',
  ready: 'ready',
  url: 'url',
  company: 'company'
};

exports.Prisma.SubscribersSkillsScalarFieldEnum = {
  id: 'id',
  subscriberId: 'subscriberId',
  skillId: 'skillId'
};

exports.Prisma.SkillsScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.SentRolesScalarFieldEnum = {
  id: 'id',
  sentAt: 'sentAt',
  roleId: 'roleId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SubscriberTopicsScalarFieldEnum = {
  id: 'id',
  subscriberId: 'subscriberId',
  topicId: 'topicId'
};

exports.Prisma.TopicsScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.RolesSkillsViewScalarFieldEnum = {
  id: 'id',
  country: 'country',
  currency: 'currency',
  description: 'description',
  language: 'language',
  salary: 'salary',
  title: 'title',
  url: 'url',
  createdAt: 'createdAt',
  skillNames: 'skillNames',
  ready: 'ready',
  companyName: 'companyName'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.EnglishLevel = {
  Beginner: 'Beginner',
  Intermediary: 'Intermediary',
  Advanced: 'Advanced',
  Fluent: 'Fluent'
};

exports.RoleLanguage = {
  English: 'English',
  Portuguese: 'Portuguese'
};

exports.Prisma.ModelName = {
  Subscribers: 'Subscribers',
  Roles: 'Roles',
  SubscribersSkills: 'SubscribersSkills',
  Skills: 'Skills',
  SentRoles: 'SentRoles',
  SubscriberTopics: 'SubscriberTopics',
  Topics: 'Topics',
  rolesSkillsView: 'rolesSkillsView'
};

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
