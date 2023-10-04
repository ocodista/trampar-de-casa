# Roles Validator Feature Documentation

The Roles Validator module is all about checking roles. It uses MongoDb to keep track of roles and does some smart web scraping to determine if roles are active.

## Worker Flow

The worker follows the following sequence:

```mermaid
sequenceDiagram
participant rolesValidator
participant getRoles
participant isValidRole
participant deleteFromMongo

rolesValidator->>getRoles: Get roles
loop for each role
  rolesValidator->>isValidRole: Verify if role is active with web scrapping
  alt isValid = false
    rolesValidator->>deleteFromMongo: Delete role
  end
end
```

## Flow Diagram
![image](https://github.com/ocodista/trampar-de-casa/assets/68869379/58dcebed-4c0c-4780-a0b6-0634bd4fd41f)

### **RolesValidator**

This function is like the conductor of the role-checking orchestra. It relies on MongoDb and does some nifty web scraping to handle roles.

How It Works

1. Obtain a list of roles using the getRoles function.
2. For each role in the list:
   - Examine the id, url, and title.
   - If there's no url, use deleteFromMongo to clean up MongoDb.
   - If there's a url, use isValidRole to investigate if the role is still active.
   - If it's inactive, use deleteFromMongo to tidy up MongoDb.

### **getRoles**

This function uses a supabase client to access database and get roles.

### **isValidRole**

The isValidRole.ts file plays the role of a detective, using web scraping as its magnifying glass to discover if roles are active.

How It Works

- Initiate a web browser and navigate to the provided URL using launchBrowserAndNavigateToPage.
- Adjust the view of the webpage using setViewport.
- Utilize web scraping techniques with isValidRoleOnSite to ascertain if the role remains active on the website.
- Close the web browser upon completion.

### **deleteFromMongo**

The `deleteFromMongo` function is a core element in the Roles Validator module. Here, we delete the role of MongoDb based on topicId because the MongoDb prefix for roles is based on this value
