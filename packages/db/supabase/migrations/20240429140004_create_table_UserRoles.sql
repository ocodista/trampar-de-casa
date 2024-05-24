CREATE TABLE UserRoles (
    "clickedAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "roleId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    FOREIGN KEY ("roleId") REFERENCES "Roles"(id),
    FOREIGN KEY ("userId") REFERENCES "Subscribers"(id)
);
