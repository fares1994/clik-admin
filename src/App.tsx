import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-graphql";
import { GraphQLClient } from "graphql-request";
import { authProvider } from "./authProvider";
import {
  List,
  TagField,
  DateField,
  Table,
  useTable,
  Layout,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import LoginPage from "Containers/LoginPage";
import UsersList from "Containers/UsersList";
import Dashboard from "Containers/Dashboard";
import "./App.css";
import Logo from "./Assets/Images/Rectangle.png";

const API_URL = "https://clikstaging.herokuapp.com/graphql";
const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);

function App() {
  return (
    <Refine
      Title={() => (
        <img
          src={Logo}
          alt="Clik"
          style={{
            width: "-webkit-fill-available",
            height: 80,
            marginBottom: 20,
          }}
        />
      )}
      routerProvider={{
        ...routerProvider,
        // RouterComponent: CustomRouterComponent,
      }}
      dataProvider={gqlDataProvider}
      authProvider={authProvider}
      resources={[
        {
          name: "dashboard",
          options: { label: "dashboard" },
          list: Dashboard,
          // icon: <BsBuilding size={20} />,
        },
        {
          name: "Users",
          options: { label: "Users" },
          list: UsersList,
          // icon: <BsBuilding size={20} />,
        },
        // {
        //   name: "users",
        //   list: UsersList,
        // },
      ]}
      Layout={Layout}
      LoginPage={LoginPage}
    />
  );
}

export default App;
