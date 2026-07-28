import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createProxyMiddleware } from 'http-proxy-middleware';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Proxy API requests
app.use('/api', createProxyMiddleware({
  target: 'http://invapi.appcls.cl',
  changeOrigin: true,
  secure: false,
}));

// Serve static assets from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Serve index.html for all other routes to support client-side routing (SPA)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
