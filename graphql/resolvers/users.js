const { UserInputError } = require('apollo-server');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { validateRegisterInput } = require('../../utils/validators.js');
const User = require('../../models/User.js');

const generateToken = ({ _id, email, username }) => {
    return jwt.sign({ _id, email, username }, config.secretKey, { expiresIn: '1h' });
};

module.exports = {
    Mutation: {
        async register(_, args) {
            let { username, email, password } = args.registerInput;
            const { errors, valid } = validateRegisterInput(args.registerInput);
            const user = await User.findOne({ username });

            if (user) {
                throw new UserInputError('Username is taken', { errors: { username: 'This username is taken' } });
            } else if (!valid) {
                throw new UserInputError('Errors', { errors });
            } else {
                password = await bcrypt.hash(password, 12);
                const newUser = new User({ email, username, password, createdAt: new Date().toISOString() });
                const result = await newUser.save();
                const token = generateToken(result);
                return { ...result._doc, id: result._id, token };
            }
        }
    }
};