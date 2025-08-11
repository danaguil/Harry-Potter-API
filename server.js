// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = 8080;

// serve everything inside "public"
app.use(express.static(path.join(__dirname, 'public')));

// default route to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
