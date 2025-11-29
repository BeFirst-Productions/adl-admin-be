import express from 'express'
import { createBlog, getBlog, getBlogs } from '../../controllers/adminController/blogController.js'
import upload from '../../config/multer-cloudinary.js'
const blogRoute =express.Router()

blogRoute.post('/add-blog',upload.single("image"),createBlog)
blogRoute.get('/get-blogs',getBlogs)
blogRoute.get("/get-blog/:id",getBlog)

export default blogRoute