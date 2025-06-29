const app = require('./src/app');
const { connectDB } = require('./src/config/database'); // ✅ Use destructuring here
const { PORT } = require('./src/config/serverConfig');

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
  }
};

startServer();
