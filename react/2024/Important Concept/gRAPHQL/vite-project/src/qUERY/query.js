import { gql } from "@apollo/client";

export const CUSTOM_QUERY = gql`
{
    users{
        id
        name
        email
    }
}`;

export const GET_QUERY = gql`
    query Query($customSearch:String!){
        user(id:$customSearch){
            id
            name
            email
        }
    }
`;