import * as dotenv from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';

// const DATABASE_URL = process.env.DATABASE_URL!;
dotenv.config({ path: ".env.local" });

export const db = drizzle("postgresql://neondb_owner:npg_xXiqCI9DbMw6@ep-quiet-hill-a51lk6kq-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require");
