import { gql } from "@apollo/client";

export const GetAllUsers = gql`
  query GetAllUser {
    users {
      name
      email
      id
      createdAt
      updatedAt
    }
  }
`;
