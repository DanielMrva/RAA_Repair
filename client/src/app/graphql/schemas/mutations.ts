import { gql } from 'apollo-angular';
import { LoginResults, LoginVariables } from './typeInterfaces';

export const ADD_USER = gql`
    mutation addUser(
        $username: String!,
        $email: String!,
        $password: String!,
        $orgName: String!
    ) {
        addUser(
            username: $username
            email: $email
            password: $password
            orgName: $orgName
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

// export const ADD_REPAIR = gql`
//     mutation addRepair(
//             $radioSerial: String!,
//             $dateReceived: String!,
//             $endUserPO: String,
//             $raaPO: String,
//             $repairTag: String,
//             $dateSentTech: String,
//             $dateRecTech: String,
//             $dateSentEU: String,
//             $techInvNum: String,
//             $raaInvNum: String,
//             $symptoms: [String],
//             $testFreq: String,
//             $incRxSens: String,
//             $incFreqErr: String,
//             $incMod: String,
//             $incPowerOut: String,
//             $outRxSens: String,
//             $outFreqErr: String,
//             $outMod: String,
//             $outPowerOut: String,
//             $accessories: [String],
//             $workPerformed: [String],
//             $repHours: Float,
//             $partsUsed: [String],
//             $remarks: String
        
//         ) {
//             addRepair (
//                 radioSerial: $radioSerial,
//                 dateReceived: $dateReceived,
//                 endUserPO: $endUserPO,
//                 raaPO: $raaPO,
//                 repairTag: $repairTag,
//                 dateSentTech: $dateSentTech,
//                 dateRecTech: $dateRecTech,
//                 dateSentEU: $dateSentEU,
//                 techInvNum: $techInvNum,
//                 raaInvNum: $raaInvNum,
//                 symptoms: $symptoms,
//                 testFreq: $testFreq,
//                 incRxSens: $incRxSens,
//                 incFreqErr: $incFreqErr,
//                 incMod: $incMod,
//                 incPowerOut: $incPowerOut,
//                 outRxSens: $outRxSens,
//                 outFreqErr: $outFreqErr,
//                 outMod: $outMod,
//                 outPowerOut: $outPowerOut,
//                 accessories: $accessories,
//                 workPerformed: $workPerformed,
//                 repHours: $repHours,
//                 partsUsed: $partsUsed,
//                 remarks: $remarks 
//                 ) { 
//                     repair {
//                         _id
//                         radioSerial
//                         dateReceived
//                         endUserPO
//                         raaPO
//                         repairTag
//                         dateSentTech
//                         dateRecTech
//                         dateSentEU
//                         techInvNum
//                         raaInvNum
//                         symptoms
//                         testFreq
//                         incRxSens
//                         incFreqErr
//                         incMod
//                         incPowerOut
//                         outRxSens
//                         outFreqErr
//                         outMod
//                         outPowerOut
//                         accessories
//                         workPerformed
//                         repHours
//                         partsUsed
//                         remarks
//                     }
//                 }
//         }
// `

export const ADD_REPAIR = gql `
    mutation addRepair(
        $radioSerial: String!
        $dateReceived: String!
        $endUserPO: String
        $raaPO: String
        $repairTag: String
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
            radioSerial: $radioSerial,
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

