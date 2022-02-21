import { gql } from "@apollo/client";

export const GET_RESTAURANTS = gql`
    query getRestaurantsQuery(
        $name: String!
    ) {
        getRestaurants(
            name: $name
        ) {
            code
            message
            restaurants {
                _id
                name
                address
                city
                state
                postalCode
            }
        }
    }
`;
