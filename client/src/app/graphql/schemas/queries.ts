import { gql } from 'apollo-angular';
import { USER_FIELDS_FRAGMENT, ORG_FIELDS_FRAGMENT, LOCATION_FIELDS_FRAGMENT, RADIO_FIELDS_FRAGMENT, SERVICE_RECORD_FRAGMENT } from './fragments';

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
    ${USER_FIELDS_FRAGMENT}
    ${LOCATION_FIELDS_FRAGMENT}
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query org($orgId: ID!) {
        org(orgId: $orgId) {
            _id
            orgName
            users {
                ... UserFieldsFragment
            }
            locations {
                ... LocationFieldsFragment
            }
        }
    }
`

export const ALL_RADIOS = gql`
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query allRadios {
        allRadios {
        ... RadioFieldsFragment
        }
    }
`

export const QUERY_SINGLERADIO = gql`
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}

    query radio($radioID: String!) {
        radio(radioID: $radioID) {
            ... RadioFieldsFragment
        }
    }
`

export const QUERY_SERIALRADIO = gql`
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query radio($serialNumber: String) {
        radio(serialNumber: $serialNumber) {
            ... RadioFieldsFragment
        }
    }
`


export const ALL_REPAIRS = gql`
    ${SERVICE_RECORD_FRAGMENT}
    query allRepairs {
        allRepairs {
            ... ServiceRecordFragment        
        }
    }
`

export const QUERY_SINGLEREPAIR = gql`
    ${SERVICE_RECORD_FRAGMENT}
    query repair($repairID: String!) {
        repair(repairID: $repairID) {
            ... ServiceRecordFragment
        }
    }
`

export const ORG_RADIOS = gql`
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query orgRadios($orgName: String!) {
        orgRadios(orgName: $orgName) {
        ... RadioFieldsFragment
        }
    }
`

export const ORG_USERS = gql`
    ${USER_FIELDS_FRAGMENT}
    query orgUsers($orgName: String!) {
        orgUsers(orgName: $orgName) {
            ... UserFieldsFragment
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
    ${ORG_FIELDS_FRAGMENT}
    ${USER_FIELDS_FRAGMENT}
    ${LOCATION_FIELDS_FRAGMENT}
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query allOrgs {
        allOrgs {
            ... OrgFieldsFragment
        }
    }
`

export const QUERY_LOCATIONS = gql`
    ${LOCATION_FIELDS_FRAGMENT}
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query allLocations {
        allLocations {
            ... LocationFieldsFragment
        }
    }
`

export const QUERY_SINGLELOCATION = gql`
    ${LOCATION_FIELDS_FRAGMENT}
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query location($locationId: String!) {
        location(locationId: $locationId) {
            ... LocationFieldsFragment
        }
    }
`

export const LOCATION_BY_NAME = gql`
    ${LOCATION_FIELDS_FRAGMENT}
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query locationByName($locationName: String!) {
        locationByName(locationName: $locationName) {
            ... LocationFieldsFragment
        }
    }
`

export const ORG_LOCATIONS = gql`
    ${LOCATION_FIELDS_FRAGMENT}
    ${RADIO_FIELDS_FRAGMENT}
    ${SERVICE_RECORD_FRAGMENT}
    query orgLocations($orgName: String!) {
        orgLocations(orgName: $orgName) {
            ... LocationFieldsFragment
        }
    }
`

export const LOCATION_NAMES = gql`
    query locationNames {
        locationNames {
            _id
            locationName
            orgName
        }
    }
`


