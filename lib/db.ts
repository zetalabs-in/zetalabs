import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

let dbPath: string;

const localDbDir = path.join(process.cwd(), "content");
const localDbPath = path.join(localDbDir, "database.db");

try {
  // 1. Try to create local directory if it doesn't exist
  if (!fs.existsSync(localDbDir)) {
    fs.mkdirSync(localDbDir, { recursive: true });
  }

  // 2. Try to open the database locally to test write permissions
  const testDb = new Database(localDbPath);
  // Run a quick write test
  testDb.exec("PRAGMA journal_mode = WAL;");
  testDb.close();
  
  dbPath = localDbPath;
} catch (error) {
  console.warn(
    "Local database path is not writeable (common in serverless/Vercel environments). Falling back to /tmp/database.db. Error details:",
    error
  );

  const tmpDbPath = path.join("/tmp", "database.db");

  // 3. If a pre-existing local database file exists in read-only space, seed the /tmp db with it
  if (fs.existsSync(localDbPath) && !fs.existsSync(tmpDbPath)) {
    try {
      fs.copyFileSync(localDbPath, tmpDbPath);
      console.log("Seeded /tmp/database.db from local workspace database template.");
    } catch (copyError) {
      console.error("Failed to copy seed database to /tmp:", copyError);
    }
  }

  dbPath = tmpDbPath;
}

// Keep a global connection in development to prevent hot-reload leaks
const globalForDb = global as unknown as { db: Database.Database | undefined };

export const db = globalForDb.db ?? new Database(dbPath);

if (process.env.NODE_ENV !== "production") {
  globalForDb.db = db;
}

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT,
    content TEXT NOT NULL,
    date TEXT NOT NULL,
    tags TEXT,
    published INTEGER DEFAULT 0
  );
`);
