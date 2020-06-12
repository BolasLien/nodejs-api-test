import mongoose from 'mongoose'
import Unique from 'mongoose-unique-validator'
import validator from 'validator'

const Schema = mongoose.Schema

mongoose.connect('mongodb://127.0.0.1:27017/product', { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.plugin(Unique)

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, '商品名稱必填'],
    minlength: [2, '商品名稱最少 2 個字'],
    maxlength: [20, '商品名稱最多 20 個字']
  },
  price: {
    type: Number,
    required: [true, '商品價格必填'],
    minlength: [1, '商品價格最少 1 個數字'],
    maxlength: [20, '商品價格最多 20 個數字']
  },
  description: {
    type: String,
    required: [true, '商品描述必填'],
    minlength: [1, '商品說明最少 1 個字'],
    maxlength: [200, '商品說明最多 200 個字']
  },
  count: {
    type: Number,
    required: [true, '商品庫存量必填'],
    minlength: [1, '商品庫存量最少 1 個數字'],
    maxlength: [200, '商品庫存量最多 200 個數字']
  }
})

const product = mongoose.model('product', productSchema)

export default {
  product
}
