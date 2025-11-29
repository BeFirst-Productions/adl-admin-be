import express from 'express'
import { createUser, deleteUser, getUsers, updateUser } from '../../controllers/adminController/user-creationController.js'
const userRoute =express.Router()

userRoute.get('/all-users',getUsers)
userRoute.post('/create-user',createUser)
userRoute.patch('/edit-user/:id',updateUser)
userRoute.delete("/delete-user/:id",deleteUser)

export default userRoute