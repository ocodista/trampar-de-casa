# Render Roles Worker - Readme Documentation

The Render Roles Worker is a software component that renders and saves each activated role from the database into Redis. The default prefix for all role keys is [`role:`](./src/parseAndStoreRole.ts).

## Worker Flow

The worker follows the following sequence:

```mermaid
sequenceDiagram
participant mainFunction
participant getRolesInBatches
participant parseAndStoreRole
participant supabase
participant redis

loop routine
mainFunction->>+getRolesInBatches: Get roles
getRolesInBatches->>+supabase: Query activated roles
supabase-->>-getRolesInBatches: Roles[]
getRolesInBatches-->>-mainFunction: Roles[]
mainFunction->>+parseAndStoreRole: Render each role
parseAndStoreRole-->>-mainFunction: Return id and HTML
mainFunction->>+redis: Save rendered HTML
end
```

- **Main Function**

  - Responsible for initializing Supabase and Redis.
  - Executes `getRolesInBatches` to retrieve roles in batches.
  - While `getRolesInBatches` is in progress, it parses roles into HTML and saves them in Redis using `parseAndStoreRole`.

- **getRolesInBatches()**

  - An `AsyncGenerator` function that queries Supabase with simple pagination.
  - Queries roles in small batches and returns them.

- **parseAndStoreRole**
  - Extracts the `id` from the `role` object.
  - Parses the role information into static HTML using the `parseHTML` function.
  - Saves the rendered HTML in the Redis database with the key format `role:${id}`.