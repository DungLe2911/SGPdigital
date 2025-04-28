import mongoose from "mongoose";

const areaSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['Picking', 'Machine', 'Sample'],
        required: true
    }
});

const Area = mongoose.model('Area', areaSchema);
export default Area;
