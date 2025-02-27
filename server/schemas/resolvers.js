const { User, Organization, Radio, Repair, Location, Part, Tag } = require('../models');
const { unwrapResolverError, ApolloError } = require('@apollo/server/errors');
const { signToken } = require('../utils/auth');
const { sign } = require('jsonwebtoken');
const mongoose = require('mongoose');
const { GraphQLError, graphql } = require('graphql');
const { populate } = require('../models/Location');

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
        radio: async (parent, { radioID }) => {
            return Radio.findById({ _id: radioID }).populate(["serviceRecord"]);
        },
        serialRadio: async (parent, { serialNumber, model }) => {
            return Radio.findOne({ $and: [{ serialNumber: serialNumber }, { model: model }] }).populate(["serviceRecord"]);
        },
        likeSerialRadio: async (parent, { serialNumber, model }) => {
            const query = {
                $and: []
            };

            if (serialNumber) {
                query.$and.push({ serialNumber: { $regex: new RegExp(serialNumber, 'i') } });
            }

            if (model) {
                query.$and.push({ model: { $regex: new RegExp(model, 'i') } });
            }

            return Radio.find(query.$and.length > 0 ? query : {}).populate("serviceRecord");
        },
        allRepairs: async () => {
            return Repair.find();
        },
        repair: async (parent, { repairID }) => {
            return Repair.findById({ _id: repairID });
        },
        orgRadios: async (parent, { orgName }) => {
            return Radio.find({ orgName: orgName }).populate(["serviceRecord"]);
        },
        orgRepairs: async (parent, { orgName }) => {

            // Find all repairs with radioOrg of like orgName
            const repairs = await Repair.find({ radioOrg: { $regex: new RegExp(orgName, 'i') } });

            return repairs;
        },
        orgLocRepairs: async (parent, { orgName, locationName }) => {

            const repairs = await Repair.find({ radioOrg: { $regex: new RegExp(orgName, 'i') }, radioLocation: { $regex: new RegExp(locationName, 'i') } })
            return repairs;
        },
        likeOrgRadios: async (parent, { orgName }) => {

            return Radio.find({
                orgName: { $regex: new RegExp(orgName, 'i') }
            }).populate("serviceRecord")
        },
        orgUsers: async (parent, { orgName }) => {
            return User.find({ orgName: orgName });
        },
        orgNames: async () => {
            return Organization.find();
        },
        org: async (parent, { orgId }) => {
            return Organization.findById({ _id: orgId }).populate(   
                [
                    {
                        path: "users"
                    },
                    {
                        path: "locations",
                        populate: {
                            path: "radios",
                            populate: {
                                path: "serviceRecord"
                            }
                        }
                    },
                    {
                        path: "tags"
                    }
                ]);
        },
        allOrgs: async () => {
            return Organization.find().populate(   
                [
                    {
                        path: "users"
                    },
                    {
                        path: "locations",
                        populate: {
                            path: "radios",
                            populate: {
                                path: "serviceRecord"
                            }
                        }
                    },
                    {
                        path: "tags"
                    }
                ]);
        },
        allLocations: async () => {
            return Location.find().populate({
                path: "radios",
                populate: {
                    path: "serviceRecord",
                },
            });
        },
        location: async (parent, { locationId }) => {
            return Location.findById({ _id: locationId }).populate({
                path: "radios",
                populate: {
                    path: "serviceRecord",
                },
            });
        },
        locationByName: async (parent, { orgName, locationName }) => {
            return Location.findOne({ orgName: orgName, locationName: locationName }).populate({
                path: "radios",
                populate: {
                    path: "serviceRecord"
                }
            });
        },
        orgLocations: async (parent, { orgName }) => {
            return Location.find({ orgName: { $regex: new RegExp(orgName, 'i') } }).populate({
                path: "radios",
                populate: {
                    path: "serviceRecord",
                },
            });
        },
        locationNames: async () => {
            return Location.find();
        },
        likeOrg: async (parent, { orgName }) => {
            return Organization.find({ orgName: { $regex: new RegExp(orgName, 'i') } })
                .populate(   
                [
                    {
                        path: "users"
                    },
                    {
                        path: "locations",
                        populate: {
                            path: "radios",
                            populate: {
                                path: "serviceRecord"
                            }
                        }
                    },
                    {
                        path: "tags"
                    }
                ]);
        },
        orgsByTag: async (parent, { tagIDs }) => {
            try{
                const organizations = await Organization.find({ tags: { $in: tagIDs } })
                .populate([
                  { path: "users" },
                  {
                    path: "locations",
                    populate: {
                      path: "radios",
                      populate: {
                        path: "serviceRecord",
                      },
                    },
                  },
                  { path: "tags" },
                ]);
              return organizations;
              
            } catch(error) {
                console.error(error);
                throw new GraphQLError(`Unable to find Org by Tag ${error}`, {
                    extensions: {
                        code: 'FIND_ORG_BY_TAG_ERROR'
                    }
                });            
            }

        },
        orgsByLikeTag: async (parent, { tagNames }) => {

            try {
                const matchingTags = await Tag.find({ tagName: { $regex: new RegExp(tagNames.join("|"), 'i') }});

                const tagIDs = matchingTags.map((tag) => tag._id)

                const organizations = await Organization.find({ tags: { $in: tagIDs } })

                .populate([
                  { path: "users" },
                  {
                    path: "locations",
                    populate: {
                      path: "radios",
                      populate: {
                        path: "serviceRecord",
                      },
                    },
                  },
                  { path: "tags" },
                ]);
              return organizations;

            } catch (error) {
                console.error(error);
                throw new GraphQLError(`Unable to find Org by Tag Names ${error}`, {
                    extensions: {
                        code: 'FIND_ORG_BY_TAG_NAMES_ERROR'
                    }
                });     
            }


        },
        repairByTag: async (parent, { startTag, endTag }) => {
            if (startTag !== undefined && endTag === undefined) {
                // Ensure startTag is a string
                const regexPattern = new RegExp(startTag);
                return Repair.find({
                    $expr: {
                        $regexMatch: {
                            input: { $toString: "$repairTag" },
                            regex: regexPattern, // Use regex object
                        },
                    },
                });
            } else if (startTag !== undefined && endTag !== undefined) {
                // Range query when both startTag and endTag are defined
                return Repair.find({
                    repairTag: { $gte: parseInt(startTag), $lte: parseInt(endTag) },
                });
            } else {
                throw new Error("Invalid search parameters");
            }
        },
        allParts: async () => {
            return Part.find();
        },
        part: async (parent, { partId }) => {
            return Part.findById(partId);
        },
        partByNumDesc: async (parent, { partNumber, partDescription }) => {
            const query = {
                $and: []
            };

            if (partNumber) {
                query.$and.push({ partNumber: { $regex: new RegExp(partNumber, 'i') } });
            }

            if (partDescription) {
                query.$and.push({ description: { $regex: new RegExp(partDescription, 'i') } });
            }

            return Part.find(query.$and.length > 0 ? query : {});

        },
        tag: async ( parent, { tagId }) => {
            return Tag.findById(tagId);
        },
        likeTag: async (parent, { tagName }) => {

            try {
                const tags = Tag.find({ tagName: { $regex: new RegExp(tagName, 'i') } });
                return tags;

            } catch (error) {
                console.error(error);
                throw new GraphQLError(`Unable to find Tags ${error}`, {
                    extensions: {
                        code: 'LIKE_TAG_ERROR'
                    }
                });      
            }
        },
        allTags: async () => {
            return Tag.find();
        }

    },
    Repair: {
        radioDetails: async (parent, args, { radioLoader }) => {
            if (!radioLoader) {
                throw new Error('radioLoader not initialized');
            }
            return radioLoader.load(parent.radioID);
        },
    },
    Mutation: {
        addUser:
            async (parent, {
                username, email, password, accessLevel, orgName, userLocation
            }) => {

                const user = await User.create({ username, email, password, accessLevel, orgName, userLocation });

                return user
            },
        // End Add User

        login: async (parent, { email, password }) => {

            const user = await User.findOne({ email });

            const badAttempt = "Email or password has failed, please try again!";

            if (!user) {
                console.log('bad user', email);

                throw new GraphQLError(badAttempt, {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                })
            }

            const correctPassword = await user.isCorrectPassword(password);

            if (!correctPassword) {

                throw new GraphQLError(badAttempt, {
                    extensions: {
                        code: 'FORBIDDEN',
                    },
                })
            }

            const token = signToken(user);

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
                radioID,
                radioMake,
                radioSerial,
                radioOrg,
                radioLocation,
                reportedBy,
                endUserPO,
                raaPO,
                repairTag,
                repairStatus,
                dateRepairAdded,
                dateSentEuRaa,
                dateRecEuRaa,
                dateSentRaaTech,
                dateRecTechRaa,
                dateSentRaaEu,
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
                const radio = await Radio.findOne({ _id: radioID });

                if (!radio) {
                    throw new GraphQLError('Radio not found', {
                        extensions: {
                            code: 'RADIO_NOT_FOUND',
                            argumentName: 'radioID'
                        }
                    });
                }

                const highestRepair = await Repair.find({}).sort({ repairTag: -1 }).limit(1);

                let newRepairTag;
                if (highestRepair.length === 0) {
                    newRepairTag = 1;
                } else {
                    newRepairTag = highestRepair[0].repairTag + 1;
                }

                const repair = await Repair.create({
                    radioID,
                    radioMake,
                    radioSerial,
                    radioOrg,
                    radioLocation,
                    reportedBy,
                    endUserPO,
                    raaPO,
                    repairTag: newRepairTag,
                    repairStatus,
                    dateRepairAdded,
                    dateSentEuRaa,
                    dateRecEuRaa,
                    dateSentRaaTech,
                    dateRecTechRaa,
                    dateSentRaaEu,
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
                    { _id: repair.radioID },
                    { $addToSet: { serviceRecord: repair._id } }
                );

                return repair;

            } catch (error) {
                console.error('Error submitting repair:', error);

                throw new GraphQLError('Failed to submit repair', {
                    extensions: {
                        code: 'SUBMIT_REPAIR_ERROR'
                    }
                });
            }
        },
        // End Add Repair

        addRadio: async (
            parent, {
                orgName,
                locationName,
                datePurchased,
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
                    datePurchased,
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

                await Location.findOneAndUpdate(
                    { locationName: locationName, orgName: orgName },
                    { $addToSet: { radios: newRadio._id } }
                );

                // Faulty Radio-location association method.  Revert when done testing
                // await Location.findOneAndUpdate(
                //     {locationName: locationName},
                //     {$addToSet: { radio: newRadio._id}}
                // )

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

        addOrg: async (parent, { orgName, tags }) => {
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

                const org = await Organization.create({ orgName, tags });

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
                suite,
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
                    suite,
                    city,
                    state,
                    zip,
                    country,
                    phone,
                    contactEmail,
                    primaryContact
                });

                await Organization.findOneAndUpdate(
                    { orgName: newLocation.orgName },
                    { $addToSet: { locations: newLocation._id } }
                );

                return newLocation;
            }

            catch (error) {
                console.error(error);
                throw new GraphQLError('Failed to submit location', {
                    extensions: {
                        code: 'SUBMIT_LOCATION_ERROR'
                    }
                });
            }

        },
        // End Add Location



        addPart: async (
            parent,
            {
                partNumber,
                description,
                data,
                manufacturer,
                cost,
                msrp
            }
        ) => {


            // Check for required fields early
            if (!partNumber || !description) {
                throw new GraphQLError('partNumber and description are required.', {
                    extensions: { code: 'BAD_USER_INPUT' }
                });
            }

            try {
                // Check if the part already exists based on partNumber (assuming it's unique)
                const existingPart = await Part.findOne({ partNumber, description });

                if (existingPart) {
                    throw new GraphQLError(
                        `Part with partNumber ${partNumber} and ${description} already exists. Please try again.`,
                        {
                            extensions: {
                                code: 'PART_EXISTS',
                                argumentName: 'partNumber, description'
                            }
                        }
                    );
                }

                // Create the new part in the database
                const newPart = await Part.create({
                    partNumber,
                    description,
                    data,
                    manufacturer,
                    cost,
                    msrp
                });

                return newPart;
            } catch (error) {
                console.error('Error creating part:', error);

                // Return a generic error for the client, while logging the actual error for debugging
                throw new GraphQLError('Failed to submit part.', {
                    extensions: { code: 'SUBMIT_PART_ERROR' }
                });
            }
        },

        // End Add Part
        addTag: async (parent, { tagName }) => {

            // Check for required fields
            if (!tagName) {
                throw new GraphQLError('tagName is required.', {
                    extensions: { code: 'BAD_USER_INPUT' }
                });
            }

            try {

                const existingTag = await Tag.findOne({tagName: tagName});

                if (existingTag) {
                    throw new GraphQLError(
                        `Tag with tagName ${tagName} already exists. Please try again.`,
                        {
                            extensions: {
                                code: 'TAG_EXISTS',
                                argumentName: 'tagName'
                            }
                        }
                    );
                }

                const newTag = await Tag.create({
                    tagName
                });
                return newTag

            } catch (error) {
                console.error('Error creating tag:', error);

                // Return a generic error for the client, while logging the actual error for debugging
                throw new GraphQLError(`Failed to submit tag. ${error}`, {
                    extensions: { code: 'SUBMIT_TAG_ERROR' }
                });
            
            }

        },

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

                if (updates.orgName && !updates.locationName) {
                    throw new GraphQLError('Cannot edit radio: Both orgName and locationName must be provided together.', {
                        extensions: { code: 'Edit_Radio_Error_Org&!Loc' }
                    });
                }


                // Handle location update only
                if (updates.locationName || updates.orgName) {
                    console.log(`Updating with Radio.updateLocation`)
                    await Radio.updateLocationAndOrganization(_id, updates.orgName, updates.locationName);
                }


                // Handle make and serial number updates
                if (updates.make || updates.serialNumber) {
                    await Radio.updateRepairsWithNewRadioInfo(_id, {
                        make: updates.make,
                        serialNumber: updates.serialNumber
                    });
                }

                // Update the radio document itself
                const radio = await Radio.findOneAndUpdate({ _id }, { $set: updates }, { new: true });

                if (!radio) {
                    throw new GraphQLError('Radio Not Found', {
                        extensions: {
                            code: 'Edit_Radio_Error'
                        }
                    });
                }

                return radio;
            } catch (error) {
                console.log(`resolver error: ${error}`);
                throw new GraphQLError('Failed to edit radio');
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

                const org = await Organization.findByIdAndUpdate({ _id }, { $set: updates }, { new: true }).populate('tags');

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

                    await Organization.updateLocationOrg(oldOrgName, updates.orgName)

                }

                return org
            } catch (error) {
                console.log(`resolver error: ${error}`);
                throw new GraphQLError('Failed to Edit Organization')
            }
        },
        // End Edit Org

        editLocation: async (parent, { _id, updates }) => {
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
                throw new GraphQLError(`Failed to Edit Location, ${error.message}`)

            }
        },
        // End Edit Location

        editPart: async (parent, { _id, updates }) => {
            try {

                const oldPart = await Part.findById({ _id });

                if (!oldPart) {
                    throw new GraphQLError('Old Part Not Found', {
                        extensions: {
                            code: 'EDIT_PART_ERROR_NO_OLD_PART'
                        }
                    });
                }

                const part = await Part.findOneAndUpdate({ _id }, { $set: updates }, { new: true });

                return part

            }
            catch (error) {
                console.log(`resolver error: ${error}`);
                throw new GraphQLError(`Failed to Edit Part, ${error.message}`)

            }
        },
        // End Edit Part
        editTag: async (parent, { _id, updates}) => {
            try {

                const oldTag = await Tag.findById({ _id });

                if (!oldTag) {
                    throw new GraphQLError(`Old Tag not Found`, {
                        extensions: {
                            code: 'EDIT_TAG_ERROR_NO_OLD_TAG'
                        }
                    })
                }

                const tag = await Tag.findOneAndUpdate({ _id }, {$set: updates}, { new: true });
                return tag
            } catch (error) {
                console.error(`resolver error: ${error.message}`);
                throw new GraphQLError(`Failed to Edit Tag, ${error.message}`)

            }
        },
        // End Edit Tag
        deleteRepair: async (parent, { _id }) => {
            try {
                const deletedRepair = await Repair.findByIdAndDelete(_id);
                return deletedRepair;
            } catch (error) {
                console.log(`resolver error: ${error.message}`);
                throw new GraphQLError(`Failed to Delete Repair, ${error.message}`)

            }
        },
        // End Delete Repair
        deleteUser: async (parent, { _id }) => {
            try {
                const deletedUser = await User.findByIdAndDelete(_id);
                return deletedUser
            } catch (error) {
                console.log(`resolver error: ${error.message}`);
                throw new GraphQLError(`Failed to Delete User, ${error.message}`)
            }
        },
        // End Delete User
        deleteRadio: async (parent, { _id }) => {
            try {
                const deletedRadio = await Radio.deleteByIdAndCleanup(_id);
                return deletedRadio;
            } catch (error) {
                console.log(`Resolver error: ${error.message}`);
                throw new GraphQLError(`Failed to delete Radio, ${error.message}`);
            }
        },
        // End Delete Radio
        deleteLocation: async (parent, { _id }) => {
            try {
                const deletedLocation = await Location.findByIdAndDelete(_id);
                return deletedLocation
            } catch (error) {
                console.log(`resolver error: ${error.message}`);
                throw new GraphQLError(`Failed to Delete Location, ${error.message}`)
            }
        },
        // End Delete Location
        deleteOrganization: async (parent, { _id }) => {
            try {
                const deletedOrganization = await Organization.findByIdAndDelete(_id);
                return deletedOrganization
            } catch (error) {
                console.log(`resolver error: ${error.message}`);
                throw new GraphQLError(`Failed to Delete Organization, ${error.message}`)
            }
        },
        // End Delete Organization
        deletePart: async (parent, { _id }) => {
            try {
                const deletedPart = await Part.findByIdAndDelete({ _id });
                return deletedPart
            } catch (error) {
                console.log(`resolver error: ${error.message}`);
                throw new GraphQLError(`Failed to Delete Part, ${error.message}`);
            }
        },
        // End Delete Part
        deleteTag: async (parent, { _id }) => {
            try {
                const deletedTag = await Tag.findByIdAndDelete({ _id });
                return deletedTag
            } catch (error) {
                console.log(`resolver error: ${error.message}`);
                throw new GraphQLError(`Failed to Delete Part, ${error.message}`);
            }
        },
        // End Delete Tag

    }
};

module.exports = resolvers;