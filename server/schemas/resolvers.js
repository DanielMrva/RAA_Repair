const { User, Organization, Radio, Repair, Location } = require('../models');
const { unwrapResolverError } = require('@apollo/server/errors');
const { signToken } = require('../utils/auth');
const { sign } = require('jsonwebtoken');
const mongoose = require('mongoose');
const { GraphQLError, graphql } = require('graphql');

// TODO: Add Resolver Error Handling Per:

// Query: {
//     orgNames: async () => {
//       try {
//         const organizations = await Organization.find();
//         return organizations;
//       } catch (error) {
//         throw new Error("Failed to fetch organization names.");
//       }
//     }
//   }



const resolvers = {
    Query: {

        user: async (parent, { userId }) => {
            return User.findById({ _id: userId });
        },
        users: async () => {
            return User.find();
        },
        allRadios: async () => {
            return Radio.find().populate(["serviceRecord"]);
        },
        radio: async (parent, { radioId }) => {
            return Radio.findById({ _id: radioId }).populate(["serviceRecord"]);
        },
        serialRadio: async (parent, { serialNumber }) => {
            return Radio.findOne({ serialNumber: serialNumber });
        },
        allRepairs: async () => {
            return Repair.find();
        },
        repair: async (parent, { repairId }) => {
            return Repair.findById({ _id: repairId });
        },
        orgRadios: async (parent, { orgName }) => {
            return Radio.find({ orgName: orgName }).populate(["serviceRecord"]);
        },
        orgUsers: async (parent, { orgName }) => {
            return User.find({ orgName: orgName });
        },
        orgNames: async () => {
            return Organization.find();
        },
        // org: async (parent, { orgId }) => {
        //     return Organization.findById({ _id: orgId }).populate(["users", "radios"]);
        // },
        // allOrgs: async () => {
        //     return Organization.find().populate(["users", "radios"])
        // },
        org: async (parent, { orgId }) => {
            return Organization.findById({ _id: orgId }).populate(["users", "locations"]);
        },
        allOrgs: async () => {
            return Organization.find().populate(["users", "locations"])
        },
        allLocations: async () => {
            return Location.find().populate(["radios"]);
        },
        location: async (locationId ) => {
            return Location.findById({ _id: locationId }).populate("radios");
        },
        orgLocations: async(parent, { orgName }) => {
            return Location.find({ orgName: orgName}).populate("radios")
        },
        locationNames: async () => {
            return Location.find();
        },

    },
    Mutation: {
        addUser:
            async (parent, {
                username, email, password, orgName, accessLevel
            }) => {

                const user = await User.create({ username, email, password, orgName, accessLevel });
                const token = signToken(user);

                return { token, user }
            },
        // End Add User

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

            return { token, user }
        },
        // End Login

        validateAccess: async (parent, { username, accessLevel }) => {
            const user = await User.findOneAndUpdate({ username: username }, { $set: { accessLevel: accessLevel } });

            if (!user) {
                console.log('bad user', { username, accessLevel });
                return { username, accessLevel }
            }

            return user;
        },
        // End Validate Access

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
                const radio = await Radio.findOne({ serialNumber: radioSerial });


                if (!radio) {
                    throw new GraphQLError('Radio not found', {
                        extensions: {
                            code: 'RADIO_NOT_FOUND',
                            argumentName: 'radioSerial'
                        }
                    });
                }

                const highestRepair = await Repair.find({}).sort({ repairTag: -1 }).limit(1);
                console.log(highestRepair)

                const highestRepairTag = highestRepair[0].repairTag;
                console.log(`HRT: ${highestRepairTag}`);
                const newRepairTag = (highestRepairTag + 1);



                const repair = await Repair.create({
                    radioSerial,
                    dateReceived,
                    endUserPO,
                    raaPO,
                    repairTag: newRepairTag,
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
                    { serialNumber: repair.radioSerial },
                    { $addToSet: { serviceRecord: repair._id } }
                )

                return repair;

            } catch (error) {


                console.error('Error submitting repair:', error)


                throw new GraphQLError('Failed to submit repair', {
                    extensions: {
                        code: 'SUBMIT_REPAIR_ERROR'
                    }
                })
            }

        },
        // End Add Repair

        addRadio: async (
            parent, {
                orgName,
                locationName,
                dateSold,
                dateEntered,
                inventoryNumber,
                make,
                model,
                progChannels,
                notes,
                serialNumber,
                serviceRecord,
                warranty,
                refurb,
                radioType
            }
        ) => {
            try {

                const existingRadio = await Radio.findOne(
                    {
                        model: model,
                        serialNumber: serialNumber
                    }
                );

                if (existingRadio) {
                    throw new GraphQLError('Radio already exists', {
                        extensions: {
                            code: 'RADIO_EXISTS',
                            argumentName: 'model, serialNumber'
                        }
                    });
                }

                const newRadio = await Radio.create({
                    orgName,
                    locationName,
                    dateSold,
                    dateEntered,
                    inventoryNumber,
                    make,
                    model,
                    progChannels,
                    notes,
                    serialNumber,
                    serviceRecord,
                    warranty,
                    refurb,
                    radioType
                });

                // await Organization.findOneAndUpdate(
                //     { orgName: orgName },
                //     { $addToSet: { radios: newRadio._id } }
                // );

                await Location.findOneAndUpdate(
                    { locationName: locationName },
                    { $addToSet: { radios: newRadio._id } }
                );

                return newRadio;

            } catch (error) {


                throw new GraphQLError('Failed to submit radio', {
                    extensions: {
                        code: 'SUBMIT_RADIO_ERROR'
                    }
                });
            }
        },
        // End Add Radio

        addOrg: async (parent, { orgName }) => {
            try {

                const existingOrg = await Organization.findOne(
                    {
                        orgName: orgName
                    }
                );

                if (existingOrg) {
                    throw new GraphQLError('Organization already exists', {
                        extensions: {
                            code: 'ORG_EXISTS',
                            argumentName: 'orgName'
                        }
                    });
                }

                const org = await Organization.create({ orgName });

                return org;


            } catch (error) {

                throw new GraphQLError('Failed to submit organization', {
                    extensions: {
                        code: 'SUBMIT_ORG_ERROR'
                    }
                });
            }
        },
        // End Add Org
        
        addLocation: async (
            parent, 
            {
                locationName,
                orgName,
                street,
                city,
                state,
                zip,
                country,
                phone,
                contactEmail,
                primaryContact
            }
            
        ) => {

            try {
                const existingLocation = await Location.findOne(
                    {
                        orgName: orgName,
                        locationName: locationName
                    }
                );

                if (existingLocation) {
                    throw new GraphQLError(`Location of ${locationName} for ${orgName} already exists. Please try again`, {
                        extensions: {
                            code: 'LOCATION_EXISTS',
                            argumentName: 'locationName, orgName'
                        }
                    });
                };

                const newLocation = await Location.create({
                    locationName,
                    orgName,
                    street,
                    city,
                    state,
                    zip,
                    country,
                    phone,
                    contactEmail,
                    primaryContact
                });

                await Organization.findByIdAndUpdate(
                    {orgName: newLocation.orgName},
                    { $addToSet: {locations: newLocation._id} }
                );

                return newLocation;
            }

            catch(error) {
                throw new GraphQLError('Failed to submit location', {
                    extensions: {
                        code: 'SUBMIT_LOCATION_ERROR'
                    }
                });
            }

        },
        // End Add Location


        editRepair: async (parent, { _id, updates }) => {

            console.log(`id: ${_id}`)
            console.log(`updates: ${updates}`)
            try {
                const repair = await Repair.findOneAndUpdate({ _id }, { $set: updates }, { new: true });

                if (!repair) {
                    throw new GraphQLError('Repair Not Found', {
                        extensions: {
                            code: 'Edit_Repair_Error'
                        }
                    })
                }

                return repair;
            } catch (error) {
                console.log(`resolver error: ${error}`);
                throw new GraphQLError('Failed to edit repair')
            }
        },
        // End Edit Repair

        editRadio: async (parent, { _id, updates }) => {
            try {
                const radio = await Radio.findOneAndUpdate({ _id }, { $set: updates }, { new: true });

                if (!radio) {
                    throw new GraphQLError('Radio Not Found', {
                        extensions: {
                            code: 'Edit_Radio_Error'
                        }
                    })
                }

                return radio;
            } catch (error) {
                console.log(`resolver error: ${error}`);
                throw new GraphQLError('Failed to edit radio')
            }
        },
        // End Edit Radio

        editUser: async (parent, { _id, updates }) => {
            try {

                if (updates.orgName) {

                    await User.updateOrganization(_id, updates.orgName);
                }

                const user = await User.findOneAndUpdate({ _id }, { $set: updates }, { new: true });

                if (!user) {
                    throw new GraphQLError('User Not Found', {
                        extensions: {
                            code: 'Edit_User_Error'
                        }
                    })
                }

                return user
            } catch (error) {
                console.log(`resolver error: ${error}`);
                throw new GraphQLError('Failed to Edit User')
            }
        },

        // End Edit User
        editOrg: async (parent, { _id, updates }) => {
            try {

                const oldOrg = await Organization.findById({ _id });

                if (!oldOrg) {
                    throw new GraphQLError('Old Organization Not Found', {
                        extensions: {
                            code: 'Edit_Organization_Error_No_Old_Org'
                        }
                    });
                }

                const oldOrgName = oldOrg.orgName;

                const org = await Organization.findByIdAndUpdate({ _id }, { $set: updates }, { new: true });

                if (!org) {
                    throw new GraphQLError('Organization Not Found', {
                        extensions: {
                            code: 'Edit_Org_Error'
                        }
                    })
                }

                if (updates.orgName) {

                    await Organization.updateUsersOrg(oldOrgName, updates.orgName);

                    await Organization.updateRadiosOrg(oldOrgName, updates.orgName);

                    await Organization.updateLocationsOrg(oldOrgName, updates.oldName)

                }

                return org
            } catch (error) {
                console.log(`resolver error: ${error}`);
                throw new GraphQLError('Failed to Edit Organization')
            }
        },
        // End Edit Org

        editLocation: async(parent, { _id, updates } ) => {
            try {

                const oldLocation = await Location.findById({ _id });

                if (!oldLocation) {
                    throw new GraphQLError('Old Location Not Found', {
                        extensions: {
                            code: 'Edit_Location_Error_No_Old_Location'
                        }
                    });
                }

                const location = await Location.findOneAndUpdate({ _id }, { $set: updates }, { new: true });

                return location

            }
            catch (error) {
                console.log(`resolver error: ${error}`);
                throw new GraphQLError('Failed to Edit Location')

            }
        },
        // End Edit Location

    }
};

module.exports = resolvers;