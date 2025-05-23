import mongoose from 'mongoose';


const recordSchema = new mongoose.Schema({
    name: String,
    size: {
        type: String,
        enum: ['Midget', 'Small', 'Small/Medium', 'Medium', 'Large/Medium', 'Large', 'Extra Large', 'Halves']
    },
    hardShellCount: Number,
    innerShellCount: Number,
    wormCount: Number,
    blackPieces: Number,
    other: String,
    shift: {
        type: Number,
        enum: [1, 2, 3]
    },
    submittedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    machine: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine',
        required: true
    },

    // These will be conditionally required
    lineNumber: Number,
    trackingNumber: String,
    picker: String,
    moisture: Number

}, {
    timestamps: true
});

//NOTE: may consider taking tracking out of the model. Might cause CHAOS on the floor

recordSchema.pre('validate', async function (next) {
    const record = this;

    if (!record.machine) return next(); // Will trigger default "required" check

    try {
        const Machine = mongoose.model('Machine');
        const machine = await Machine.findById(record.machine);

        if (!machine) {
            return next(new Error('Invalid machine reference.'));
        }

        const areaType = machine.areaType?.toLowerCase();
        const machineType = machine.machine?.toLowerCase();

        const missing = field => record[field] == null || record[field] === '';

        if (areaType === 'picking' && (missing('picker') || missing('moisture'))) {
            return next(new Error('Picking requires spicker, and moisture.'));
        }

        next();
    } catch (err) {
        next(err);
    }
});


const Record = mongoose.model('Record', recordSchema);
export default Record;