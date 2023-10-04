# Render Roles Worker - Readme Documentation

The Render Roles Worker is a software component that renders and saves each activated role from the database into MongoDb.

## Flow Diagram

![image](https://github.com/ocodista/trampar-de-casa/assets/68869379/573aa54c-f1c0-4cb0-b9a8-c642e6c15dbb)

## Worker Flow

The worker follows the following sequence:

```mermaid
sequenceDiagram
participant mainFunction
participant getRolesInBatches
participant parseAndStoreRole
participant supabase
participant mongoDb

loop routine
mainFunction->>+getRolesInBatches: Get roles
getRolesInBatches->>+supabase: Query activated roles
supabase-->>-getRolesInBatches: Roles[]
getRolesInBatches-->>-mainFunction: Roles[]
mainFunction->>+parseAndStoreRole: Render each role
parseAndStoreRole-->>-mainFunction: Return id and HTML
mainFunction->>+mongoDb: Save rendered HTML
end
```

- **Main Function**

  - Responsible for initializing Supabase and MongoDb.
  - Executes `getRolesInBatches` to retrieve roles in batches.
  - While `getRolesInBatches` is in progress, it parses roles into HTML and saves them in MongoDb using `parseAndStoreRole`.

- **getRolesInBatches()**

  - An `AsyncGenerator` function that queries Supabase with simple pagination.
  - Queries roles in small batches and returns them.

- **parseAndStoreRole**
  - Extracts the `id` from the `role` object.
  - Parses the role information into static HTML using the `parseHTML` function.
  - Saves the rendered HTML in the MongoDb database
    - If is an international role, save with the key format `InternationalRolesRenderer:${id}`.
    - If is a national role, save with the key format `NationalRolesRenderer:${id}`.
