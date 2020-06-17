const express = require('express');
const router = express.Router();
const ProductsModel = require('../models/productModel');
const { isAuth, isAdmin } = require('../utils');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
  const products = await ProductsModel.find({});
  res.send(products);
});

router.get('/:id', async (req, res) => {
  const product = await ProductsModel.findOne({ _id: req.params.id });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ msg: 'Product Not found' });
  }
});

router.post('/', isAuth, isAdmin, upload.single('image'), async (req, res) => {
  const { name, price, brand, category, description } = req.body;

  console.log(req.file);

  const product = new ProductsModel({
    name,
    price,
    image: req.file.path,
    brand,
    category,
    description,
  });

  const newProduct = await product.save();
  if (newProduct) {
    return res
      .status(201)
      .send({ message: 'New Product Created', data: newProduct });
  }
  return res.status(500).send({ message: 'Error in Creating Product' });
});

router.put(
  '/:id',
  isAuth,
  isAdmin,
  upload.single('image'),
  async (req, res) => {
    const productId = req.params.id;
    const product = await ProductsModel.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.file.path;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      const updatedProduct = await product.save();
      if (updatedProduct) {
        return res
          .status(200)
          .send({ message: 'Product Updated', data: updatedProduct });
      }
    }
    return res.status(200).send({ message: ' Error in Updating Product.' });
  }
);

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const deletedProduct = await ProductsModel.findById(req.params.id);

  if (deletedProduct) {
    await deletedProduct.remove();
    res.send({ msg: 'Product Deleted' });
  } else {
    res.send('Error in deletion');
  }
});

module.exports = router;
