// libraries import
import express from 'express';
import authenticateJWT from '../Passport/authenticateJWT.js';
import asyncErrorHandler from '../Utils/asyncErrorHandler.js';
import { validateRequest } from '../Utils/requestValidate.js';
import Machine from '../Models/Machine.js';

const machineRoute = express.Router();

// ---------------------------------------------------------------------------------------------------
machineRoute.route('/')
    .get(authenticateJWT, asyncErrorHandler(async(req, res)=>{
        console.log('in /machines (GET) all machines in database');
        const machines = await Machine.find();
        return res.status(200).json(machines);
    }))
    .post(authenticateJWT, validateRequest(Machine.schema), asyncErrorHandler(async(req, res)=>{
        console.log('in /machines (POST) saving a new machine into');
        const payload = req.body
        const newMachine = {
            name: payload.name,
            area: payload.area,
            groupType: payload.groupType
        }

        const machine = await new Machine(newMachine).save();
        return res.status(200).json(machine);
    }))
    

export default machineRoute;