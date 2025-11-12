// src/lib/mongodb.ts
import { MongoClient, Db } from "mongodb";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

/**
 * NOTE:
 * - Uses MONGODB_URI and MONGODB_DB from .env.local
 * - Exports a named `getDb()` function.
 * - Does NOT throw at import time if MONGODB_URI is missing (will reject when used).
 */

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "elite_store";

const options = {};

// Create clientPromise but avoid throwing during module import
let clientPromise: Promise<MongoClient>;

if (!uri) {
  // create a promise that rejects when first awaited (so import is safe)
  clientPromise = Promise.reject(new Error("MONGODB_URI not configured"));
} else if (process.env.NODE_ENV === "development") {
  // use global to prevent multiple connections in dev (HMR)
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise!;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
  const client = await clientPromise; // will reject if URI missing or auth fails
  return client.db(dbName);
}
