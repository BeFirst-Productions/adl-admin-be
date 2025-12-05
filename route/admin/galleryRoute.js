import express from 'express'
import { addGalleryImage, deleteGalleryImage, getGalleryImages } from '../../controllers/adminController/galleryController.js'
import { uploadGalleryImage } from '../../config/multer-cloudinary.js'
const galleryRoute =express.Router()

galleryRoute.post("/add-image", uploadGalleryImage.single("image"), addGalleryImage);
galleryRoute.get('/get-images',getGalleryImages)
galleryRoute.delete('/delete-image/:id',deleteGalleryImage)

export default galleryRoute