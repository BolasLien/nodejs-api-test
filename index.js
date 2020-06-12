import express from 'express'
import bodyParser from 'body-parser'
import db from './db.js'

const app = express()

app.use(bodyParser.json())

// 新增資料
app.post('/new', async (req, res) => {
  console.log(req.body)
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
  }

  try {
    const result = await db.product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      count: req.body.count
    })

    res.status(200)
    res.send({ success: true, message: '新增資料成功', id: result._id })
  } catch (error) {
    const key = Object.keys(error.errors)[0]
    const msg = error.errors[key].message

    res.status(400)
    res.send({ success: false, message: msg })
  }
})

// 修改資料
app.patch('/update', async (req, res) => {
  if (!req.headers['content-type'].includes('application/json')) {
    res.status(400)
    res.send({ success: false, message: '格式不符' })
  }

  if (req.params.type !== 'name' &&
  req.params.type !== 'price' &&
  req.params.type !== 'description' &&
  req.params.type !== 'count'
  ) {
    res.status(400)
    res.send({ success: false, message: '更新欄位不符' })
    return
  }

  try {
    const result = await db.product.findByIdAndUpdate(req.body.id, { [req.params.type]: req.body.data })

    res.status(200)
    res.send({ success: true, message: req.params.type + '資料更新成功', id: result._id })
  } catch (error) {
    res.status(400)
    res.send({ success: false, message: '欄位不正確' })
  }
})

// 刪除資料
app.delete('/delete', async (req, res) => {

})

// 查詢單筆商品資料
app.get('/product', async (req, res) => {
  if (req.query.id === undefined) {
    res.status(400)
    res.send({ success: false, message: '欄位不正確' })
  }

  try {
    const result = await db.product.findById(req.query.id, '-_id')

    res.status(200)
    res.send({
      success: true,
      message: '資料查詢成功',
      name: result.name,
      price: result.price,
      description: result.description,
      count: result.count
    })
  } catch (error) {
    console.log(error.message)
    res.status(400)
    res.send({ success: false, message: '無此項目' })
  }
})

// 查詢所有商品資料
app.get('/all', async (req, res) => {
  try {
    const result = await db.product.find()

    res.status(200)
    res.send({
      success: true,
      message: '資料查詢成功',
      products: result
    })
  } catch (error) {
    console.log(error.message)
    res.status(400)
    res.send({ success: false, message: '無此項目' })
  }
})

// 查詢庫存商品資料
app.get('/instock', async (req, res) => {
  try {
    const result = await db.product.find()

    res.status(200)
    res.send({
      success: true,
      message: '資料查詢成功',
      products: result.filter(item => item.count > 0)
    })
  } catch (error) {
    console.log(error.message)
    res.status(400)
    res.send({ success: false, message: '無此項目' })
  }
})

app.listen(3333, () => {
  console.log('網頁伺服器已啟動')
  console.log('http://localhost:3333')
})
