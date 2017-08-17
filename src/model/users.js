import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
    _id: String,
    username: String,
    profile: {
        name: String,
        password: String,
        accountAdmin: String,
        role: String,
    },
    services: {
        password: {
            bcrypt: String,
        },
    },
    createdAt: Date,
});

const users = mongoose.model('Users', userSchema);

export {
  users as default,
};
