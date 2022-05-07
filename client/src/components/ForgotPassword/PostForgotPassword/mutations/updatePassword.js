import { gql } from "@apollo/client";

export const UPDATE_PASSWORD = gql`
    mutation resetPassword(
        $token: String!,
        $password: String!
    ) {
        resetPassword(
            token: $token
            password: $password
        ) {
            code
            message
        }
    }
`;
