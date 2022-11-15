import express from 'express';
import mongoose from 'mongoose';
require('dotenv/config');

const MONGODB_SECRET_CONECTION_KEY = process.env.MONGODB_SECRET_CONECTION_KEY as string;

mongoose.connect(MONGODB_SECRET_CONECTION_KEY)
  .then(() => {
    const app = express();
    const port = 3333;

    console.log('conectado ao mongo');
    app.listen(port, () => {
      console.log(`🚀 Server is runnig on http://localhost:${port}`);
    });

  })
  .catch(() => console.log('erro ao conectar no mongodb'));

