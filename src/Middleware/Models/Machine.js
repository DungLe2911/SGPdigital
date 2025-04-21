import mongoose from "mongoose";

const machineSchema = new mongoose.Schema({
    machine: {
        type: String,
        enum: ["Picking", "Satake", "LMC", "Blower", "Sample", "Buhler"],
        required: true
    },
    lineNumber: {
        type: Number,
        required: true
    }
});

const Machine = mongoose.model('Machine', machineSchema);
export default Machine;
