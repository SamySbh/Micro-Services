import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Le nom est obligatoire'],
        trim: true,
        maxlength: [100, 'Le nom ne peut pas dépasser 100 caractères']
    },
    email: {
        type: String,
        required: [true, 'L\'email est obligatoire'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'L\'email est invalide']
    },
    password: {
        type: String,
        required: [true, 'Le mot de passe est obligatoire'],
        minlength: [6, 'Le mot de passe doit faire au moins 6 caractères']
    }

});

userSchema.plugin(uniqueValidator, { message: '{PATH} doit être unique' });

userSchema.pre('save', function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.methods.comparePassword = function(plainPassword) {
    return bcrypt.compareSync(plainPassword, this.password);
};



    const User = mongoose.model('User', userSchema);

export default User;