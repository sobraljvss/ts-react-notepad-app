import express from 'express';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(require('./routes/root'));

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
