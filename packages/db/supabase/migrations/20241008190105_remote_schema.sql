create sequence "public"."sponsors_id_seq";

alter table "public"."SubscriberTopics" drop constraint "SubscriberTopics_topicId_fkey";

create table "public"."Views" (
    "id" uuid not null default gen_random_uuid(),
    "role_id" uuid not null,
    "viewed_at" timestamp with time zone default CURRENT_TIMESTAMP
);


create table "public"."sponsors" (
    "id" integer not null default nextval('sponsors_id_seq'::regclass),
    "github_id" integer not null,
    "name" character varying(255) not null,
    "email" character varying(255),
    "avatar_url" text,
    "is_recurring" boolean not null,
    "created_at" timestamp with time zone default CURRENT_TIMESTAMP,
    "updated_at" timestamp with time zone default CURRENT_TIMESTAMP
);


alter table "public"."Roles" add column "company_logo" character varying(2000);

alter table "public"."Skills" add column "emoji" text;

alter sequence "public"."sponsors_id_seq" owned by "public"."sponsors"."id";

CREATE UNIQUE INDEX "Views_pkey" ON public."Views" USING btree (id);

CREATE INDEX idx_sponsors_is_recurring ON public.sponsors USING btree (is_recurring);

CREATE INDEX idx_subscribers_createdat ON public."Subscribers" USING btree ("createdAt");

CREATE UNIQUE INDEX sponsors_github_id_key ON public.sponsors USING btree (github_id);

CREATE UNIQUE INDEX sponsors_pkey ON public.sponsors USING btree (id);

CREATE UNIQUE INDEX unique_title_company_skillsid ON public."Roles" USING btree (title, company, "skillsId");

CREATE INDEX views_role_id_idx ON public."Views" USING btree (role_id);

CREATE INDEX views_viewed_at_idx ON public."Views" USING btree (viewed_at);

alter table "public"."Views" add constraint "Views_pkey" PRIMARY KEY using index "Views_pkey";

alter table "public"."sponsors" add constraint "sponsors_pkey" PRIMARY KEY using index "sponsors_pkey";

alter table "public"."Roles" add constraint "unique_title_company_skillsid" UNIQUE using index "unique_title_company_skillsid";

alter table "public"."Views" add constraint "fk_role" FOREIGN KEY (role_id) REFERENCES "Roles"(id) ON DELETE CASCADE not valid;

alter table "public"."Views" validate constraint "fk_role";

alter table "public"."sponsors" add constraint "sponsors_github_id_key" UNIQUE using index "sponsors_github_id_key";

alter table "public"."SubscriberTopics" add constraint "SubscriberTopics_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topics"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."SubscriberTopics" validate constraint "SubscriberTopics_topicId_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_distinct_skills()
 RETURNS TABLE(id bigint, name text, normalized text, emoji text)
 LANGUAGE sql
AS $function$
WITH DistinctSkills AS (
    SELECT DISTINCT CAST(UNNEST("skillsId") AS bigint) AS "skillsId"
    FROM (
        SELECT "skillsId"
        FROM "Roles"
    ) AS allSkills
)
SELECT s.id, s.name, s.normalized, s.emoji
FROM DistinctSkills ds
JOIN "Skills" s ON ds."skillsId" = s.id;
$function$
;

CREATE OR REPLACE FUNCTION public.get_view_count(role_uuid uuid)
 RETURNS integer
 LANGUAGE sql
AS $function$
    SELECT COUNT(*) FROM public."Views" WHERE role_id = role_uuid;
$function$
;

CREATE OR REPLACE FUNCTION public.replace_skills(skill_to_delete_id integer, replace_with_id integer)
 RETURNS void
 LANGUAGE plpgsql
AS $function$DECLARE
    skill_to_delete_text TEXT;
    replace_with_text TEXT;
BEGIN
    skill_to_delete_text := skill_to_delete_id::TEXT;
    replace_with_text := replace_with_id::TEXT;

    -- Delete the row from the "Skills" table
    DELETE FROM "Skills" WHERE id = skill_to_delete_id;

    -- Update all rows in the "Subscribers" table, replacing skill_to_delete_id with replace_with_id
    UPDATE "Subscribers"
    SET "skillsId" = array_replace("skillsId", skill_to_delete_text, replace_with_text)
    WHERE skill_to_delete_text = ANY("skillsId");
END;$function$
;

create or replace view "public"."vw_countries_in_roles" as  SELECT DISTINCT r.country
   FROM "Roles" r
  WHERE ((r.country IS NOT NULL) AND (length(r.country) > 0) AND (r.ready = true));


create or replace view "public"."vw_skills_in_roles" as  SELECT "Skills".id,
    "Skills".name,
    "Skills".normalized,
    "Skills".emoji
   FROM "Skills"
  WHERE ("Skills".id IN ( SELECT DISTINCT (unnest("Roles"."skillsId"))::integer AS skillid
           FROM "Roles"
          WHERE ("Roles".ready = true)))
  ORDER BY "Skills".name;


grant delete on table "public"."Views" to "anon";

grant insert on table "public"."Views" to "anon";

grant references on table "public"."Views" to "anon";

grant select on table "public"."Views" to "anon";

grant trigger on table "public"."Views" to "anon";

grant truncate on table "public"."Views" to "anon";

grant update on table "public"."Views" to "anon";

grant delete on table "public"."Views" to "authenticated";

grant insert on table "public"."Views" to "authenticated";

grant references on table "public"."Views" to "authenticated";

grant select on table "public"."Views" to "authenticated";

grant trigger on table "public"."Views" to "authenticated";

grant truncate on table "public"."Views" to "authenticated";

grant update on table "public"."Views" to "authenticated";

grant delete on table "public"."Views" to "service_role";

grant insert on table "public"."Views" to "service_role";

grant references on table "public"."Views" to "service_role";

grant select on table "public"."Views" to "service_role";

grant trigger on table "public"."Views" to "service_role";

grant truncate on table "public"."Views" to "service_role";

grant update on table "public"."Views" to "service_role";

grant delete on table "public"."sponsors" to "anon";

grant insert on table "public"."sponsors" to "anon";

grant references on table "public"."sponsors" to "anon";

grant select on table "public"."sponsors" to "anon";

grant trigger on table "public"."sponsors" to "anon";

grant truncate on table "public"."sponsors" to "anon";

grant update on table "public"."sponsors" to "anon";

grant delete on table "public"."sponsors" to "authenticated";

grant insert on table "public"."sponsors" to "authenticated";

grant references on table "public"."sponsors" to "authenticated";

grant select on table "public"."sponsors" to "authenticated";

grant trigger on table "public"."sponsors" to "authenticated";

grant truncate on table "public"."sponsors" to "authenticated";

grant update on table "public"."sponsors" to "authenticated";

grant delete on table "public"."sponsors" to "service_role";

grant insert on table "public"."sponsors" to "service_role";

grant references on table "public"."sponsors" to "service_role";

grant select on table "public"."sponsors" to "service_role";

grant trigger on table "public"."sponsors" to "service_role";

grant truncate on table "public"."sponsors" to "service_role";

grant update on table "public"."sponsors" to "service_role";


