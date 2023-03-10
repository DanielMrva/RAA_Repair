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
        me(_id: String!): User
        users: [User]
        user(userId: ID!): User
        allradios: [Radio]
        allrepairs: [Repair]
        orgradios(orgName: String!): [Radio]
        orguser(orgName: String!): [User]
    }

    type Mutation {
        addUser(
        username: String!
        email: String!
        password: String!
        orgName: String!
        ): Auth
        login(email: String!, password: String!): Auth
    }

`;

module.exports = typeDefs;


// const typeDefs = gql`
//     type User {
//         _id: ID!
//         username: String!
//         email: String!
//         password: String!
//         accessLevel: String
//         orgName: String!
//     }

//     type Radio {
//         _id: ID!
//         orgName: String
//         dateSold: String
//         dateEntered: String
//         inventoryNumber: String
//         make: String
//         model: String
//         serialNumber: String
//         serviceRecord: [Repair]
//         warranty: String
//     }

//     type Organization {
//         _id: ID!
//         orgName: String!
//         radios: [Radio]
//         users: [User]
//     }

//     type Repair {
//         _id: ID!
//         accessories: String
//         completionDate: String
//         contact: String
//         controlID: String
//         cost: Float
//         customerPO: String
//         customerPoDate: String
//         received: String
//         techReceived: String
//         techSent: String
//         filed: Boolean
//         frequencyError: String
//         invoiceNumber: String
//         list: Float
//         ourPO: String
//         partsDesc: String
//         poText: String
//         powerOutput: String
//         problemReported: String
//         quantity: Int
//         repDesc: String
//         repHours: Float
//         rxSensitivity: String
//         salesOrderText: String
//         tech: String
//         techInvoice: String
//         txDeviation: String
//         workStatus: Boolean
//     }

//     type Auth {
//         token: ID!
//         user: User!
//     }

//     type Query {
//         me(_id: String!): User
//         user(userId: ID!): User
//         users: [User]
//         allradios: [Radio]
//         allrepairs: [Repair]
//         orgradios(orgName: String!): [Radio]
//         orguser(orgName: String!): [User] 
//     }

//     type Mutation {
//         addUser(
//             username: String!
//             email: String!
//             password: String!
//             orgName: String!
//         ): Auth
//         validateAccess(username: String!, accessLevel: String!): User
//         login(email: String!, password: String!): Auth
//     }
// `;

// module.exports = typeDefs;