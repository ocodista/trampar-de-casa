# Profiling

These numbers are just an estimate, which will be updated with each change.

## Roles-renderer

For 38 roles:
|Date (dd/mm/yyyy) | Function | Time (m:ss.mmm) | Roles |
|-----------------------|-----------------------|-----------------|-------|
| 19/10/2023 | rolesRenderer | 00:02.807 | 38
| 20/10/2023 | parseAndStoreRole | 00:00.447 | 38

## Email-composer

| Date (dd/mm/yyyy) | Function              | Time (m:ss.mmm) | Subscribers |
| ----------------- | --------------------- | --------------- | ----------- |
| 19/10/2023        | composeEmail          | 11:51.297       | 6029        |
| 19/10/2023        | consumePreRenderQueue | 00:00.105       | 6029        |
| 25/10/2023        | composeEmail          | 13:38.242       | 6597        |

## Email-pre-renderer

| Date (dd/mm/yyyy) | Function              | Time (m:ss.mmm) | Subscribers |
| ----------------- | --------------------- | --------------- | ----------- |
| 19/10/2023        | emailPreRender        | 6:56.356        | 6029        |
| 20/10/2023        | RenderHeaderAndFooter | 0:00.003        | 6029        |
| 25/10/2023        | emailPreRender        | 7:23.122        | 6597        |

## Email-sender

| Date (dd/mm/yyyy) | Function    | Time (m:ss.mmm) | Subscribers |
| ----------------- | ----------- | --------------- | ----------- |
| 19/10/2023        | emailSender | 4:14.890        | 6029        |
| 20/10/2023        | SendEmails  | 0:01.008        | 6029        |
| 25/10/2023        | emailSender | 15:17.474       | 6597        |
| 25/10/2023        | sendEmails  | 0:03.971        | 6597        |

## Roles-assigner

| Date (dd/mm/yyyy) | Function            | Time (m:ss.mmm) | Subscribers |
| ----------------- | ------------------- | --------------- | ----------- |
| 19/10/2023        | assignRoles         | 0:45.330        | 6029        |
| 20/10/2023        | getSubscriberRoles  | 0:00.287        | 6029        |
| 20/10/2023        | getEmailProps       | 0:00.002        | 6029        |
| 20/10/2023        | saveSubscriberRoles | 0:00.001        | 6029        |

## Roles-validator

| Date (dd/mm/yyyy) | Function                       | Time (m:ss.mmm) | Roles |
| ----------------- | ------------------------------ | --------------- | ----- |
| 20/10/2023        | rolesValidator                 | 5:00.504        | 38    |
| 20/10/2023        | launchBrowserAndNavigateToPage | 0:08.724        | 38    |
| 20/10/2023        | isValidRole                    | 0:08.131        | 38    |
| 20/10/2023        | searchRoleOnSiteContent        | 0:00.004        | 38    |
