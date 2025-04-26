import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["QC", "Supervisor", "Admin"],
        default: "QC",
    },
    shift: {
        type: Number,
        enum: [1, 2, 3],
    },

    assignedMachine: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Machine',
    }],

    active: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;