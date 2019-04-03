import * as express from 'express'

import { payments } from '../data/payments'
import { UploadedFile } from 'express-fileupload';
import { dirname } from 'path';

const router = express.Router()

router.get('/', (req, res) => {
  const limit = parseInt(req.query.limit) || 25
  const offset = parseInt(req.query.offset) || 0

  res.send({
    payments: payments
      .sort((a, b) => {
        const valA = Date.parse(a.date)
        const valB = Date.parse(b.date)
    
        if (valA > valB) {
            return -1
        }
        if (valB > valA) {
            return 1
        }
        return 0
      })
      .slice(offset, offset + limit)
      .map((payment, index) => {
        return {
          ...payment,
          index: offset + index
        }
      }),
    total: payments.length
  })
})

router.get('/:id', (req, res) => {
  const payment = payments.find((payment) => payment.id === req.params.id)

  if (payment) {
    res.send(payment)
  } else {
    res.status(404)
  }
})

router.put('/:id', (req, res) => {
  const payment = payments.find((payment) => payment.id === req.params.id)

  if (payment) {
    payment.comment = req.body.comment || payment.comment
    res.status(200).send(payment)
  } else {
    res.status(404)
  }
})

router.post('/:id/receipts', (req, res) => {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  const id = req.params.id
  const payment = payments.find((payment) => payment.id === id)

  if (payment) {
    const receipt = req.files.receipt as UploadedFile
    const receiptId = `${id}-${payment.receipts.length}`
    receipt.mv(`${process.cwd()}/receipts/${receiptId}`, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
   
      payment.receipts.push({
        url: `/receipts/${receiptId}`
      })
      res.status(200).send(payment)
    })

  } else {
    res.status(404)
  }
})

export default router
