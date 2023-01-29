import { gql } from "@apollo/client";

export const USER_BILLING = gql`
    query getBilling(
        $billing: Boolean!
    ) {
        restaurantRequests(
            billing: $billing
        ) {
            code
            message
            restaurants {
                name
                address
                city
                state
                postalCode
                status
                type
                subscriptionStatus
                subscriptionId
                restaurantId
                endDate
            }
        }
    }
`;
