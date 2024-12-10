const { graphql, buildschema } = require("graphql");

const typeDefs = `#graphql
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        accessLevel: String!
        orgName: String!
        userLocation: String!
    }

    type Repair {
        _id: ID!
        radioID: String
        radioDetails: RepairRadioDetails
        radioMake: String
        radioSerial: String
        radioOrg: String
        radioLocation: String
        reportedBy: String
        endUserPO: String
        raaPO: String
        repairTag: Int
        repairStatus: String
        dateRepairAdded: String
        dateSentEuRaa: String
        dateRecEuRaa: String
        dateSentRaaTech: String
        dateRecTechRaa: String
        dateSentRaaEu: String
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

    type RepairRadioDetails {
        radioId: String
        radioMake: String
        radioModel: String
        radioSerial: String
        radioOrg: String
        radioLocation: String
    }

    union RadioDetailsResult = RepairRadioDetails | RadioNotFoundError

    type RadioNotFoundError {
        message: String
    }

    type Location {
        _id: ID!
        locationName: String
        orgName: String!
        street: String
        suite: String
        city: String
        state: String
        zip: String
        country: String
        phone: String
        contactEmail: String
        primaryContact: String
        radios: [Radio]
    }

    
    type Organization {
        _id: ID!
        orgName: String
        locations: [Location]
        users: [User]
    }

    type Radio {
        _id: ID!
        orgName: String
        locationName: String
        datePurchased: String
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

    type Part {
        _id: ID!
        partNumber: String!
        description: String!
        data: String
        manufacturer: String
        cost: Float
        msrp: Float
    }

    type Auth {
        token: ID!
        user: User!
    }

    type Query {
        users: [User]
        user(userId: ID!): User
        allRadios: [Radio]
        radio(radioID: String!): Radio
        serialRadio(serialNumber: String!, model: String!): Radio
        likeSerialRadio(serialNumber: String!, model: String!): [Radio] 
        allRepairs: [Repair]
        repair(repairID: String!): Repair
        orgRadios(orgName: String!): [Radio]
        orgRepairs(orgName: String!): [Repair]
        orgLocRepairs(orgName: String!, locationName: String!): [Repair]
        likeOrgRadios(orgName: String!): [Radio]
        orgUsers(orgName: String!): [User]
        orgNames: [Organization]
        org(orgId: ID!): Organization
        allOrgs: [Organization]
        allLocations: [Location]
        location(locationId: String!): Location
        locationByName( orgName: String!, locationName: String!): Location
        orgLocations(orgName: String!): [Location]
        locationNames: [Location]
        likeOrg(orgName: String!): [Organization]
        repairByTag(startTag: Int!, endTag: Int): [Repair]
        allParts: [Part]
        part(partId: ID!): Part
        partByNumDesc(partNumber: String, partDescription: String): [Part]
    }

    input UpdateRepairInput {
        radioID: String
        radioMake: String
        radioSerial: String
        radioOrg: String
        radioLocation: String
        reportedBy: String
        endUserPO: String
        raaPO: String
        repairTag: Int
        repairStatus: String
        dateRepairAdded: String
        dateSentEuRaa: String
        dateRecEuRaa: String
        dateSentRaaTech: String
        dateRecTechRaa: String
        dateSentRaaEu: String
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

    input UpdateRadioInput {
        orgName: String
        locationName: String
        datePurchased: String
        dateEntered: String
        inventoryNumber: String
        make: String
        model: String
        progChannels: String
        notes: [String]
        serialNumber: String
        warranty: String
        refurb: Boolean
        radioType: String
    }

    input UpdateUserInput {
        username: String
        email: String
        password: String
        accessLevel: String
        orgName: String
        userLocation: String
    }

    input UpdateOrgInput {
        orgName: String
    }

    input UpdateLocationInput {
        locationName: String
        orgName: String
        street: String
        suite: String
        city: String
        state: String
        zip: String
        country: String
        phone: String
        contactEmail: String
        primaryContact: String
    }

    input UpdatePartInput {
        partNumber: String
        description: String
        data: String
        manufacturer: String
        cost: Float
        msrp: Float
    }

    input AddPartInput {
        partNumber: String!
        description: String!
        data: String
        manufacturer: String
        cost: Float
        msrp: Float
    }

    type Mutation {
        addUser(
            username: String!
            email: String!
            password: String!
            accessLevel: String!
            orgName: String!
            userLocation: String!
        ): User

        login(
            email: String!
            password: String!
        ): Auth

        validateAccess(
            username: String!
            accessLevel: String!
        ): User

        addRepair(
            radioID: String
            radioMake: String
            radioSerial: String
            radioOrg: String
            radioLocation: String
            reportedBy: String
            endUserPO: String
            raaPO: String
            repairTag: Int
            repairStatus: String
            dateRepairAdded: String
            dateSentEuRaa: String
            dateRecEuRaa: String
            dateSentRaaTech: String
            dateRecTechRaa: String
            dateSentRaaEu: String
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
            locationName: String
            datePurchased: String
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

        addOrg(
            orgName: String
        ): Organization

        addLocation(
            locationName: String!
            orgName: String!
            street: String
            suite: String
            city: String
            state: String
            zip: String
            country: String
            phone: String
            contactEmail: String
            primaryContact: String
        ): Location

        addPart(
            partNumber: String!
            description: String!
            data: String
            manufacturer: String
            cost: Float
            msrp: Float
        ): Part
        
        editRepair(
            _id: ID!
            updates: UpdateRepairInput
        ): Repair

        editRadio(
            _id: ID!
            updates: UpdateRadioInput
        ): Radio

        editUser(
            _id: ID!
            updates: UpdateUserInput
        ): User

        editOrg(
            _id: ID!
            updates: UpdateOrgInput
        ): Organization

        editLocation(
            _id: ID!
            updates: UpdateLocationInput
        ): Location

        editPart(
            _id: ID!
            updates: UpdatePartInput
        ): Part

        deleteRepair(
            _id: ID!
        ): Repair
        
        deleteUser(
            _id: ID!
        ): User

        deleteRadio(
            _id: ID!
        ): Radio

        deleteLocation(
            _id: ID!
        ): Location

        deleteOrganization(
            _id: ID!
        ): Organization

        deletePart(
            _id: ID!
        ): Part
    }

`;

module.exports = typeDefs;