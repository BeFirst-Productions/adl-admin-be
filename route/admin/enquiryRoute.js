import express from 'express'
import { addEnquiry, deleteEnquiry, getAllEnquiries } from '../../controllers/adminController/enquiryController.js'
const enquiryRoute =express.Router()

enquiryRoute.get('/all-enquiries',getAllEnquiries)
enquiryRoute.post('/create-enquiry',addEnquiry)
enquiryRoute.delete("/delete-enquiry/:id",deleteEnquiry)

export default enquiryRoute