import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-graphql";
import { GraphQLClient } from "graphql-request";

const API_URL = "https://your-graphql-url/graphql";
const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);
import { authProvider } from "./authProvider";

function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={gqlDataProvider}
      authProvider={authProvider}
    />
  );
}

export default App;
