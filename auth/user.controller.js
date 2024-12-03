import User from './user.model.js';
import jwt from 'jsonwebtoken';

export async function registerUser(req, res) {
    try {

        const { name, email, password} = req.body;
        
        const newUser = new User({
            name,
            email,
            password,
        });
        const savedUser = await newUser.save();
        res.status(201).json({ user: savedUser, message: 'L\'utilisateur a bien été créé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'utilisateur', error: error.message });
    }
}

export async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Utilisateur non trouvé' });
        }
        if (!user.comparePassword(password)) {
            return res.status(401).json({ message: 'Mot de passe incorrect' });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
        res.status(200).json({ token, user, message: 'Connexion réussie' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error: error.message });
    }
}