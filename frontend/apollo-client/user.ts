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

export const CreateUser = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(
      createUserInput: { name: $name, email: $email, password: $password }
    ) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
