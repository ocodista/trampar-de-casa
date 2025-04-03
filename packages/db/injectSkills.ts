import { Entities, skillArray } from "shared";
import { getPostgresClient } from "./src/postgres/getPostgresClient";

; (async () => {
  const postgres = getPostgresClient();
  const promises = skillArray.map(async ({ id, name, normalized }) => {
    const result = await postgres.query(
      `INSERT INTO ${Entities.Skills} (id, name, normalized) VALUES ($1, $2, $3)`,
      [id, name, normalized]
    );
    return result.rows;
  });
  await Promise.all(promises);
})();
