import jwt from 'jsonwebtoken'
import User from '../Models/User.js';
import CustomStrategy from 'passport-custom';
import { Error } from 'mongoose';

const customStrategy = new CustomStrategy.Strategy(async (req, done) => {
        console.log("Starting authentication process...");
        const {username} = req.body;
        let user;
        try {
            console.log("Searching for username:", username);
            user = await User.findOne({ "username": username });
            if (user) {
                const token = jwt.sign(
                    {
                        id: user._id.toString(),
                        username: user.username,
                        role: user.role
                    },
                    'Middleroom',
                    {
                        expiresIn: '1h'
                    }
                );
                console.log("JWT created successfully");
                const userObject = user.toObject();
                return done(null, {userObject, token });
                
            } else {
                console.log("User NOT FOUND!");
                const err= new Error("Incorrect username")
                return done(err);
            }
        } catch (err) {
            console.error("Error in authentication process:", err);
            return done(err);
        }
    }
);

export default customStrategy;