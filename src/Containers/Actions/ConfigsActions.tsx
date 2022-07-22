import { notification } from "@pankod/refine-antd";
import { API_URL } from "App";
import dataProvider from "Containers/DataProvider";
import * as gql from "gql-query-builder";
import { GraphQLClient } from "graphql-request";
import { clientWithHeaders } from "./AuthActions";

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

  const response = await clientList.request(query, gqlVariables);
  if (!response) {
    return notification.error({
      message: "Error",
      description: "Something went wrong",
    });
  }
  refetch && refetch();
  resetForm && resetForm();
  return notification.success({
    message: "Success",
    description: "Successfully updated",
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
  const response = await clientList.request(query, gqlVariables);
  if (!response) {
    return notification.error({
      message: "Error",
      description: "Something went wrong",
    });
  }
  refetch && refetch();
  resetForm && resetForm();
  return notification.success({
    message: "Success",
    description: "Successfully Created",
  });
};

export const removeRecord = (
  resource: string,
  id?: string,
  refetch?: () => void
) => {
  dataProvider(clientWithHeaders)
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
    });
};

export const showRecord = (
  resource: string,
  id: string,
  returnType: any,
  setRecord: (val: any) => void,
  setRefresh?: (val: boolean) => void
) => {
  dataProvider(clientWithHeaders)
    .getOne({
      resource,
      id,
      metaData: { fields: returnType },
    })
    .then((data) => {
      setRecord(data?.data);
      setRefresh && setRefresh(false);
    });
};

// export const CreateRecordAction = (resource: string, variables: any) => {
//     dataProvider(client).create({
//         resource,
//         variables,
//     }).then(() => {
//         return notification.success({
//             message: 'Success',
//             description: "Successfully Created",
//         })
//     })
// }
