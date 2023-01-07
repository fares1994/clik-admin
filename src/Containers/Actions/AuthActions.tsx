import { notification } from "@pankod/refine-antd";
import * as gql from "gql-query-builder";
import { GraphQLClient } from "graphql-request";

export let clientWithHeaders = new GraphQLClient('https://clikjo/graphql', {
    headers: {
        "Authorization": `Bearer `
    }
});

// const getToken = async () => {
//     const account = await localStorage.getItem('account');
//     if (account && JSON.parse(account)?.token) {
//         clientWithHeaders = new GraphQLClient('https://clikjo/graphql', {
//             headers: {
//                 "Authorization": `Bearer ${JSON.parse(account)?.token}`
//             }
//         });
//     }
// }

// getToken()
export const loginAction = async (username: string, password: string) => {
    try {
        const { query, variables: gqlVariables } = gql.mutation({
            operation: 'loginAdmin',
            variables: {
                loginAdminInput: {
                    value: {
                        username: username,
                        password: password,
                    },
                    type: "AdminLoginInput",
                    required: true
                }
            },
            fields: [
                "id",
                "username",
                "email",
                "name",
                "role",
                "token",
            ]
        });
        const response = await clientWithHeaders.request(query, gqlVariables) || undefined;
        clientWithHeaders = new GraphQLClient('https://clikjo/graphql',
            {
                headers: {
                    "Authorization": `Bearer ${response['loginAdmin']?.token}`
                }
            }
        );

        await localStorage.setItem('account', JSON.stringify(response['loginAdmin']))
        window.location.href = await window.location.href?.replace('/login', '/')
        return Promise.resolve();

    } catch (error) {
        return notification.error({
            message: 'Error',
            description: 'Wrong credentials',
        });
    }
}


export const logoutAction = async () => {
    await localStorage.removeItem('account')
}