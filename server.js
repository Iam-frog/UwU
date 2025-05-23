const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the root
app.use(express.static(__dirname));

// API route example (replace with your actual download logic)
app.get('/api/download', (req, res) => {
    const videoUrl = req.query.url;
    if (!videoUrl) return res.status(400).json({ error: 'Missing video URL' });

    // TODO: add video download logic
    res.json({ message: `Downloading video from ${videoUrl}` });
});

// Catch-all to serve index.html for frontend routing
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
