import { Schema } from 'mongoose';

const projectSchema = new Schema({
    name: String,
    description: String,
    created: Date,
    updated: Date,
    users: [String],
});

export {
    projectSchema as default,
};
