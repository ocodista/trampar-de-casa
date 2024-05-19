# How to run this

## Makefile

The makefile will run everything required for the mail sender.

### Setup

It'll load the roles from the db, match roles with subscribers, render html for each email and leave it ready to send.

```unix
make setup
```

### Send

Well, this makefile command will send all the pre-loaded, pre-rendered emails.

```unix
make send
```
