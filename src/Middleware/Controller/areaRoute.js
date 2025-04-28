// libraries import
import express from 'express';
import authenticateJWT from '../Passport/authenticateJWT.js';
import asyncErrorHandler from '../Utils/asyncErrorHandler.js';
import { validateRequest } from '../Utils/requestValidate.js';
import Area from '../Models/Area.js';

const areaRoute = express.Router();

// ---------------------------------------------------------------------------------------------------
areaRoute.route('/')
    .get(authenticateJWT, asyncErrorHandler(async(req, res)=>{
        console.log('in /areas (GET) all areas in database');
        const areas = await Area.find();
        return res.status(200).json(areas);
    }))
    

export default areaRoute;