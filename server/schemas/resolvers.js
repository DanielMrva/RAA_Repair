const { User, Organization, Radio, Repair } = require('../models');
const { unwrapResolverError } = require('@apollo/server/errors');
const { signToken } = require('../utils/auth');
const { sign }=require('jsonwebtoken');
const mongoose = require('mongoose');
const { GraphQLError } = require('graphql');

const resolvers = {
    Query: {

        user: async (parent, { userId }) => {
            return User.findById({_id: userId});
        },
        users: async () => {
            return User.find();
        },
        allRadios: async () => {
            return Radio.find().populate(["serviceRecord"]);
        },
        radio: async ( parent, { radioId }) => {
            return Radio.findById({_id: radioId});
        },
        serialRadio: async ( parent, { serialNumber } ) => {
            return Radio.findOne({ serialNumber: serialNumber});
        },
        allRepairs: async () => {
            return Repair.find();
        },
        repair: async ( parent, { repairId }) => {
            return Repair.findById({_id: repairId});
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
                console.log('bad user', email);
                throw unwrapResolverError(badAttempt);
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {
                console.log('bad password', user);
                throw new unwrapResolverError(badAttempt);
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
        },
        addRepair: async (
            parent, 
                { 
                    radioSerial,
                    dateReceived,
                    endUserPO,
                    raaPO,
                    repairTag,
                    dateSentTech,
                    dateRecTech,
                    dateSentEU,
                    techInvNum,
                    raaInvNum,
                    symptoms,
                    testFreq,
                    incRxSens,
                    incFreqErr,
                    incMod,
                    incPowerOut,
                    outRxSens,
                    outFreqErr,
                    outMod,
                    outPowerOut,
                    accessories,
                    workPerformed,
                    repHours,
                    partsUsed,
                    remarks
                }
            ) => {

            try {
                const radio = await Radio.findOne({ serialNumber: radioSerial});


                if (!radio) {
                    throw new GraphQLError('Radio not found', {
                        extensions: {
                            code: 'RADIO_NOT_FOUND',
                            argumentName: 'radioSerial'
                        }
                    });
                }


                const repair = await Repair.create({
                    radioSerial,
                    dateReceived,
                    endUserPO,
                    raaPO,
                    repairTag,
                    dateSentTech,
                    dateRecTech,
                    dateSentEU,
                    techInvNum,
                    raaInvNum,
                    symptoms,
                    testFreq,
                    incRxSens,
                    incFreqErr,
                    incMod,
                    incPowerOut,
                    outRxSens,
                    outFreqErr,
                    outMod,
                    outPowerOut,
                    accessories,
                    workPerformed,
                    repHours,
                    partsUsed,
                    remarks
                });


                await Radio.findOneAndUpdate(
                    {serialNumber: repair.radioSerial},
                    {$addToSet: {serviceRecord: repair._id}}
                )


                return repair;
                
            } catch (error) {

                throw new GraphQLError('Failed to submit repair', {
                    extensions: {
                        code: 'SUBMIT_REPAIR_ERROR'
                    }
                })
            }

        }
    }
};

module.exports = resolvers;