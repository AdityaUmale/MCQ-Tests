import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_DB_CONNECTION_STRING;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGO_DB_CONNECTION_STRING environment variable inside .env.local'
  );
}

interface CachedMongoConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

let cached: CachedMongoConnection;

declare global {
  var mongooseCache: CachedMongoConnection | undefined;
}

if (!global.mongooseCache) {
  global.mongooseCache = { conn: null, promise: null };
}

cached = global.mongooseCache;

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI as string, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}