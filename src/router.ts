import { Router } from 'express';

export const router = Router();


//  List categories
router.get('/categorires', (req, res) => {
  res.send('OK');
});


//  Create Category
router.post('/categorires', (req, res) => {
  res.send('OK');
});


//  List Products
router.get('/products', (req, res) => {
  res.send('OK');
});


//  Create Product
router.post('/products', (req, res) => {
  res.send('OK');
});


//  Get products by category
router.get('/categories/:categoryId/products', (req, res) => {
  res.send('OK');
});


//  List orders
router.get('/orders', (req, res) => {
  res.send('OK');
});

//  Create order
router.post('/orders', (req, res) => {
  res.send('OK');
});

// Change order status
router.patch('/orders', (req, res) => {
  res.send('OK');
});

// Delete/cancel order
router.delete('/orders', (req, res) => {
  res.send('OK');
});
