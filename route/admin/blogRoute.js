import express from 'express'
import { createBlog, deleteBlog, getBlog, getBlogs, updateBlog } from '../../controllers/adminController/blogController.js'
import upload from '../../config/multer-cloudinary.js'
const blogRoute =express.Router()

blogRoute.post('/add-blog',upload.single("image"),createBlog)
blogRoute.get('/get-blogs',getBlogs)
blogRoute.get("/get-blog/:id",getBlog)
blogRoute.put("/update-blog/:id",upload.single("image"),updateBlog)
blogRoute.delete("/delete-blog/:id",deleteBlog)

export default blogRoute