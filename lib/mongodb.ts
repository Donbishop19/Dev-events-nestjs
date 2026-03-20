import mongoose from "mongoose";

// Asserting `as string` here is safe: the guard below throws at
// startup if the variable is missing, so this value is always a string
// by the time any function in this module is called.
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local"
  );
}

/**
 * Holds the cached Mongoose connection and the pending connection promise.
 * Caching prevents opening new connections on every request during
 * development hot-reloads, where module state is reset but the Node.js
 * process (and its globals) persist.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

/**
 * Attach the cache to the Node.js global object so it survives
 * Next.js hot-reloads in development.
 */
declare global {
  // eslint-disable-next-line no-var
  var _mongooseCache: MongooseCache | undefined;
}

// Reuse the existing cache or create a fresh one on first load.
const cached: MongooseCache = global._mongooseCache ?? {
  conn: null,
  promise: null,
};
global._mongooseCache = cached;

/**
 * Connects to MongoDB via Mongoose and returns the Mongoose instance.
 *
 * - In production, each serverless invocation may create a new connection,
 *   but the cache ensures a single connection per process lifetime.
 * - In development, the global cache prevents connection exhaustion caused
 *   by repeated hot-reloads.
 *
 * @returns A resolved Mongoose instance ready for model operations.
 */
export async function connectToDatabase(): Promise<typeof mongoose> {
  // Return immediately if a connection is already established.
  if (cached.conn) {
    return cached.conn;
  }

  // Initiate a new connection only if one is not already in progress.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      // Disable Mongoose's internal command buffering so that operations
      // fail fast if called before the connection is ready.
      bufferCommands: false,
    });
  }

  // Await the pending connection and persist it in the cache.
  cached.conn = await cached.promise;
  return cached.conn;
}
