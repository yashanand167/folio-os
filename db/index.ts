import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema/schema";

const db = drizzle(process.env.DATABASE_URL as string, { schema });

export default db;
