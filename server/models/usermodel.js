const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    tasks: [{
        isCompleted: {
            type: Boolean,
            required: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        }
    }]
});

UserSchema.pre('save', async function (next) {
    if (this.isModified("password")) {
        const hash = await bcrypt.hash(this.password, 8);
        this.password = hash;
    }
    next();
});

UserSchema.methods.generateToken = async function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_KEY, {
        expiresIn: '2h'
    });
    return token
}

UserSchema.statics.doesUserExists = async function (body) {
    const email = body.email;
    const password = body.password;

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User does not exists");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch);
    if (!isMatch) {
        throw new Error("Incorrect Credentials");
    }

    return user;
}

const User = mongoose.model('User', UserSchema);
module.exports = User;
