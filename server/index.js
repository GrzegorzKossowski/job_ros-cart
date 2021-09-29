import express from 'express'
import bodyParser from 'body-parser'
import colors from 'colors'
import cors from 'cors'

// fake data from fake DB
import { db } from './data.js'
const products = db.data.products

const app = express()
app.use(express.json())
app.use(cors())

app.get(['/', '/products'], (req, res, next) => {
  if (req.query.ids) {
    const inCartProducts = products.filter(el => req.query.ids.includes(el.id))
    return res.status(200).json({ data: inCartProducts })
  }

  res.status(200).json(db)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server startet at port ${PORT}`.yellow);
})