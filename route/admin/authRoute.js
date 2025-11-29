import express from 'express'
import { login } from '../../controllers/adminController/authController.js'
const authRoute = express.Router()

authRoute.post('/login',login)
export default authRoute