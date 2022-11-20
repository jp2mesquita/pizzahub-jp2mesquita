import express from 'express';
import mongoose from 'mongoose';
import path from 'node:path';
import http from 'node:http';
require('dotenv/config');
import { Server } from 'socket.io';

import { router } from './router';

const MONGODB_SECRET_CONECTION_KEY = process.env.MONGODB_SECRET_CONECTION_KEY as string;

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

mongoose.connect(MONGODB_SECRET_CONECTION_KEY)
  .then(() => {
    const port = 3333;




    app.use((req, res, next) =>{
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', '*');
      res.setHeader('Access-Control-Allow-Headers', '*');
      next();
    });
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    console.log('conectado ao mongo');


    server.listen(port, () => {
      console.log(`🚀 Server is runnig on http://localhost:${port}`);
    });

  })
  .catch(() => console.log('erro ao conectar no mongodb'));

