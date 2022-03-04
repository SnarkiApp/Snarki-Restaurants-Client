import { gql } from "@apollo/client";

export const POST_PRESIGNED_URLS = gql`
    query postUploadUrlQuery(
        $_id: String
        $count: Int!
        $category: String!
    ) {
        postUploadUrl(
            _id: $_id
            count: $count
            category: $category
        ) {
            code
            message
            urls
        }
    }
`;
