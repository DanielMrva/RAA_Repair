const { graphql, buildschema } = require("graphql");

const typeDefs = `#graphql
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        accessLevel: String!
        orgName: String!
    }

    type Repair {
        _id: ID!
        radioSerial: String!
        dateReceived: String!
        endUserPO: String
        raaPO: String
        repairTag: String
        dateSentTech: String
        dateRecTech: String
        dateSentEU: String
        techInvNum: String
        raaInvNum: String
        symptoms: [String]
        testFreq: String
        incRxSens: String
        incFreqErr: String
        incMod: String
        incPowerOut: String
        outRxSens: String
        outFreqErr: String
        outMod: String
        outPowerOut: String
        accessories: [String]
        workPerformed: [String]
        repHours: Float
        partsUsed: [String]
        remarks: String
    }

    type Radio {
        _id: ID!
        orgName: String
        location: String
        dateSold: String
        dateEntered: String
        inventoryNumber: String
        make: String
        model: String
        progChannels: String
        notes: [String]
        serialNumber: String
        serviceRecord: [Repair]
        warranty: String
        refurb: Boolean
        radioType: String
    }

    type Organization {
        _id: ID!
        orgName: String,
        radios: [Radio]
        users: [User]
    }

    type Auth {
        token: ID!
        user: User!
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        allRadios: [Radio]
        radio(radioId: String!): Radio
        serialRadio(serialNumber: String!): Radio 
        allRepairs: [Repair]
        repair(repairId: String!): Repair
        orgRadios(orgName: String!): [Radio]
        orgUsers(orgName: String!): [User]
    }

    input UpdateRepairInput {
            dateReceived: String
            endUserPO: String
            raaPO: String
            repairTag: String
            dateSentTech: String
            dateRecTech: String
            dateSentEU: String
            techInvNum: String
            raaInvNum: String
            symptoms: [String]
            testFreq: String
            incRxSens: String
            incFreqErr: String
            incMod: String
            incPowerOut: String
            outRxSens: String
            outFreqErr: String
            outMod: String
            outPowerOut: String
            accessories: [String]
            workPerformed: [String]
            repHours: Float
            partsUsed: [String]
            remarks: String
    }

    type Mutation {
        addUser(
            username: String!
            email: String!
            password: String!
            orgName: String!
        ): Auth

        login(
            email: String!
            password: String!): Auth

        validateAccess(
            username: String!
            accessLevel: String!
        ): User

        addRepair(
            radioSerial: String!
            dateReceived: String!
            endUserPO: String
            raaPO: String
            repairTag: String
            dateSentTech: String
            dateRecTech: String
            dateSentEU: String
            techInvNum: String
            raaInvNum: String
            symptoms: [String]
            testFreq: String
            incRxSens: String
            incFreqErr: String
            incMod: String
            incPowerOut: String
            outRxSens: String
            outFreqErr: String
            outMod: String
            outPowerOut: String
            accessories: [String]
            workPerformed: [String]
            repHours: Float
            partsUsed: [String]
            remarks: String
        ): Repair

        addRadio(
            orgName: String!
            location: String
            dateSold: String
            dateEntered: String
            inventoryNumber: String!
            make: String!
            model: String
            progChannels: String
            notes: [String]
            serialNumber: String
            warranty: String
            refurb: Boolean,
            radioType: String
        ): Radio
        
        editRepair(
            _id: ID!
            updates: UpdateRepairInput
        ): Repair



    }

`;

module.exports = typeDefs;