import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
    mutation registerUser(
        $email: String!,
        $password: String!
    ) {
        register(
            email: $email
            password: $password
        ) {
            code
            message
        }
    }
`;
