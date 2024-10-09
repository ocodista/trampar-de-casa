# Jobs Cache Reset Endpoint

This endpoint allows resetting and repopulating the jobs cache in Redis.

## Endpoint

`GET /api/resetJobsCache`

## Purpose

To clear the existing jobs cache and repopulate it with up-to-date data from the database. This is useful when significant changes have been made to the data and you need these changes to be reflected immediately, without waiting for the natural expiration of the cache.

## How to Use

1. Make a GET request to `/api/resetJobsCache` with the authentication token.
2. The endpoint will delete the existing cache, fetch new data from the database, and store it in Redis.

## Parameters

- `token` (required): Authentication token to access the endpoint.

Example usage:

```
https://www.trampardecasa.com.br/api/resetJobsCache?token=SECRET_KEY
```

## Response

- Success (200 OK):

  ```json
  {
    "message": "Cache reset and refilled successfully"
  }
  ```

- Error (401 Unauthorized):

  ```json
  {
    "error": "Unauthorized"
  }
  ```

- Error (500 Internal Server Error):
  ```json
  {
    "error": "Failed to reset and refill cache"
  }
  ```

## Environment Variables

Ensure the following environment variable is set:

- `SECRET_KEY`: The secret token for authenticating reset requests.
