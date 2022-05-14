import { gql } from "@apollo/client";

export const USER_REQUESTS = gql`
    query getUserRequests {
        restaurantRequests {
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
                reason
            }
        }
    }
`;
