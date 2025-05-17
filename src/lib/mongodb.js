import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {}; // Add MongoClient options here if needed

if (!uri) {
  throw new Error('❌ MONGODB_URI is not defined. Please add it to your .env.local file');
}

// Global cache for MongoClient to avoid creating multiple instances in development
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!globalThis._mongoClientPromise) {
    const client = new MongoClient(uri, options);
    globalThis._mongoClientPromise = client.connect();
  }
  clientPromise = globalThis._mongoClientPromise;
} else {
  const client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
