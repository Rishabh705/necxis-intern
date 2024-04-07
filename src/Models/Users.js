import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    comments: [{
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true,
        },
        comment: {
            type: String,
            required: true
        }
    }],
    favoritePosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post',
    }]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
