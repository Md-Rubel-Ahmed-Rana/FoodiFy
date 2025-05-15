import { ApolloClient, InMemoryCache } from "@apollo/client";

const apiUri = process.env.NEXT_PUBLIC_BASE_API as string;

export const client = new ApolloClient({
  uri: apiUri,
  cache: new InMemoryCache(),
});
