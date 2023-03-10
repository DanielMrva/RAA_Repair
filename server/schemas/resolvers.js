const {User, Organization, Radio, Repair} = require('../models');
const {AuthenticationError} = require('@apollo/server');
const {signToken} = require('../utils/auth');
const {sign}=require('jsonwebtoken');
const mongoose = require('mongoose');

const resolvers = {
    Query: {
        // me: async (parent, { _id }) => {
        //     const params = _id ? { _id } : {};
        //     return User.find(params);
        // },
        user: async (parent, { userId }) => {
            return User.findOne({_id: userId});
        },
        users: async () => {
            return User.find();
        },
        allRadios: async () => {
            return Radio.find().populate(["serviceRecord"]);
        },
        allRepairs: async () => {
            return Repair.find();
        },
        orgRadios: async (parent, {orgName}) => {
            return Organization.find({orgName: orgName}).populate(["radios"]);
        },
        orgUsers: async (parent, {orgName}) => {
            return User.find({orgName: orgName});
        }
    },
    Mutation: {
        addUser: 
            async (parent, {
                username, email, password, orgName
            }) =>  {
            
            const user = await User.create({ username, email, password, orgName});
            const token = signToken(user);
        
            return { token, user}
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            const badAttempt = "Email or password has failed, please try again!";

            if (!user) {
                console.log('bad user', user);
                throw new AuthenticationError(badAttempt);
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                console.log('bad password', user);
                throw new AuthenticationError(badAttempt);
            }

            const token = signToken(user);
            // console.log(`Token: ${token}, User: ${user}`);

            return { token, user}
        },
        validateAccess: async (parent, {username, accessLevel}) => {
            const user = await User.findOneAndUpdate({username: username}, { $set: { accessLevel: accessLevel}});

            if (!user) {
                console.log('bad user', {username, accessLevel} );
                return {username, accessLevel}
            }

            return user;
        }
    }
};

module.exports = resolvers;