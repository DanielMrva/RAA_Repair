const db = require('../config/connection');
const { User, Organization, Radio, Repair} = require('../models');
const userSeeds = require('./userSeeds.json');
const organizationSeeds = require('./orgSeeds.json');
const radioSeeds = require('./radioSeeds.json');
const repairSeeds = require('./repseeds.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Organization.deleteMany({});
        await Radio.deleteMany({});
        await Repair.deleteMany({});

        await User.create(userSeeds);
        await Organization.create(organizationSeeds);
        await Radio.create(radioSeeds);
        await Repair.create(repairSeeds);

        const users = await User.find({});
        const orgs = await Organization.find({});
        const rad = await Radio.find({});
        const rep = await Repair.find({});

        for (let i = 0; i < users.length; i++) {
            const use = users[i];

            await Organization.findOneAndUpdate(
                {orgName: use.orgName},
                { $addToSet: {users: use._id}}
            )
            .catch((err) => console.log(err));
        }

        for (let j = 0; j < rad.length; j++) {
            const ra = rad[j];

            await Organization.findOneAndUpdate(
                {orgName: ra.orgName},
                { $addToSet: {radios: ra._id}}
            )
            .catch((err) => console.log(err));
        }

        for ( let k = 0; k < rep.length; k++) {
            const repair = rep[k];

            await Radio.findOneAndUpdate(
                {serialNumber: repair.radioSerial},
                { $addToSet: {serviceRecord: repair._id}}
            )
            .catch((err) => console.log(err))
        }

        console.log('Complete');
        process.exit(0);

    } catch (err) {
        throw err;
    }
})