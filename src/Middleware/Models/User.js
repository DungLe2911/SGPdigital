import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ["QC", "Supervisor", "Admin"],
        default: "QC",
        required: true
    }, 
    machine:{
        type: String,
        enum: ["Picking", "Satake", "LMC", "Blower", "Sample", "Buhler"],
        default: "Picking",
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;