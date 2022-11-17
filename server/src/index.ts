import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
require('dotenv/config');

import { router } from './router';

const MONGODB_SECRET_CONECTION_KEY = process.env.MONGODB_SECRET_CONECTION_KEY as string;

mongoose.connect(MONGODB_SECRET_CONECTION_KEY)
  .then(() => {
    const app = express();
    const port = 3333;

    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    console.log('conectado ao mongo');
    app.listen(port, () => {
      console.log(`🚀 Server is runnig on http://localhost:${port}`);
    });

  })
  .catch(() => console.log('erro ao conectar no mongodb'));

