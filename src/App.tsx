import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import { GraphQLClient } from "graphql-request";
import { authProvider } from "./authProvider";
import {
  Layout,
} from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import LoginPage from "Containers/LoginPage";
import Dashboard from "Containers/Dashboard";
import "./App.css";
import Logo from "./Assets/Images/Rectangle.png";
import { UsersList } from "Containers/UsersList/UsersList";
import dataProvider from "Containers/DataProvider";
import ShowUsers from "Containers/UsersList/ShowUsers";
import './index.css';
import { EditUser } from "Containers/UsersList/EditUser";
import { FiUsers } from 'react-icons/fi'
import { OrderesList } from "Containers/Orders/OrdersListing";
import ShowOrder from "Containers/Orders/ShowOrder";
import { BiReceipt } from 'react-icons/bi';

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
          name: "findUsers",
          options: { label: "Users" },
          list: UsersList,
          show: ShowUsers,
          edit: EditUser,
          icon: <FiUsers size={20} />,
        },
        {
          name: "findAllOrders",
          options: { label: "Orders" },
          list: OrderesList,
          show: ShowOrder,
          edit: EditUser,
          icon: <BiReceipt size={20} />,
        },
      ]}
      Layout={Layout}
      LoginPage={LoginPage}
    />
  );
}

export default App;
