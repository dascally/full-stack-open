import express from 'express';

const PORT = 3000;

const app = express();

app.get('/api/ping', (_req, res) => {
  res.send('<p>Pong.</p>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
