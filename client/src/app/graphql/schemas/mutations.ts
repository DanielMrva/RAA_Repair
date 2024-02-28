import { gql } from 'apollo-angular';
import { LoginResults, LoginVariables } from './typeInterfaces';

export const ADD_USER = gql`
    mutation addUser(
        $username: String!,
        $email: String!,
        $password: String!,
        $orgName: String!,
        $accessLevel: String!
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
            orgName: $orgName
            accessLevel: $accessLevel
        ) {
            token
            user {
                _id
                username
                orgName
                accessLevel
            }
        }
    }
`

export const LOGIN_USER = gql<LoginResults, LoginVariables>`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                orgName
                accessLevel
            }
        }
    }
`



export const VALIDATE_ACCESS = gql`
    mutation validateAccess($username: String!, $accessLevel: String!) {
        validateAccess(username: $username, accessLevel: $accessLevel) {
            user {
                _id
                username
                orgName
                accessLevel
            }
        }
    }
`

export const ADD_REPAIR = gql `
    mutation addRepair(
        $radioID: String!
        $radioMake: String
        $radioSerial: String
        $radioLocation: String
        $dateReceived: String!
        $endUserPO: String
        $raaPO: String
        $repairTag: Int
        $dateSentTech: String
        $dateRecTech: String
        $dateSentEU: String
        $techInvNum: String
        $raaInvNum: String
        $symptoms: [String]
        $testFreq: String
        $incRxSens: String
        $incFreqErr: String
        $incMod: String
        $incPowerOut: String
        $outRxSens: String
        $outFreqErr: String
        $outMod: String
        $outPowerOut: String
        $accessories: [String]
        $workPerformed: [String]
        $repHours: Float
        $partsUsed: [String]
        $remarks: String
    ) {
        addRepair(
            radioID: $radioID,
            radioMake: $radioMake,
            radioSerial: $radioSeral,
            radioLocation: $radioLocation
            dateReceived: $dateReceived,
            endUserPO: $endUserPO,
            raaPO: $raaPO,
            repairTag: $repairTag,
            dateSentTech: $dateSentTech,
            dateRecTech: $dateRecTech,
            dateSentEU: $dateSentEU,
            techInvNum: $techInvNum,
            raaInvNum: $raaInvNum,
            symptoms: $symptoms,
            testFreq: $testFreq,
            incRxSens: $incRxSens,
            incFreqErr: $incFreqErr,
            incMod: $incMod,
            incPowerOut: $incPowerOut,
            outRxSens: $outRxSens,
            outFreqErr: $outFreqErr,
            outMod: $outMod,
            outPowerOut: $outPowerOut,
            accessories: $accessories,
            workPerformed: $workPerformed,
            repHours: $repHours,
            partsUsed: $partsUsed,
            remarks: $remarks
        ) {
            
                _id
                radioID
                radioMake
                radioSerial
                radioLocation
                dateReceived
                endUserPO
                raaPO
                repairTag
                dateSentTech
                dateRecTech
                dateSentEU
                techInvNum
                raaInvNum
                symptoms
                testFreq
                incRxSens
                incFreqErr
                incMod
                incPowerOut
                outRxSens
                outFreqErr
                outMod
                outPowerOut
                accessories
                workPerformed
                repHours
                partsUsed
                remarks
        }
    }

`

export const ADD_RADIO = gql`
    mutation addRadio(
        $orgName: String!
        $locationName: String
        $dateSold: String
        $dateEntered: String
        $inventoryNumber: String!
        $make: String!
        $model: String
        $progChannels: String
        $notes: [String]
        $serialNumber: String
        $warranty: String
        $refurb: Boolean
        $radioType: String
    ) {
        addRadio(
            orgName: $orgName,
            locationName: $locationName,
            dateSold: $dateSold,
            dateEntered: $dateEntered,
            inventoryNumber: $inventoryNumber,
            make: $make,
            model: $model,
            progChannels: $progChannels,
            notes: $notes,
            serialNumber: $serialNumber,
            warranty: $warranty,
            refurb: $refurb,
            radioType: $radioType
        ) {
            _id
            orgName
            locationName
            dateSold
            dateEntered
            inventoryNumber
            make
            model
            progChannels
            notes
            serialNumber
            serviceRecord {
                _id
            }
            warranty
            refurb
            radioType
        }
    }
`

export const Edit_Repair = gql`
    mutation editRepair($id: ID!, $updates: UpdateRepairInput) {
        editRepair(_id: $id, updates: $updates) {
            _id
            radioID
            radioMake
            radioSerial
            radioLocation
            dateReceived
            endUserPO
            raaPO
            repairTag
            dateSentTech
            dateRecTech
            dateSentEU
            techInvNum
            raaInvNum
            symptoms
            testFreq
            incRxSens
            incFreqErr
            incMod
            incPowerOut
            outRxSens
            outFreqErr
            outMod
            outPowerOut
            accessories
            workPerformed
            repHours
            partsUsed
            remarks
        }
    }
`

export const Edit_Radio = gql`
    mutation editRadio($id: ID!, $updates: UpdateRadioInput) {
        editRadio(_id: $id, updates: $updates) {
            _id
            orgName
            locationName
            dateSold
            dateEntered
            inventoryNumber
            make
            model
            progChannels
            notes
            serialNumber
            serviceRecord {
                _id
            }
            warranty
            refurb
            radioType
        }
    }
`

export const EDIT_USER = gql`
    mutation editUser($id: ID!, $updates: UpdateUserInput) {
        editUser(_id: $id, updates: $updates) {
            _id
            username
            email
            accessLevel
            orgName
        }
    }
`

export const EDIT_ORG = gql`
    mutation editOrg($id: ID!, $updates: UpdateOrgInput) {
        editOrg(_id: $id, updates: $updates) {
            _id
            orgName
            users {
                _id
            }
            radios {
                _id
            }
        }
    }
`

export const ADD_ORG = gql`
    mutation addOrg($orgName: String) {
        addOrg(orgName: $orgName) {
            _id
            orgName
            users {
                _id
            }
            radios {
                _id
            }
        }
    }
`

export const ADD_LOCATION = gql`
    mutation addLocation(
        $locationName: String!
        $orgName: String!
        $street: String
        $city: String
        $state: String
        $zip: String
        $country: String
        $phone: String
        $contactEmail: String
        $primaryContact: String
    ) {
        addLocation(
            locationName: $locationName
            orgName: $orgName
            street: $street
            city: $city 
            state: $state   
            zip: $zip   
            country: $country   
            phone: $phone   
            contactEmail: $contactEmail 
            primaryContact: $primaryContact
        ) {
            _id
            locationName
            orgName
            street
            city
            state
            zip
            country
            phone
            contactEmail
            primaryContact
        }
    }
`

export const EDIT_LOCATION = gql`
        mutation editLocation($id: ID!, $updates: UpdateLocationInput) {
        editLocation(_id: $id, updates: $updates) {
            _id
            locationName
            orgName
            street
            city
            state
            zip
            country
            phone
            contactEmail
            primaryContact
            radios {
                _id
            }
        }
    }
`

