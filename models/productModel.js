const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },

  price: { type: Number, default: 0, required: true },
  category: { type: String, required: true },
  brand: { type: String, required: true },
  description: { type: String, required: true },
});

const ProductsModel = mongoose.model('Products', productSchema);

module.exports = ProductsModel;
