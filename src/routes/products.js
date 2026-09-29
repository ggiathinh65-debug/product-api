const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// CREATE
router.post('/', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'pid đã tồn tại' });
    }
    res.status(400).json({ message: err.message });
  }
});

// READ tất cả
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// READ một sản phẩm
router.get('/:pid', async (req, res) => {
  const product = await Product.findOne({ pid: req.params.pid });
  if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  res.json(product);
});

// UPDATE
router.put('/:pid', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { pid: req.params.pid },
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
    res.json(product);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ message: 'pid đã tồn tại' });
    }
    res.status(400).json({ message: err.message });
  }
});

// DELETE
router.delete('/:pid', async (req, res) => {
  const product = await Product.findOneAndDelete({ pid: req.params.pid });
  if (!product) return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
  res.json({ message: 'Đã xóa', product });
});

module.exports = router;