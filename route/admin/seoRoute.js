import express from 'express'
import { getSeo, saveSeo } from '../../controllers/adminController/seoController.js'
const seoRoute =express.Router()

seoRoute.post('/add-seo',saveSeo)
seoRoute.get('/get-seo',getSeo)

export default seoRoute