# Roles Validator Feature Documentation

The Roles Validator module is all about checking roles. It uses Redis to keep track of roles and does some smart web scraping to determine if roles are active.

## Worker Flow

The worker follows the following sequence:

```mermaid
sequenceDiagram
participant rolesValidator
participant getRoles
participant isValidRole
participant deleteFromRedis

rolesValidator->>getRoles: Get roles
loop for each role
  rolesValidator->>isValidRole: Verify if role is active with web scrapping
  alt isValid = false
    rolesValidator->>deleteFromRedis: Delete role
  end
end
```

### **RolesValidator**

This function is like the conductor of the role-checking orchestra. It relies on Redis and does some nifty web scraping to handle roles.

How It Works

1. Obtain a list of roles using the getRoles function.
2. For each role in the list:
   - Examine the id, url, and title.
   - If there's no url, use deleteFromRedis to clean up Redis.
   - If there's a url, use isValidRole to investigate if the role is still active.
   - If it's inactive, use deleteFromRedis to tidy up Redis.

### **getRoles**

This function uses a supabase client to access database and get roles.

### **isValidRole**

The isValidRole.ts file plays the role of a detective, using web scraping as its magnifying glass to discover if roles are active.

How It Works

- Initiate a web browser and navigate to the provided URL using launchBrowserAndNavigateToPage.
- Adjust the view of the webpage using setViewport.
- Utilize web scraping techniques with isValidRoleOnSite to ascertain if the role remains active on the website.
- Close the web browser upon completion.

### **deleteFromRedis**

The `deleteFromRedis` function is a core element in the Roles Validator module. It meticulously manages data integrity by erasing role-related information from Redis. Whether due to inactivity.
