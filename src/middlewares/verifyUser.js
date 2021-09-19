import User from '../models/User';

export const checkDuplicateEmail = async (req, res, next) => {
    
    const user = await User.findOne({email: req.body.email} );

    if (user) return res.status(400).json({ message: 'The user already exists' });

    next();
}