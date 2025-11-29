import express from 'express'
import userRoute from './userRoute.js'
import authRoute from './authRoute.js'
import faqRoute from './faqRoute.js'
import enquiryRoute from './enquiryRoute.js'
import blogRoute from './blogRoute.js'
const adminroute =express.Router()
adminroute.use('/user',userRoute)
adminroute.use('/auth',authRoute)
adminroute.use('/faq',faqRoute)
adminroute.use('/enquiry',enquiryRoute)
adminroute.use('/blog',blogRoute)
export default adminroute