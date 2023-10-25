# Profiling

These numbers are just an estimate, which will be updated with each change.
| Service | Date (dd/mm/yyyy) | Function | Time (m:ss.mmm) | Roles | Subscribers |
|--------------------|--------------------|--------------------------------|-----------------|-------|-------------|
| Roles-renderer | 19/10/2023 | rolesRenderer | 00:02.807 | 38 | |
| Roles-renderer | 20/10/2023 | parseAndStoreRole | 00:00.447 | 38 | |
| Email-composer | 19/10/2023 | composeEmail | 11:51.297 | | 6029 |
| Email-composer | 19/10/2023 | consumePreRenderQueue | 00:00.105 | | 6029 |
| Email-composer | 25/10/2023 | composeEmail | 13:38.242 | | 6597 |
| Email-pre-renderer | 19/10/2023 | emailPreRender | 6:56.356 | | 6029 |
| Email-pre-renderer | 20/10/2023 | RenderHeaderAndFooter | 0:00.003 | | 6029 |
| Email-pre-renderer | 25/10/2023 | emailPreRender | 7:23.122 | | 6597 |
| Email-sender | 19/10/2023 | emailSender | 4:14.890 | | 6029 |
| Email-sender | 20/10/2023 | SendEmails | 0:01.008 | | 6029 |
| Email-sender | 25/10/2023 | emailSender | 15:17.474 | | 6597 |
| Email-sender | 25/10/2023 | sendEmails | 0:03.971 | | 6597 |
| Roles-assigner | 19/10/2023 | assignRoles | 0:45.330 | 38 | 6029 |
| Roles-assigner | 20/10/2023 | getSubscriberRoles | 0:00.287 | 38 | 6029 |
| Roles-assigner | 20/10/2023 | getEmailProps | 0:00.002 | 38 | 6029 |
| Roles-assigner | 20/10/2023 | saveSubscriberRoles | 0:00.001 | 38 | 6029 |
| Roles-validator | 20/10/2023 | rolesValidator | 5:00.504 | 38 | |
| Roles-validator | 20/10/2023 | launchBrowserAndNavigateToPage | 0:08.724 | 38 | |
| Roles-validator | 20/10/2023 | isValidRole | 0:08.131 | 38 | |
| Roles-validator | 20/10/2023 | searchRoleOnSiteContent | 0:00.004 | 38 | |
| Roles-assigner | 25/10/2023 | assignRoles | 0:27.061 | 30 | 6585 |
| Roles-assigner | 25/10/2023 | saveSubscriberRoles | 0:00.961 | 30 | 6585 |
| Roles-assigner | 25/10/2023 | getSubscriberRoles | 0:00.192 | 30 | 6585 |
| Roles-assigner | 25/10/2023 | getEmailProps | 0:00.002 | 30 | 6585 |
| Roles-renderer | 25/10/2023 | rolesRenderer | 0:02.958 | 30 | |
| Roles-renderer | 25/10/2023 | parseAndStoreRole | 0:02.234 | 30 | |
