## TO DO's

- [ ] Frontend Hosting? JamStack?
- [ ] Logger
- [ ] Staging, DEV, Production ENVs
- [ x ] Error Handling
- [ ] DB Schema
- [ ] Authentication
  - [ ] User
  - [ ] Policies
  - [ ] External APIs
- [ ] Security
  - [ ] Secure Headers?
  - [ ] Lucia || [Auth.js | https://github.com/honojs/middleware/tree/main/packages/auth-js]
  - [ ] User Registrierung "Email vergeben" === Angrifsvektor? --> [Rate Limiter | https://github.com/rhinobase/hono-rate-limiter]
  - [ ] CSRF Protection - https://hono.dev/middleware/builtin/csrf
  - [ ] CORS - https://hono.dev/middleware/builtin/cors
- [ ] External APIs
  - [ ] DV360 Connection
  - [ ] [Meta Business | https://developers.facebook.com/docs/business-manager-api/]
  - [ ] XANDR
- [ x ] Zeiteinschätzungen
- [ ] API Documentation

## DB SCHEMA

```
// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table agencies {
  id uuid [primary key]
  name string
  slug string [unique]
  description text
  employees uuid [ref: < users.id]
  avatar uuid [ref: - assets.id]
  adservers uuid [ref: < adservers.id]
}

Table users {
  id uuid [primary key]
  agency uuid [ref: - agencies.id]
  avatar uuid [ref: - assets.id]
  role uuid [ref: - roles.id]
  firstName varchar
  lastName varchar
  createdAt timestamp
}

Table adservers {
  id uuid [primary key]
  name varchar
  slug varchar [unique]
  avatar uuid [ref: - assets.id]
  color varchar
  label varchar
  authType AuthTypes
}

enum AuthTypes {
  "API Keys"
  "Basic Authentication"
  "OAuth 2.0"
  "Bearer Tokens"
  "JWT"
  "HMAC"
  "Custom Token-Based Authentication"
}

Table assets {
  id uuid [primary key]
  portrait text
  landscape text
  icon text
  downloadUrl text
  type AssetType
  weight float
}

enum AssetType {
  "logo"
  "zip"
  "image"
  "video"
}

Table advertisers {
  id uuid [primary key]
  name varchar
  slug varchar [unique]
  description text
  logo uuid [ref: - assets.id]
  adserver uuid [ref: - adservers.id]
}

// AUTH

Table sessions {
  id uuid [primary key]
  user uuid [ref: - users.id]
  expiresAt timestampz [not null]
}

Table adServerTokens {
  id uuid [primary key]
  agency uuid [ref: - agencies.id]
  adserver uuid [ref: - adservers.id]
  token text
  refreshToken text
  expiredAt timestampz
}

Table roles {
  id uuid [primary key]
  name varchar
  slug varchar
  campaignCanRead boolean
  campaignCanDelete boolean
  campaignCanCreate boolean
  campaignCanUpdate boolean
  reportingCanRead boolean
  reportingCanDelete boolean
  reportingCanCreate boolean
  reportingCanUpdate boolean
  agencyCanRead boolean
  agencyCanDelete boolean
  agencyCanCreate boolean
  agencyCanUpdate boolean
  assetsCanRead boolean
  assetsCanDelete boolean
  assetsCanCreate boolean
  assetsCanUpdate boolean
}

// CAMPAIGNS

Table campaigns {
  id uuid [primary key]
  name varchar [not null]
  slug varchar [not null]
  insertionOrder varchar
  totalBudget float
  currency currency
  startAt timestampz [default: `now()`]
  endAt timestampz [not null]
  agency uuid [ref: - agencies.id]
  advertiser uuid [ref: < advertisers.id]
  lineItems uuid [ref: < lineItems.id]
  flights uuid [ref: < flights.id]
}

Table flights {
  id uuid [primary key]
  campaign uuid [ref: - campaigns.id]
  lineItems uuid [ref: > lineItems.id]
  startAt timestamp [not null]
  endAt timestamp [not null]
}

Table targetings {
  id uuid [primary key]
  name varchar
}

Table lineItems {
  id uuid [primary key]
  label varchar
  budget float
  currency currency
  flight uuid [ref: - flights.id]
  targeting uuid [ref: - targetings.id]
  adserver uuid [ref: - adservers.id]
  campaign uuid [ref: - campaigns.id]
  creative uuid [ref: - creatives.id]
}

enum currency {
  "USD"
  "EUR"
}

enum units {
  "px"
  "%"
}

enum states {
  "active"
  "inactive"
}

// CREATIVES

Table creatives {
  id uuid [primary key]
  slug varchar [unique]
  flight integer
  format uuid [ref: - formats.id]
  campaign uuid [ref: - campaigns.id]
  isComposite boolean
  isCompositeCore boolean
  createdAt timestampz
}

Table formats {
  id uuid [primary key]
  name varchar
  slug varchar [unique]
  width integer
  height integer
  unitSize units
  type formatType
}

enum formatType {
  "native"
  "video"
  "richmedia"
  "display"
}



// REPORTINGS

Table reportings {
  id uuid [primary key]
  name string
  agency uuid [ref: - agencies.id]
  dimensions uuid [ref: > dimensions.id]
  metrics uuid [ref: > metrics.id]
  lineItems uuid [ref: <> lineItems.id]
  data uuid [ref: - reportingData.id]
  createdAt timestamp
}

Table reportingData {
  id uuid [primary key]
  data json
  createdAt timestamp
  updatedAt timestam
}

Table dimensions {
  id uuid [primary key]
  label varchar
  slug varchar
}

Table metrics {
  id uuid [primary key]
  label varchar
  slug varchar
  isKPI boolean
}


```
