const db = require('../config/connection');
const { User, Organization, Radio, Repair, Location} = require('../models');
const userSeeds = require('./prodUsers.json');
const organizationSeeds = require('./prodOrgs.json');
const radioSeeds = require('../seeding/radioSeeds.json');
const repairSeeds = require('../seeding/repseeds.json');
const locationSeeds = require('./prodLocations.json');

db.once('open', async () => {

    console.log('start -- Line 11')
    try {

        await User.deleteMany({});
        console.log('Users deleted')

        await Organization.deleteMany({});
        console.log('Orgs deleted')

        await Radio.deleteMany({});
        console.log('Radios deleted')

        await Repair.deleteMany({});
        console.log('Repairs deleted')

        await Location.deleteMany({});
        console.log('Locations deleted')



        await User.create(userSeeds);
        console.log('Users Created')

        await Organization.create(organizationSeeds);
        console.log('Orgs Created')

        await Location.create(locationSeeds);
        console.log('Locs Created')

        await Radio.create(radioSeeds);
        console.log('Radios Created')

        await Repair.create(repairSeeds);
        console.log('Repairs Created')



        const users = await User.find({});
        const orgs = await Organization.find({});
        const loc = await Location.find({});
        const rep = await Repair.find({});

        console.log('Setting locations to orgs')
        for (let h = 0; h < loc.length; h++) {
            const locat = loc[h];

            await Organization.findOneAndUpdate(
                {orgName: locat.orgName},
                { $addToSet: {locations: locat._id}}
            )
            .catch((err) => console.log(err));
        }

        console.log('setting users to orgs')
        for (let i = 0; i < users.length; i++) {
            const use = users[i];

            await Organization.findOneAndUpdate(
                {orgName: use.orgName},
                { $addToSet: {users: use._id}}
            )
            .catch((err) => console.log(err));
        }
      
        console.log('Complete');
        process.exit(0);

    } catch (err) {
        throw err;
    }
});