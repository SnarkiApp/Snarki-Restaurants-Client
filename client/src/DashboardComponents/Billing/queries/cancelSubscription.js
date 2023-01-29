import { gql } from "@apollo/client";

export const CANCEL_SUBSCRIPTION = gql`
    mutation cancelSubscription(
        $subscriptionId: String!
    ) {
        cancelSubscription(
            subscriptionId: $subscriptionId
        ) {
            code
            message
        }
    }
`;
