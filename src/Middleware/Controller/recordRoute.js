// libraries import
import express from 'express';
import authenticateJWT from '../Passport/authenticateJWT.js';
import asyncErrorHandler from '../Utils/asyncErrorHandler.js';
import { validateRequest } from '../Utils/requestValidate.js';
import Record from '../Models/Record.js';

const recordRoute = express.Router();

// ---------------------------------------------------------------------------------------------------
recordRoute.route('/')
    .post(authenticateJWT, validateRequest(Record.schema), asyncErrorHandler(async(req, res)=>{
        console.log('in /records (POST) saving a new QC record into database');
        const payload = req.body
        const record = await new Record(payload).save();
        return res.status(200).json(record);
    }))
    

export default recordRoute;