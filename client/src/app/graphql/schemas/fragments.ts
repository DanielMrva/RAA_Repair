import { gql } from 'apollo-angular';

export const RADIO_FIELDS_FRAGMENT = gql`
    fragment RadioFieldsFragment on Radio {
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
            ...ServiceRecordFragment
        }
        warranty
        refurb
        radioType
    }
`

export const SERVICE_RECORD_FRAGMENT = gql`
    fragment ServiceRecordFragment on Repair {
        _id
        radioID
        radioDetails {
            ...RadioDetailsFragment
        }
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
`

export const RADIO_DETAILS_FRAGMENT = gql`
  fragment RadioDetailsFragment on RepairRadioDetails {
    radioId
    radioMake
    radioModel
    radioSerial
    radioOrg
    radioLocation
  }
`;


export const LOCATION_FIELDS_FRAGMENT = gql`
    fragment LocationFieldsFragment on Location {
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
            ... RadioFieldsFragment
        }
    }
`

export const USER_FIELDS_FRAGMENT = gql`
    fragment UserFieldsFragment on User {
        _id
        username
        email
        accessLevel
        orgName
        userLocation
    }
`

export const ORG_FIELDS_FRAGMENT = gql`
    fragment OrgFieldsFragment on Organization {
        _id
        orgName
        locations {
            ... LocationFieldsFragment
        }
        users {
            ... UserFieldsFragment
        }
        tags {
            ... TagFieldsFragment
        }
    }
`

export const PART_FIELDS_FRAGMENT = gql`
    fragment PartFieldsFragment on Part {
        _id
        partNumber
        description
        data
        manufacturer
        cost
        msrp
    }
`

export const TAG_FIELDS_FRAGMENT = gql`
    fragment TagFieldsFragment on Tag {
        _id
        tagName
    }
`