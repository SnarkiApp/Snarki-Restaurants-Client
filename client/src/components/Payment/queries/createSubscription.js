import { gql } from "@apollo/client";

export const CREATE_SUBSCRIPTION = gql`
    mutation createSubscription(
        $priceId: String!
        $restaurant: String!
    ) {
        createSubscription(
            priceId: $priceId
            restaurant: $restaurant
        ) {
            code
            message
            subscriptionId
            clientSecret
        }
    }
`;
