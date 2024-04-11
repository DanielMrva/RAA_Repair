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
        radioMake
        radioSerial
        radioLocation
        dateReceived
        endUserPO
        raaPO
        repairTag
        dateSentTech
        dateRecTech
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
    }
`