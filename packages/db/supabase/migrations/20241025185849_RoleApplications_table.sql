create type "public"."ApplicationStatus" as enum ('pending', 'approved', 'rejected', 'ignored');

create table "public"."RoleApplications" (
    "id" uuid not null default gen_random_uuid(),
    "roleId" uuid not null,
    "subscriberId" uuid not null,
    "status" "ApplicationStatus" default 'pending'::"ApplicationStatus",
    "createdAt" timestamp with time zone not null default timezone('utc'::text, now()),
    "updatedAt" timestamp with time zone not null default timezone('utc'::text, now()),
    "meetsRequirements" boolean not null
);


CREATE UNIQUE INDEX "RoleApplications_pkey" ON public."RoleApplications" USING btree (id);

alter table "public"."RoleApplications" add constraint "RoleApplications_pkey" PRIMARY KEY using index "RoleApplications_pkey";

alter table "public"."RoleApplications" add constraint "RoleApplications_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Roles"(id) ON DELETE CASCADE not valid;

alter table "public"."RoleApplications" validate constraint "RoleApplications_roleId_fkey";

alter table "public"."RoleApplications" add constraint "RoleApplications_subscriberId_fkey" FOREIGN KEY ("subscriberId") REFERENCES "Subscribers"(id) ON DELETE CASCADE not valid;

alter table "public"."RoleApplications" validate constraint "RoleApplications_subscriberId_fkey";

grant delete on table "public"."RoleApplications" to "anon";

grant insert on table "public"."RoleApplications" to "anon";

grant references on table "public"."RoleApplications" to "anon";

grant select on table "public"."RoleApplications" to "anon";

grant trigger on table "public"."RoleApplications" to "anon";

grant truncate on table "public"."RoleApplications" to "anon";

grant update on table "public"."RoleApplications" to "anon";

grant delete on table "public"."RoleApplications" to "authenticated";

grant insert on table "public"."RoleApplications" to "authenticated";

grant references on table "public"."RoleApplications" to "authenticated";

grant select on table "public"."RoleApplications" to "authenticated";

grant trigger on table "public"."RoleApplications" to "authenticated";

grant truncate on table "public"."RoleApplications" to "authenticated";

grant update on table "public"."RoleApplications" to "authenticated";

grant delete on table "public"."RoleApplications" to "service_role";

grant insert on table "public"."RoleApplications" to "service_role";

grant references on table "public"."RoleApplications" to "service_role";

grant select on table "public"."RoleApplications" to "service_role";

grant trigger on table "public"."RoleApplications" to "service_role";

grant truncate on table "public"."RoleApplications" to "service_role";

grant update on table "public"."RoleApplications" to "service_role";


