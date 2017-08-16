import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const userSchema = new Schema({
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

const user = mongoose.model('User', userSchema);

export {
  user as default,
};
