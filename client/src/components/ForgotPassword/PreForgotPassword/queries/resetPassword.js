import { gql } from "@apollo/client";

export const RESET_PASSWORD_LINK = gql`
    query sendPasswordResetLink(
        $email: String!
    ) {
        sendPasswordResetLink(
            email: $email
        ) {
            code
            message
        }
    }
`;
