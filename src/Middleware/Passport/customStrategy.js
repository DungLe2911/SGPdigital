import jwt from 'jsonwebtoken'
import User from '../Models/User.js';
import Machine from '../Models/Machine.js'
import Area from '../Models/Area.js'
import CustomStrategy from 'passport-custom';
import { Error } from 'mongoose';
import getRemainingShiftDuration from '../Utils/remainShiftTime.js';

const calculateShiftEndTime = () => {
    const now = new Date();
    const remainingTime = getRemainingShiftDuration();
    const shiftEndTime = new Date(now.getTime() + remainingTime);
    return shiftEndTime;
};


const customStrategy = new CustomStrategy.Strategy(async (req, done) => {
    console.log("Starting authentication process...");
    const { username } = req.body;
    let user;
    try {
        console.log("Searching for username:", username);
        user = await User.findOne({ "username": username });
        if (user) {
            if (!user.active) {
                const message = `${username} is inactive! Please contact supervisor`
                console.log(message);
                const err = new Error(message);
                return done(err);
            }
            const remainingShiftTime = getRemainingShiftDuration();
            const expiresIn = Math.floor(remainingShiftTime / 1000)
            const token = jwt.sign(
                {
                    id: user._id.toString(),
                    username: user.username,
                    role: user.role
                },
                'Middleroom',
                {
                    expiresIn: expiresIn
                }
            );
            const machineList = await Machine
                .find({ _id: { $in: user.assignedMachine } })
                .populate('area')
                .lean()
            const transformedMachines = machineList.map(machine => ({
                ...machine,
                area: machine.area.type // Replace area object with just the type value
            }));

            console.log("JWT created successfully");
            const userObject = user.toObject();
            delete userObject.assignedMachine;
            userObject.assignedMachine = transformedMachines;
            return done(null, { userObject, token });

        } else {
            console.log("User NOT FOUND!");
            const err = new Error("Incorrect username")
            return done(err);
        }
    } catch (err) {
        console.error("Error in authentication process:", err);
        return done(err);
    }
}
);

export default customStrategy;