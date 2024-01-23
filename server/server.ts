import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { corsOptions } from './config/corsAllower';
import { router } from './routes/notesRouter';
import { emitLog } from './middlewares/logEmitter';
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(emitLog);

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
