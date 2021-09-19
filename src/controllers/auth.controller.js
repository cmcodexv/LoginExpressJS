import validator from 'validator';
import User from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config';

export const signUp = async(req, res) => {
    // capture data 
    const { username, email, password } = req.body;

    // array of validation
    const validate = [
        !validator.isEmpty(username), 
        !validator.isEmpty(email), 
        validator.isEmail(email), 
        !validator.isEmpty(password)
    ];
    // validate array data and if there is incorrect data return
    if (validate.every(v => v === true)) {
        // Create the object
        const newUser = new User({
            username,
            email,
            password: await User.encryptPassword(password),
            status: true
        });
    
        const savedUser = await newUser.save();
        // // Response success
        const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
            expiresIn: 86400 // 24 Hours
        });
    
        res.status(201).json(token);
    } else {
        // Return error
        res.status(200).json({ message: 'Incorrect data' });
    }

}

export const signIn = async(req, res) => {

    const { email, password } = req.body;
    const userFound = await User.findOne({ 'email': email , 'status': true}).populate("idRole");

    // Incorrect data
    if (!userFound) return res.status(200).json({ message: 'User not found' });

    const matchPassword = await User.comparePassword(password, userFound.password);

    if (!matchPassword) return res.status(401).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
        expiresIn: 86400 // 24 Hours
    });

    res.status(200).json({ token });
}