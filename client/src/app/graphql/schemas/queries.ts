import { gql } from 'apollo-angular';

export const QUERY_USERS = gql`
    query users {
        _id
        username
        email
        accessLevel
        orgName
    }
`

export const QUERY_SINGLEUSER = gql`
    query user($userId: String!) {
        user(_id: $userId) {
            _id
            username
            email
            accessLevel
            orgName
        }
    }

`

export const ALL_RADIOS = gql`
    query allRadios {
        allRadios {
           _id
           orgName
           location
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
                radioSerial
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
           warranty 
        }
    }
`

export const QUERY_SINGLERADIO = gql`
    query radio($_id: String) {
        radio(_id: $_id) {
           _id
           orgName
           location
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
                radioSerial
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
           warranty 
        }
    }
`

export const QUERY_SERIALRADIO = gql`
    query radio($radioSerial: String) {
        radio(serialNumber: $radioSerial) {
           _id
           orgName
           location
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
                radioSerial
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
           warranty 
        }
    }
`


export const ALL_REPAIRS = gql`
    query allRepairs {
        allRepairs {
            _id
            radioSerial
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

export const QUERY_SINGLEREPAIR = gql`
    query repair($_id: String) {
        repair(_id: $_id) {
            _id
            radioSerial
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

export const ORG_RADIOS = gql`
    query orgRadios($orgName: String) {
        orgRadios(orgName: $orgName) {
           _id
           orgName
           location
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
                radioSerial
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
           warranty 
        }
    }
`

export const ORG_USERS = gql`
    query orgUsers($orgName: String!) {
        orgUsers(orgName: $orgName) {
            _id
            username
            email
            accessLevel
            orgName
        }
    }
`

