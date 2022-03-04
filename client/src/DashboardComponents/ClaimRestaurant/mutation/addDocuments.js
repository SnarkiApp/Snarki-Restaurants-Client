import { gql } from "@apollo/client";

export const ADD_CLAIM_DOCUMENTS = gql`
    mutation addDocumentsMutation(
        $_id: String!
        $documents: [String!]!
    ) {
        addClaimDocuments(
            _id: $_id
            documents: $documents
        ) {
            code
            message
        }
    }
`;
