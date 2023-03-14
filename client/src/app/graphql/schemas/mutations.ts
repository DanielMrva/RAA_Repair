import { gql } from 'apollo-angular';

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

export const LOGIN_USER = gql`
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