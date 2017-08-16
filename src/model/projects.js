import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const projectSchema = new Schema({
    name: String,
    description: String,
    created: Date,
    updated: Date,
    users: [String],
});

const projects = mongoose.model('Projects', projectSchema);

export {
    projects as default,
};
