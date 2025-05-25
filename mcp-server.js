const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json({ limit: '10mb' }));

app.post('/figma-components', (req, res) => {
  console.log('Received data from Figma plugin:');
  console.dir(req.body, { depth: null });
  res.json({ status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('MCP server is running.');
});

app.listen(PORT, () => {
  console.log(`MCP server listening at http://localhost:${PORT}`);
}); 