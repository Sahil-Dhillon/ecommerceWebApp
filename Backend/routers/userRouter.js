import express from "express";
import expressAsyncHandler from "express-async-handler";
import { data } from "../mainServicesData.js";
import User from "../models/userModel.js";
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils.js";
const UserRouter = express.Router()

UserRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await User.remove({})
    const createdUser = await User.insertMany(data.users)
    res.send({ createdUser })
}))

UserRouter.post('/signin', expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send(
                {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    savedAddress: user.savedAddress,
                    cart: user.cartItems,
                    token: generateToken(user)
                }
            )
            return
        }
    }
    res.status(401).send({ message: 'Invalid email or password' })
}))
UserRouter.post('/signup', expressAsyncHandler(async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    })
    const createdUser = await user.save()
    res.send(
        {
            _id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser)
        }
    )

}))
export default UserRouter