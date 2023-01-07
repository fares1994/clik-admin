import { Refine } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";
import { GraphQLClient } from "graphql-request";
import { authProvider } from "./authProvider";
import { Layout } from "@pankod/refine-antd";
import "@pankod/refine-antd/dist/styles.min.css";
import LoginPage from "Containers/LoginPage";
// import Dashboard from "Containers/Dashboard";
import "./App.css";
import Logo from "./Assets/Images/Rectangle.png";
import { UsersList } from "Containers/UsersList/UsersList";
import dataProvider from "Containers/DataProvider";
import ShowUsers from "Containers/UsersList/ShowUsers";
import "./index.css";
import { EditUser } from "Containers/UsersList/EditUser";
import { FiUsers } from "react-icons/fi";
import { OrderesList } from "Containers/Orders/OrdersListing";
import ShowOrder from "Containers/Orders/ShowOrder";
import { BiReceipt, BiSitemap } from "react-icons/bi";
import { ProductsList } from "Containers/Products/ProductsList";
import { MdProductionQuantityLimits, MdOutlineTitle } from "react-icons/md";
import ShowProduct from "Containers/Products/ShowProduct";
import { EditOrder } from "Containers/Orders/EditOrder";
import { EditProduct } from "Containers/Products/EditProduct";
import { CreateProduct } from "Containers/Products/CreateProduct";
import { AdminsList } from "Containers/Admin/AdminsList";
import { RiAdminFill } from "react-icons/ri";
import { AiOutlineLink } from "react-icons/ai";
import { GlobalLinksList } from "Containers/GlobalLinks/GlobalLinksList";
import ShowGlobalLink from "Containers/GlobalLinks/ShowGlobalLink";
import { EditGlobalLink } from "Containers/GlobalLinks/EditGlobalLink";
import { CreateGlobalLink } from "Containers/GlobalLinks/CreateGlobalLink";
import { TitlesList } from "Containers/Titles/TitlesList";
import ShowTitle from "Containers/Titles/ShowTitle";
import { EditTitle } from "Containers/Titles/EditTitle";
import { CreateTitle } from "Containers/Titles/CreateTitle";
import { CreateAdmin } from "Containers/Admin/CreateAdmin";
import { EditAdmin } from "Containers/Admin/EditAdmin";
import { CustomHeader } from "Components/Header";
import { ProductsIdList } from "Containers/ProdcutsID/ProductsIdList";
import { CreateProductId } from "Containers/ProdcutsID/CreateProductId";
import { useEffect, useState } from "react";

export const API_URL = "https://clikjo/graphql";
export const UPLOAD_URI = `https://clikjo/uploads/public`;
export const VIEW_UPLOAD_URI = `https://clikjo/uploads/`;

function App() {
  const [roles, setRoles] = useState<string>();
  let client = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer $2b$10$c8HGKqzillqXZocLWuo/R.WYXs3sMdWBthCdN/UoqkDuUPMCw4TZa`,
    },
  });

  const gqlDataProvider = dataProvider(client);

  const getCookie = async () => {
    // @ts-ignore
    const getRoles = await JSON.parse(localStorage.getItem("account"))?.role;
    setRoles(getRoles);
  };

  useEffect(() => {
    getCookie();
  }, []);

  let resources: any[] = [];

  if (roles === "super_admin") {
    resources = [
      ...resources,
      {
        name: "admins",
        options: { label: "Admins" },
        list: AdminsList,
        create: CreateAdmin,
        // show: ShowUsers,
        edit: EditAdmin,
        icon: <RiAdminFill size={20} />,
      },
    ];
  }

  if (roles === "driver") {
    resources = [
      ...resources,
      {
        name: "findAllOrders",
        options: { label: "Orders" },
        list: OrderesList,
        show: ShowOrder,
        edit: EditOrder,
        icon: <BiReceipt size={20} />,
      },
    ];
  }

  if (roles !== "driver") {
    resources = [
      ...resources,
      {
        name: "findUsersAuth",
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
      {
        name: "findAllGlobalLinks",
        options: { label: "Global Links" },
        list: GlobalLinksList,
        show: ShowGlobalLink,
        edit: EditGlobalLink,
        create: CreateGlobalLink,
        icon: <AiOutlineLink size={20} />,
      },
      {
        name: "findTitles",
        options: { label: "Titles" },
        list: TitlesList,
        show: ShowTitle,
        edit: EditTitle,
        create: CreateTitle,
        icon: <MdOutlineTitle size={20} />,
      },
      {
        name: "productsIds",
        options: { label: "Products ID" },
        list: ProductsIdList,
        create: CreateProductId,
        icon: <BiSitemap size={20} />,
      },
    ];
  }
  return (
    <Refine
      Title={() => (
        <img
          src={Logo}
          alt="Click"
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
      Header={CustomHeader}
      resources={resources}
      Layout={Layout}
      LoginPage={LoginPage}
    />
  );
}

export default App;
