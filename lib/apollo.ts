import { ApolloClient, InMemoryCache } from "@apollo/client";
import { env } from "process";

const apolloClient = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default apolloClient;
