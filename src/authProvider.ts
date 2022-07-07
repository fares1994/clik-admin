import { AuthProvider } from "@pankod/refine-core";
import { loginAction, logoutAction } from "Containers/Actions/AuthActions";

export const TOKEN_KEY = "refine-auth";

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    loginAction(username, password)
    // if (username === "admin" && password === "admin") {
    //   localStorage.setItem(TOKEN_KEY, username);
    //   return Promise.resolve();
    // }
    // return Promise.reject(new Error("username: admin, password: admin"));
  },
  logout: () => {
    logoutAction()
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => {
    const account = localStorage.getItem('account');
    if (account) {
      return Promise.resolve();
    } else {
      return Promise.reject();
    }
  },
  getPermissions: () => Promise.resolve(),
  getUserIdentity: async () => {
    const account = localStorage.getItem('account');
    if (!account) {
      return Promise.reject();
    }

    return Promise.resolve(
      JSON.parse(account)
    );
  },
};
