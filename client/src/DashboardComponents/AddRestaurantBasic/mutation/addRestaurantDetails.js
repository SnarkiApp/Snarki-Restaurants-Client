import { gql } from "@apollo/client";

export const ADD_RESTAURANT_DATA = gql`
    mutation registerRestaurantMutation(
        $input: RestaurantInput!
    ) {
        registerRestaurants(
            input: $input
        ) {
            _id
            code
            message
        }
    }
`;
