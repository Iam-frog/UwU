const express = require('express');
const path = require('path');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const VKR_API_KEY = 'vkrdownloader';
const VKR_API_ENDPOINT = 'https://vkrdownloader.xyz/server';

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

// === API Proxy Route ===
app.get('/api/download', async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) {
    return res.status(400).json({ error: 'Missing "url" query parameter' });
  }

  try {
    const response = await axios.get(VKR_API_ENDPOINT, {
      params: {
        api_key: VKR_API_KEY,
        vkr: videoUrl,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
});

// Static Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));
app.get('/dark', (req, res) => res.sendFile(path.join(__dirname, 'public/dark.html')));
app.get('/google3d913672b444e790.html', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/google3d913672b444e790.html'))
);
app.get('/sw.js', (req, res) => res.sendFile(path.join(__dirname, 'public/sw.js')));
app.get('/manifest.webmanifest', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/manifest.webmanifest'))
);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
