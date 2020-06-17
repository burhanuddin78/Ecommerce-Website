const mongoose = require('mongoose');
var dateFormat = require('dateformat');
var now = new Date();

const shippingSchema = {
  address: { type: String },
  city: { type: String },
  postalCode: { type: Number },
  country: { type: String },
};

const paymentSchema = {
  paymentMethod: { type: String, required: true },
};

const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: String, required: true },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required: true,
  },
});

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderItems: [orderItemSchema],
    shipping: shippingSchema,
    payment: paymentSchema,
    isPaid: { type: Boolean, default: false },
    itemsPrice: { type: Number },
    taxPrice: { type: Number },
    shippingPrice: { type: Number },
    totalPrice: { type: Number },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const OrdersModel = mongoose.model('Orders', orderSchema);

module.exports = OrdersModel;
