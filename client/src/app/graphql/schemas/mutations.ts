import { gql } from 'apollo-angular';
import { LoginResults, LoginVariables } from './typeInterfaces';

export const ADD_USER = gql`
    mutation addUser(
        $username: String!,
        $email: String!,
        $password: String!,
        $orgName: String!,
        $accessLevel: String!
        $userLocation: String!
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
            accessLevel: $accessLevel
            orgName: $orgName
            userLocation: $userLocation
        ) {
                _id
                username
                accessLevel
                orgName
                userLocation
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
                accessLevel
                orgName
                userLocation
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
                accessLevel
                orgName
                userLocation
            }
        }
    }
`

export const ADD_REPAIR = gql`
    mutation addRepair(
        $radioID: String
        $radioMake: String
        $radioSerial: String
        $radioOrg: String
        $radioLocation: String
        $reportedBy: String
        $endUserPO: String
        $raaPO: String
        $repairTag: Int
        $repairStatus: String
        $dateRepairAdded: String
        $dateSentEuRaa: String
        $dateRecEuRaa: String
        $dateSentRaaTech: String
        $dateRecTechRaa: String
        $dateSentRaaEu: String
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
            radioSerial: $radioSerial,
            radioOrg: $radioOrg,
            radioLocation: $radioLocation,
            reportedBy: $reportedBy,
            endUserPO: $endUserPO,
            raaPO: $raaPO,
            repairTag: $repairTag,
            repairStatus: $repairStatus,
            dateRepairAdded: $dateRepairAdded
            dateSentEuRaa: $dateSentEuRaa
            dateRecEuRaa: $dateRecEuRaa
            dateSentRaaTech: $dateSentRaaTech
            dateRecTechRaa: $dateRecTechRaa
            dateSentRaaEu: $dateSentRaaEu
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
            radioOrg
            radioLocation
            reportedBy
            endUserPO
            raaPO
            repairTag
            repairStatus
            dateRepairAdded
            dateSentEuRaa
            dateRecEuRaa
            dateSentRaaTech
            dateRecTechRaa
            dateSentRaaEu
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
        $datePurchased: String
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
            datePurchased: $datePurchased,
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
            datePurchased
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

export const EDIT_REPAIR = gql`
    mutation editRepair($id: ID!, $updates: UpdateRepairInput) {
        editRepair(_id: $id, updates: $updates) {
            _id
            radioID
            radioMake
            radioSerial
            radioOrg
            radioLocation
            reportedBy
            endUserPO
            raaPO
            repairTag
            repairStatus
            dateRepairAdded
            dateSentEuRaa
            dateRecEuRaa
            dateSentRaaTech
            dateRecTechRaa
            dateSentRaaEu
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

export const EDIT_RADIO = gql`
    mutation editRadio($id: ID!, $updates: UpdateRadioInput) {
        editRadio(_id: $id, updates: $updates) {
            _id
            orgName
            locationName
            datePurchased
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
            userLocation
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
            locations {
                _id
            }
            tags {
                _id
            }
        }
    }
`

export const ADD_ORG = gql`
    mutation addOrg($orgName: String, $tags: [ID]) {
        addOrg(orgName: $orgName, tags: $tags) {
            _id
            orgName
            users {
                _id
            }
            locations {
                _id
            }
            tags {
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
        $suite: String
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
            suite: $suite
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
            suite
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

export const EDIT_LOCATION = gql`
        mutation editLocation($id: ID!, $updates: UpdateLocationInput) {
        editLocation(_id: $id, updates: $updates) {
            _id
            locationName
            orgName
            street
            suite
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

export const DELETE_REPAIR = gql`
    mutation deleteRepair($id: ID!) {
        deleteRepair(_id: $id) {
            _id
            radioID
            radioMake
            radioSerial
            radioOrg
            radioLocation
            reportedBy
            endUserPO
            raaPO
            repairTag
            repairStatus
            dateRepairAdded
            dateSentEuRaa
            dateRecEuRaa
            dateSentRaaTech
            dateRecTechRaa
            dateSentRaaEu
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

export const DELETE_USER = gql`
    mutation deleteUser($id: ID!) {
        deleteUser(_id: $id) {
            _id
            username
            email
            password
            accessLevel
            orgName
            userLocation
        }
    }
`

export const DELETE_RADIO = gql`
    mutation deleteRadio($id: ID!) {
        deleteRadio(_id: $id) {
            _id
            orgName
            locationName
            datePurchased
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

export const DELTE_LOCATION = gql`
    mutation deleteLocation($id: ID!) {
        deleteLocation(_id: $id) {
            _id
            locationName
            orgName
            street
            suite
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

export const DELETE_ORGANIZATION = gql`
    mutation deleteOrganization($id: ID!) {
        deleteOrganization(_id: $id) {
            _id
            orgName
            users {
                _id
            }
            locations {
                _id
            }
        }
    }
`

export const ADD_PART = gql`
    mutation addPart(
        $partNumber: String!
        $description: String!
        $data: String
        $manufacturer: String
        $cost: Float
        $msrp: Float
    ) {
        addPart(
            partNumber: $partNumber,
            description: $description,
            data: $data,
            manufacturer: $manufacturer
            cost: $cost,
            msrp: $msrp
        ) {
            _id
            partNumber
            description
            data
            manufacturer
            cost
            msrp
        }
    }
`

export const EDIT_PART = gql`
    mutation editPart($id: ID!, $updates: UpdatePartInput) {
        editPart(_id: $id, updates: $updates) {
            _id
            partNumber
            description
            data
            cost
            msrp
        }
    }
`

export const DELETE_PART = gql`
    mutation deletePart($id: ID!) {
        deletePart(_id: $id) {
            _id
            partNumber
            description
            data
            cost
            msrp
        }
    }
`

export const ADD_TAG = gql`
    mutation addTag($tagName: String!) {
        addTag(tagName: $tagName) {
            _id
            tagName
        }
    }
`

export const EDIT_TAG = gql`
    mutation editTag($id: ID!, $updates: UpdateTagInput) {
        editTag(_id: $id, updates: $updates) {
            _id
            tagName
        }
    }

`

export const DELETE_TAG = gql`
    mutation deleteTag($id: ID!) {
        deleteTag(_id: $id) {
            _id
            tagName
        }
    }
`