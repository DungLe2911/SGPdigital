const machineSchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g., "LMC 1", "Satake 3", "Belt 4"

    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    },

    groupType: {
        type: String,
        enum: ['LMC', 'Satake', 'Best', 'Buhler'],
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
