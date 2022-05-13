import { gql } from "@apollo/client";

export const ADD_CLAIM_DOCUMENTS = gql`
    mutation addDocumentsMutation(
        $_id: String!
        $ein: String!
        $documents: [String!]!
    ) {
        addClaimDocuments(
            _id: $_id
            ein: $ein
            documents: $documents
        ) {
            code
            message
        }
    }
`;
