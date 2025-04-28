import mongoose from "mongoose";

const machineSchema = new mongoose.Schema({
    name: { 
        type: String,
        unique: true,
        required: true 
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    },

    groupType: {
        type: String,
        required: function () {
            // only required if the area is a Machine type
            return this._areaType === 'Machine';
        }
    }
});

machineSchema.pre('validate', async function (next) {
    if (this.area) {
        const Area = mongoose.model('Area');
        const areaDoc = await Area.findById(this.area);
        if (areaDoc) {
            this._areaType = areaDoc.type; // virtual helper for conditional logic
        }
    }
    next();
});


const Machine = mongoose.model('Machine', machineSchema);
export default Machine;
