import mongoose from "mongoose";

const machineSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    areaType:{
        type: String,
        enum: ['Picking', 'Machine', 'Sample'],
        reuired: true
    },
    machine:{
        type: String,
        enum: ['LMC', 'Satake', 'Best', 'Buhler'],
    },
});

const Machine = mongoose.model('Machine', machineSchema);
export default Machine;
