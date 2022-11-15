import express from 'express';
import mongoose from 'mongoose';



mongoose.connect('mongodb+srv://jpmesquita:Chocolate22*@cluster0.cpyz48o.mongodb.net/test')
  .then(() => {
    const app = express();
    const port = 3333;

    console.log('conectado ao mongo');
    app.listen(port, () => {
      console.log(`🚀 Server is runnig on http://localhost:${port}`);
    });

  })
  .catch(() => console.log('erro ao conectar no mongodb'));

