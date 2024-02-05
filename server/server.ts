import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { corsOptions } from './config/corsAllower';
import { router } from './routes/notesRouter';
import { emitLog } from './middlewares/logEmitter';
require('dotenv').config({ path: '../.env' });

const app = express();
const PORT = process.env.SERVER_PORT;

// use log emitter middleware
app.use(emitLog);

// use origin allower
app.use(cors(corsOptions));

// use JSON body parser
app.use(bodyParser.json());

// use router
app.use(router);

// opening app
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
