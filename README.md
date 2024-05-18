## TO DO's

- [ ] Frontend Hosting? JamStack?
- [ ] Logger
- [ ] Staging, DEV, Production ENVs
- [ ] Error Handling
- [ ] DB Schema
- [ ] Authentication
  - [ ] User
  - [ ] Policies
  - [ ] External APIs
- [ ] Security
  - [ ] Headers?
  - [ ] Lucia
- [ ] External APIs
  - [ ] DV360 Connection
  - [ ] XANDR
- [ x ] Zeiteinschätzungen
- [ ] API Documentation

## DB SCHEMA

```
Table agencies {
  id uuid [primary key]
  name string
  slug string [unique]
  adservers uuid [ref: < adservers.id]
}

Table users {
  id uuid [primary key]
  agency uuid [ref: - agencies.id]
  firstName varchar
  lastName varchar
  role varchar
  createdAt timestamp
}

Table adservers {
  id uuid [primary key]
  name varchar
  slug varchar [unique]
}

// CAMPAIGNS

Table campaigns {
  id uuid [primary key]
  name varchar
  insertionOrder varchar
  agency uuid [ref: > agencies.id]

}

Table lineItems {
  id uuid [primary key]
  adserver uuid [ref: - adservers.id]
  campaign uuid [ref: > campaigns.id]

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
}

```
