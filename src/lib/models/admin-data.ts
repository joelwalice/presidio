import {Schema, model, models} from "mongoose";

const adminSchema = new Schema({
    name: String,
    email: { type: String, unique: true},
    password: String,
    role: String,
});

const admin = models.admin || model('admin', adminSchema);

export default admin;
