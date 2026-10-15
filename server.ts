import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createApiRouter } from './src/server/api';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = createApiRouter();
const port = process.env.PORT || 3000;

// Serve static build assets in production
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to index.html for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`EcoLens server listening on port ${port}`);
});
