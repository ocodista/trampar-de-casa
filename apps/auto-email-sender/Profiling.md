# Profiling

These numbers are just an estimate, which will be updated with each change.

## Roles-renderer

For 38 roles:
| Function | Time (m:ss.mmm) | Date (dd/mm/yyyy)
|-----------------------|-----------------|------------------|
| rolesRenderer | 00:02.807 | 19/10/2023
| parseAndStoreRole | 00:00.447 | 20/10/2023

## Email-composer

For 6.029 subscribers:
| Function | Time (m:ss.mmm) | Date (dd/mm/yyyy)
|-----------------------|-----------------|------------------|
| composeEmail | 11:51.297 | 19/10/2023
| consumePreRenderQueue | 00:00.105 | 19/10/2023

## Email-pre-renderer

For 6.029 subscribers:
| Function | Time (m:ss.mmm) | Date (dd/mm/yyyy)
|-----------------------|-----------------|------------------|
| emailPreRender | 6:56.356 | 19/10/2023
| RenderHeaderAndFooter | 0:00.139 | 20/10/2023
| sendToQueue | 0:00.003 | 20/10/2023

## Email-sender

For 6.029 subscribers, sending chunks with 25 emails and "resend" commented(1s of delay on each sending):
| Function | Time (m:ss.mmm) | Date (dd/mm/yyyy)
|-----------------------|-----------------|------------------|
| emailSender | 4:14.890 | 19/10/2023
| SendEmails | 0:01.008 | 20/10/2023

## Roles-assigner

For 6.029 subscribers:
| Function | Time (m:ss.mmm) | Date (dd/mm/yyyy)
|-----------------------|-----------------|------------------|
| assignRoles | 0:45.330 | 19/10/2023
| getSubscriberRoles | 0:00.287 | 20/10/2023
| getEmailProps | 0:00.002 | 20/10/2023
| saveSubscriberRoles | 0:00.001 | 20/10/2023

## Roles-validator

For 38 roles:
| Function | Time (m:ss.mmm) | Date (dd/mm/yyyy)
|--------------------------------|-----------------|------------------|
| rolesValidator | 5:00.504 | 20/10/2023
| launchBrowserAndNavigateToPage | 0:08.724 | 20/10/2023
| isValidRole | 0:08.131 | 20/10/2023
| searchRoleOnSiteContent | 0:00.004 | 20/10/2023
