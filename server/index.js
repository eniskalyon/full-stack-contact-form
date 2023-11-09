const express = require('express');
const path = require('path');

const app = express();

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(3030, () => {
  console.log('Server started at: http://localhost:3030/');
});
