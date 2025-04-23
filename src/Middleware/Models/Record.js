import mongoose from 'mongoose';


const recordSchema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
    },
    size: String,
    hardShellCount: Number,
    innerShellCount: Number,
    ribShellCount: Number,
    wormCount: Number,
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

        // Conditional validations
        if (areaType === 'picking') {
            if (record.lineNumber == null || !record.picker || !record.trackingNumber) {
                return next(new Error('Picking requires lineNumber, picker, and trackingNumber.'));
            }
        } else if (machineType === 'lmc') {
            if (record.lineNumber == null) {
                return next(new Error('LMC requires lineNumber.'));
            }
        } else if (machineType === 'satake') {
            if (record.lineNumber == null || !record.trackingNumber) {
                return next(new Error('Satake requires lineNumber and trackingNumber.'));
            }
        } else if (machineType === 'buhler') {
            if (record.lineNumber == null) {
                return next(new Error('Buhler requires lineNumber.'));
            }
        } else if (areaType === 'sample') {
            if (!record.trackingNumber) {
                return next(new Error('Sample requires trackingNumber.'));
            }
        }
        next();
    } catch (err) {
        next(err);
    }
});


const Record = mongoose.model('Record', recordSchema);
export default Record;