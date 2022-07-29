import { notification } from "@pankod/refine-antd";
import { API_URL } from "App";
import dataProvider from "Containers/DataProvider";
import { admins } from "Containers/QueryReturns";
import * as gql from "gql-query-builder";
import { GraphQLClient } from "graphql-request";
import { clientWithHeaders } from "./AuthActions";
import * as XLSX from "xlsx";

export const UpdateRecordActionWithReturnQuery = async (
  resource: string,
  id: string,
  returnType: any,
  variables: any,
  refetch?: () => void
) => {
  dataProvider(clientWithHeaders)
    .update({
      resource,
      id,
      variables,
      metaData: { fields: returnType },
    })
    .then(() => {
      refetch && refetch();
      return notification.success({
        message: "Success",
        description: "Successfully Updated",
      });
    })
    .catch((error) => {
      return notification.error({
        message:
          error?.response?.errors?.length > 0
            ? error?.response?.errors[0]?.message
            : error?.message
            ? error?.message
            : "Something went wrong",
      });
    });
};

export const UpdateRecordAction = async (
  resource: string,
  variables: any,
  refetch?: () => void,
  resetForm?: () => void
) => {
  const token = JSON.parse(
    (await localStorage.getItem("account")) || ""
  )?.token;
  let clientList = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { query, variables: gqlVariables } = gql.mutation({
    operation: resource,
    variables,
  });

  await clientList
    .request(query, gqlVariables)
    .then(() => {
      refetch && refetch();
      resetForm && resetForm();
      return notification.success({
        message: "Success",
        description: "Successfully Updated",
      });
    })
    .catch((error) => {
      return notification.error({
        message:
          error?.response?.errors?.length > 0
            ? error?.response?.errors[0]?.message
            : error?.message
            ? error?.message
            : "Something went wrong",
      });
    });
};

export const CreateRecordAction = async (
  resource: string,
  variables: any,
  refetch?: () => void,
  resetForm?: () => void
) => {
  const token = JSON.parse(
    (await localStorage.getItem("account")) || ""
  )?.token;
  let clientList = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { query, variables: gqlVariables } = gql.mutation({
    operation: resource,
    variables,
  });
  await clientList
    .request(query, gqlVariables)
    .then(() => {
      refetch && refetch();
      resetForm && resetForm();
      return notification.success({
        message: "Success",
        description: "Successfully Created",
      });
    })
    .catch((error) => {
      return notification.error({
        message:
          error?.response?.errors?.length > 0
            ? error?.response?.errors[0]?.message
            : error?.message
            ? error?.message
            : "Something went wrong",
      });
    });
};

export const removeRecord = async (
  resource: string,
  id?: string,
  refetch?: () => void
) => {
  const token = JSON.parse(
    (await localStorage.getItem("account")) || ""
  )?.token;
  let clientList = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dataProvider(clientList)
    .deleteOne({
      resource,
      id: id ? id : "",
    })
    .then(() => {
      refetch && refetch();
      return notification.success({
        message: "Success",
        description: "Successfully Deleted",
      });
    })
    .catch((error) => {
      return notification.error({
        message:
          error?.response?.errors?.length > 0
            ? error?.response?.errors[0]?.message
            : error?.message
            ? error?.message
            : "Something went wrong",
      });
    });
};

export const showRecord = async (
  resource: string,
  id: string,
  returnType: any,
  setRecord: (val: any) => void,
  setRefresh?: (val: boolean) => void
) => {
  const token = JSON.parse(
    (await localStorage.getItem("account")) || ""
  )?.token;
  let clientList = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  dataProvider(clientList)
    .getOne({
      resource,
      id,
      metaData: { fields: returnType },
    })
    .then((data) => {
      setRecord(data?.data);
      setRefresh && setRefresh(false);
    })
    .catch((error) => {
      return notification.error({
        message:
          error?.response?.errors?.length > 0
            ? error?.response?.errors[0]?.message
            : error?.message
            ? error?.message
            : "Something went wrong",
      });
    });
};

export const CreateAdminAction = async (
  resource: string,
  variables: any,
  refetch?: () => void,
  resetForm?: () => void
) => {
  const token = JSON.parse(
    (await localStorage.getItem("account")) || ""
  )?.token;
  let clientList = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { query, variables: gqlVariables } = gql.mutation({
    operation: resource,
    variables,
    fields: admins,
  });
  await clientList
    .request(query, gqlVariables)
    .then(() => {
      refetch && refetch();
      resetForm && resetForm();
      return notification.success({
        message: "Success",
        description: "Successfully Created",
      });
    })
    .catch((error) => {
      return notification.error({
        message:
          error?.response?.errors?.length > 0
            ? error?.response?.errors[0]?.message
            : error?.message
            ? error?.message
            : "Something went wrong",
      });
    });
};

export const GetListAction = async (
  resource: string,
  variables: any,
  metaData: any,
  setRecord: (data: any) => void
) => {
  const token = JSON.parse(
    (await localStorage.getItem("account")) || ""
  )?.token;
  let clientList = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { query, variables: gqlVariables } = gql.query({
    operation: resource,
    variables,
    fields: metaData,
  });
  const response = await clientList.request(query, gqlVariables);
  setRecord(response[resource]);
};

export const SearchAction = async (
  key: string,
  value: string,
  data: any[],
  setRecord: (data: any) => void
) => {
  const filtered = await (data || [])?.filter((doc) =>
    doc[key]?.toLowerCase()?.includes(value.toLowerCase())
  );
  filtered?.length === 0 &&
    notification.info({
      message: "No results were found",
    });
  setRecord(filtered);
};

export const CreateMassRecordsAction = async (
  resource: string,
  variables: any,
  refetch?: () => void,
  resetForm?: () => void
) => {
  const token = JSON.parse(
    (await localStorage.getItem("account")) || ""
  )?.token;
  let clientList = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const { query, variables: gqlVariables } = gql.mutation({
    operation: resource,
    variables,
  });
  await clientList
    .request(query, gqlVariables)
    .then(() => {
      refetch && refetch();
      resetForm && resetForm();
      return notification.success({
        message: "Success",
        description: "Successfully Created",
      });
    })
    .catch((error) => {
      return notification.error({
        message:
          error?.response?.errors?.length > 0
            ? error?.response?.errors[0]?.message
            : error?.message
            ? error?.message
            : "Something went wrong",
      });
    });
};

export const ExportList = (data: any[], fileName: string) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data || []);
  XLSX.utils.book_append_sheet(wb, ws, `${fileName} List`);
  XLSX.writeFile(wb, `${fileName}List.xlsx`);
};

export const removeCustomLinkAction = async (
  customLinkId: string,
  userId: string,
  refetch?: () => void
) => {
  const token = JSON.parse(
    (await localStorage.getItem("account")) || ""
  )?.token;
  let clientList = new GraphQLClient(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { query, variables: gqlVariables } = gql.mutation({
    operation: "removeCustomLinkByUserId",
    variables: {
      customLinkId: { value: customLinkId, type: "String", required: true },
      userId: { value: userId, type: "String", required: true },
    },
  });
  await clientList
    .request(query, gqlVariables)
    .then(() => {
      refetch && refetch();
      return notification.success({
        message: "Success",
        description: "Successfully Deleted",
      });
    })
    .catch((error) => {
      return notification.error({
        message:
          error?.response?.errors?.length > 0
            ? error?.response?.errors[0]?.message
            : error?.message
            ? error?.message
            : "Something went wrong",
      });
    });
};
