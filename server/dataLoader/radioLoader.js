const DataLoader = require('dataloader');
const Radio = require('../models/Radio');

const radioLoader = new DataLoader(async (radioIds) => {
    const radios = await Radio.find({ _id: { $in: radioIds } }, 'make model serialNumber orgName locationName');
    const radioMap = new Map(radios.map((radio) => [
        radio._id.toString(),
        {
            radioId: radio._id,
            radioMake: radio.make,
            radioModel: radio.model,
            radioSerial: radio.serialNumber,
            radioOrg: radio.orgName,
            radioLocation: radio.locationName,
        }
    ]));

    return radioIds.map((id) => {
        const radio = radioMap.get(id.toString());
        if (!radio) {
            return { message: `Radio with ID ${id} not found` };
        }
        return radio;
    });
});




module.exports = radioLoader;