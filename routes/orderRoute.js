const express = require('express');
const OrdersModel = require('../models/orderModel');
const { isAuth, isAdmin } = require('../utils');
var dateFormat = require('dateformat');
var now = new Date();

const router = express.Router();

router.get('/', isAuth, isAdmin, async (req, res) => {
  const orders = await OrdersModel.find({}).populate('user');
  res.send(orders);
});

router.get('/me', isAuth, async (req, res) => {
  const orders = await OrdersModel.find({ user: req.user._id });
  res.send(orders);
});

router.post('/', isAuth, async (req, res) => {
  const orderCreated = new OrdersModel({
    orderItems: req.body.orderItems,
    user: req.user._id,
    shipping: req.body.shipping,
    payment: req.body.payment,
    itemsPrice: req.body.itemsPrice,
    taxPrice: req.body.taxPrice,
    shippingPrice: req.body.shippingPrice,
    totalPrice: req.body.totalPrice,
  });
  const newOrderCreated = await orderCreated.save();
  res.status(201).send({ message: 'New Order Created', data: newOrderCreated });
});

router.get('/:id', isAuth, async (req, res) => {
  try {
    const product = await OrdersModel.findById(req.params.id);
    if (!product) {
      return res.status(400).send({ msg: 'Product not found' });
    }
    res.send(product);
  } catch (error) {
    console.error(error.message);
    if (error.kind == 'ObjectId') {
      return res.status(404).send({ message: 'Product Not found' });
    }
    res.status(400).json({ msg: 'Server Error' });
  }
});

router.put('/deliver/:id', isAuth, isAdmin, async (req, res) => {
  const orderdeliver = await OrdersModel.findById(req.params.id);

  if (orderdeliver) {
    (orderdeliver.isPaid = true),
      (orderdeliver.isDelivered = true),
      (orderdeliver.deliveredAt = Date.now());
    await orderdeliver.save();
  }
  res.send({ message: 'Order Paid.', order: orderdeliver });
});

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const order = await OrdersModel.findOne({ _id: req.params.id });
  if (order) {
    const deletedOrder = await order.remove();
    res.send(deletedOrder);
  } else {
    res.status(404).send('Order Not Found.');
  }
});

module.exports = router;
