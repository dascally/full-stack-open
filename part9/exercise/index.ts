import express from 'express';

const PORT = 3003;
const app = express();

app.get('/hello', (_req, res) => {
  res.send('<p>Hello, Full Stack!</p>');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
