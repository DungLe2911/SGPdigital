// libraries import
import express from 'express';
import passport from 'passport';
import authenticateJWT from '../Passport/authenticateJWT.js';
import asyncErrorHandler from '../Utils/asyncErrorHandler.js';
import User from '../Models/User.js';
import { validateRequest } from '../Utils/requestValidate.js';

const userRoute = express.Router();

// ---------------------------------------------------------------------------------------------------
userRoute.route('/')
    //get all users
    .get(authenticateJWT, asyncErrorHandler(async (req, res) => {
        console.log('in /users (GET) all users in database');
        const messages = await User.find();
        return res.status(200).json(messages);
    }))
    .post(authenticateJWT, validateRequest(User.schema), asyncErrorHandler(async (req, res) => {
        console.log('in /users (GET) save a new user in database');
        const payload = req.body
        console.log(payload)
        const newUser = {
            username: payload.username,
            firstName: payload.firstName,
            lastName: payload.lastName,
            role: payload.role,
            shift: payload.shift,
            assignedMachine: payload.assignedMachine,
            active: payload.active,
        }

        const user = await new User(newUser).save();
        return res.status(200).json(user);
    }))


userRoute.route('/:userID')
    .put(authenticateJWT, validateRequest(User.schema), asyncErrorHandler(async (req, res) => {
        const userID = req.params.userID
        console.log('in /users/:userID (POST) update user with ID:', userID);
        const payload = req.body
        const user = await User.findByIdAndUpdate(userID, payload, {new: true});
        return res.status(200).json(user);
    }))

export default userRoute;