create schema if not exists "_supavisor";


create table "public"."RoleOwner" (
    "id" uuid not null default uuid_generate_v4(),
    "roleID" uuid not null,
    "subscriberID" uuid not null,
    "createdAt" timestamp without time zone default CURRENT_TIMESTAMP
);


CREATE INDEX idx_role_subscriber ON public."RoleOwner" USING btree ("roleID", "subscriberID");

CREATE UNIQUE INDEX roleowner_pkey ON public."RoleOwner" USING btree (id);

alter table "public"."RoleOwner" add constraint "roleowner_pkey" PRIMARY KEY using index "roleowner_pkey";

alter table "public"."RoleOwner" add constraint "roleowner_roleid_fkey" FOREIGN KEY ("roleID") REFERENCES "Roles"(id) not valid;

alter table "public"."RoleOwner" validate constraint "roleowner_roleid_fkey";

alter table "public"."RoleOwner" add constraint "roleowner_subscriberid_fkey" FOREIGN KEY ("subscriberID") REFERENCES "Subscribers"(id) not valid;

alter table "public"."RoleOwner" validate constraint "roleowner_subscriberid_fkey";

grant delete on table "public"."RoleOwner" to "anon";

grant insert on table "public"."RoleOwner" to "anon";

grant references on table "public"."RoleOwner" to "anon";

grant select on table "public"."RoleOwner" to "anon";

grant trigger on table "public"."RoleOwner" to "anon";

grant truncate on table "public"."RoleOwner" to "anon";

grant update on table "public"."RoleOwner" to "anon";

grant delete on table "public"."RoleOwner" to "authenticated";

grant insert on table "public"."RoleOwner" to "authenticated";

grant references on table "public"."RoleOwner" to "authenticated";

grant select on table "public"."RoleOwner" to "authenticated";

grant trigger on table "public"."RoleOwner" to "authenticated";

grant truncate on table "public"."RoleOwner" to "authenticated";

grant update on table "public"."RoleOwner" to "authenticated";

grant delete on table "public"."RoleOwner" to "service_role";

grant insert on table "public"."RoleOwner" to "service_role";

grant references on table "public"."RoleOwner" to "service_role";

grant select on table "public"."RoleOwner" to "service_role";

grant trigger on table "public"."RoleOwner" to "service_role";

grant truncate on table "public"."RoleOwner" to "service_role";

grant update on table "public"."RoleOwner" to "service_role";


