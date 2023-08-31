import { gql } from 'apollo-angular';

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            accessLevel
            orgName
        }
    }
`

export const QUERY_SINGLEUSER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            accessLevel
            orgName
        }
    }

`

export const QUERY_SINGLEORG = gql`
    query org($orgId: ID!) {
        org(orgId: $orgId) {
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
           refurb
           radioType
        }
    }
`

export const QUERY_SINGLERADIO = gql`
    query radio($radioId: String!) {
        radio(radioId: $radioId) {
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
           refurb
           radioType
        }
    }
`

export const QUERY_SERIALRADIO = gql`
    query radio($serialNumber: String) {
        radio(serialNumber: $serialNumber) {
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
           refurb
           radioType
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
    query repair($repairId: String!) {
        repair(repairId: $repairId) {
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
    query orgRadios($orgName: String!) {
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
           refurb
           radioType
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

export const ORG_NAMES = gql`
    query orgNames {
        orgNames {
            _id
            orgName
        }
    }
`

export const QUERY_ORGS = gql`
    query allOrgs {
        allOrgs {
            _id
            orgName
            radios {
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
                refurb
                radioType
            }
            users {
                _id
                username
                email
                accessLevel
                orgName
            }
        }
    }
`


