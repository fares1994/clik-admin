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
import { ProductsList } from "Containers/Products/ProductsList";
import { MdProductionQuantityLimits } from "react-icons/md";
import ShowProduct from "Containers/Products/ShowProduct";
import { EditOrder } from "Containers/Orders/EditOrder";
import { EditProduct } from "Containers/Products/EditProduct";
import { CreateProduct } from "Containers/Products/CreateProduct";
import { AdminsList } from "Containers/Admin/AdminsList";
import { RiAdminFill } from 'react-icons/ri';

export const API_URL = "https://clikstaging.herokuapp.com/graphql";
export const UPLOAD_URI = `https://clikstaging.herokuapp.com/uploads/public`;
export const VIEW_UPLOAD_URI = `https://clikstaging.herokuapp.com/uploads/`;


function App() {


  let client = new GraphQLClient(API_URL, {
    headers: {
      "Authorization": `Bearer $2b$10$c8HGKqzillqXZocLWuo/R.WYXs3sMdWBthCdN/UoqkDuUPMCw4TZa`
    }
  });

  const gqlDataProvider = dataProvider(client);

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
        // {
        //   name: "dashboard",
        //   options: { label: "dashboard" },
        //   list: Dashboard,
        //   // icon: <BsBuilding size={20} />,
        // },
        {
          name: "admins",
          options: { label: "Admins" },
          list: AdminsList,
          // show: ShowUsers,
          // edit: EditUser,
          icon: <RiAdminFill size={20} />,
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
          edit: EditOrder,
          icon: <BiReceipt size={20} />,
        },
        {
          name: "findProducts",
          options: { label: "Products" },
          list: ProductsList,
          show: ShowProduct,
          edit: EditProduct,
          create: CreateProduct,
          icon: <MdProductionQuantityLimits size={20} />,
        },
      ]}
      Layout={Layout}
      LoginPage={LoginPage}
    />
  );
}

export default App;
