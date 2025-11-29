import express from 'express'
import { addFAQ, deleteFAQ, editFAQOrder, getFAQs, homeFAQ, updateFAQ } from '../../controllers/adminController/faqController.js'
const faqRoute =express.Router()

faqRoute.get('/all-faqs',getFAQs)
faqRoute.post('/create-faq',addFAQ)
faqRoute.patch('/edit-faq/:id',updateFAQ)
faqRoute.patch('/edit-home-faq/:id',homeFAQ)
faqRoute.patch('/edit-faq-order/:id',editFAQOrder)
faqRoute.delete("/delete-faq/:id",deleteFAQ)

export default faqRoute 