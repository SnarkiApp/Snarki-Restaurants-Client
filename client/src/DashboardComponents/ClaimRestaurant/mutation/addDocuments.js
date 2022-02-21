import { gql } from "@apollo/client";

export const ADD_DOCUMENTS = gql`
    mutation addDocumentsMutation(
        $_id: String!
        $documents: [String!]!
    ) {
        addDocuments(
            _id: $_id
            documents: $documents
        ) {
            code
            message
        }
    }
`;
