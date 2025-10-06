// server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

import { sequelize, connectDB } from './config/db.js';
import applicantRoutes from './routes/applicantRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Test Route
app.get('/api', (req, res) => {
  res.send('API is running...');
});

// Gunakan Routes
app.use('/api/auth', authRoutes); 
app.use('/api/applicants', applicantRoutes);

// Fungsi untuk memulai server
const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); // sinkronisasi model dengan database
    console.log("✅ All models were synchronized successfully.");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();