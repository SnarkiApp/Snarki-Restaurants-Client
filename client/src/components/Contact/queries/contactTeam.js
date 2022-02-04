import { gql } from "@apollo/client";

export const CONTACT_TEAM = gql`
    query contactTeam(
        $email: String!,
        $firstName: String,
        $lastName: String,
        $comments: String!
    ) {
        contact(
            email: $email
            firstName: $firstName
            lastName: $lastName
            comments: $comments
        ) {
            code
            message
        }
    }
`;
