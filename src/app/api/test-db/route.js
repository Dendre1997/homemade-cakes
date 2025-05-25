// app/api/test-db/route.js
import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

export async function GET(request) {
  try {
    await connectDB();
    const isConnected = mongoose.connection.readyState === 1;

    return new Response(
      JSON.stringify({
        message: isConnected ? 'MongoDB connected successfully' : 'MongoDB not connected',
      }),
      {
        status: isConnected ? 200 : 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
